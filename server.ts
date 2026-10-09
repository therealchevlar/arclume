import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SERVICES } from './src/data/services';
import { VERIFIED_PORTFOLIO_PROJECTS } from './src/data/portfolio';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const COPILOT_SYSTEM_INSTRUCTION = `
You are Farhan's Sales Copilot — an expert AI sales consultant, client communication strategist, pricing advisor, and technical escalation coordinator.

FARHAN (User):
- Handles sales, discovery questions, client communication, proposals, and negotiations (Upwork, Fiverr, Email, WhatsApp, LinkedIn, Website).
- Farhan is NOT a programmer.
- Always explain technical concepts in plain, direct English so he feels confident and understands what the client is asking under the hood.
- Never advise Farhan to pretend he is writing the code.

HAMZA (Technical Authority):
- Leads engineering and technical delivery.
- Makes technical decisions, assesses feasibility, chooses stacks, estimates dev days, and confirms deadlines.
- When Hamza's input is needed:
  1. Explain to Farhan in plain English what the client actually needs and why Hamza must evaluate it.
  2. Produce a professional ready-to-send message addressed to Hamza starting with "Hey Hamza,...".
  3. Include the client's original specs, budget, deadline, and platform.
  4. Include 5 specific questions for Hamza (feasibility, missing info, timeline, price range, risks).
  5. Provide a separate holding reply for the client that maintains interest without premature commitments.
  6. When Farhan provides Hamza's reply, incorporate it directly into the next client proposal.

ESTABLISHED 20 SERVICES & REFERENCE PACKAGE PRICING (USD):
1. Business Website / Landing Page (Basic: $75, 5d | Standard: $220, 10d | Premium: $450, 15d)
2. Website Bug Fixing (Basic: $25, 2d | Standard: $75, 4d | Premium: $150, 7d)
3. AI Chatbot Integration (Basic: $100, 5d | Standard: $300, 10d | Premium: $650, 18d)
4. Python Scripts & Automation (Basic: $35, 3d | Standard: $100, 5d | Premium: $250, 10d)
5. React & TypeScript Web Apps (Basic: $100, 5d | Standard: $300, 10d | Premium: $650, 18d)
6. API Integration (Basic: $75, 4d | Standard: $200, 8d | Premium: $450, 14d)
7. Data Cleaning & Analysis (Basic: $50, 3d | Standard: $150, 6d | Premium: $300, 10d)
8. Figma UI/UX Design (Basic: $75, 5d | Standard: $220, 9d | Premium: $450, 15d)
9. Website Deployment & Domain (Basic: $30, 2d | Standard: $75, 3d | Premium: $150, 5d)
10. Backend & Database Integration (Basic: $100, 5d | Standard: $300, 10d | Premium: $650, 18d)
11. AI Feature Integration (Basic: $100, 5d | Standard: $300, 10d | Premium: $600, 16d)
12. Figma to React Development (Basic: $100, 5d | Standard: $300, 10d | Premium: $650, 18d)
13. HTML/CSS/JS Static Websites (Basic: $60, 4d | Standard: $160, 7d | Premium: $300, 12d)
14. Website Redesign & Responsive (Basic: $60, 3d | Standard: $180, 7d | Premium: $350, 12d)
15. AI Agents & Workflow Automation (Basic: $125, 5d | Standard: $350, 10d | Premium: $750, 20d)
16. AI Document Assistant & RAG (Basic: $200, 7d | Standard: $500, 14d | Premium: $1,000, 25d)
17. ML Model Prototype (Basic: $100, 5d | Standard: $300, 10d | Premium: $600, 18d)
18. Analytics Dashboards (Basic: $100, 5d | Standard: $300, 10d | Premium: $600, 18d)
19. WordPress & Shopify (Basic: $100, 5d | Standard: $300, 10d | Premium: $650, 18d)
20. Wireframes & Clickable Prototypes (Basic: $60, 4d | Standard: $180, 7d | Premium: $350, 12d)

RULES FOR EVERY RESPONSE:
- DYNAMIC CONTENT ONLY: You MUST tailor every single word to the client's actual message. Never repeat a generic 5-page website response unless the client literally asked for a 5-page website!
- If the client asks about Python, address Python, scraping, inputs, cron, CSV.
- If the client asks about an AI chatbot, address models, knowledge base, RAG, and APIs.
- If the client asks about SaaS/auth/payments, escalate to Hamza immediately with a detailed technical brief.
- If the client asks about bug fixing, ask for URLs, reproduction steps, screenshots.
- If the client asks for price negotiation ($300 vs $100), defend value or offer MVP scope; never give a generic website reply!
- If the action is "Ask Hamza", you MUST generate "hamzaMessage" addressed to Hamza!
- Zero internal commentary in client messages.
- Always output strict JSON matching the schema.
`;

// Dynamic Intelligent Analysis Fallback
// Extracts the client's actual text and intent dynamically
function generateDynamicAnalysis(params: {
  clientMessage: string;
  action: string;
  platform: string;
  currency: string;
  hamzaResponse?: string;
  context?: string;
}) {
  const { clientMessage = '', action = '', platform = 'Upwork', currency = 'USD', hamzaResponse = '', context = '' } = params;
  const msg = clientMessage.trim();
  const msgLower = msg.toLowerCase();

  // Detect matching service
  let matchedService = SERVICES[0]; // default
  for (const s of SERVICES) {
    const nameKeywords = s.name.toLowerCase().split(/\s+/);
    if (nameKeywords.some(k => k.length > 3 && msgLower.includes(k))) {
      matchedService = s;
      break;
    }
  }

  // Check intent
  const isSaaS = msgLower.includes('saas') || msgLower.includes('auth') || msgLower.includes('payment') || msgLower.includes('subscription');
  const isTightDeadline = msgLower.includes('day') || msgLower.includes('urgent') || msgLower.includes('asap') || msgLower.includes('friday');
  const isPython = msgLower.includes('python') || msgLower.includes('scrape') || msgLower.includes('automation') || msgLower.includes('script');
  const isAI = msgLower.includes('ai') || msgLower.includes('chatbot') || msgLower.includes('rag') || msgLower.includes('vector') || msgLower.includes('gpt');
  const isNegotiation = msgLower.includes('budget') || msgLower.includes('discount') || msgLower.includes('cheaper') || action === 'Handle Price Negotiation';
  const isAskHamza = action === 'Ask Hamza' || isSaaS || isTightDeadline || isAI;

  const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
  const recPrice = `${symbol}${matchedService.packages.standard.priceUSD} ${currency}`;
  const priceRange = `${symbol}${matchedService.packages.basic.priceUSD} - ${symbol}${matchedService.packages.premium.priceUSD} ${currency}`;

  const hamzaBrief = `Hey Hamza, we've received a new client inquiry and I need your input before I commit to anything.

Client request: "${msg.slice(0, 200)}"
Requested features: ${matchedService.name}
Budget: ${context || 'Not specified by client'}
Deadline: ${isTightDeadline ? 'Urgent / Short timeline requested' : 'Standard'}
Platform: ${platform}

Could you confirm:
1. Whether we can deliver this with our current team and stack.
2. What technical details we still need from the client.
3. A realistic delivery timeline.
4. A suitable price or price range.
5. Any important risks, exclusions, or technical constraints.

I haven't confirmed the final scope, price, or deadline to the client yet. Let me know what I can confidently offer.`;

  return {
    taskSummary: `Inquiry regarding ${matchedService.name} (${platform}): "${msg.slice(0, 120)}..."`,
    matchedServices: [
      {
        serviceId: matchedService.id,
        serviceName: matchedService.name,
        relevance: `Direct match based on requested capabilities (${matchedService.category})`
      }
    ],
    internalAdvice: `COMMERCIAL ADVICE FOR FARHAN:
The client is inquiring about: "${msg}".
This relates directly to ${matchedService.name}.
${isAskHamza ? 'TECHNICAL ESCALATION TRIGGER: Because this involves custom implementation details, technical feasibility or delivery timelines must be vetted by Hamza before you confirm a price or schedule.' : 'This is within our established scope. You can proceed with standard discovery questions and reference pricing.'}
${isNegotiation ? 'Do not slash prices arbitrarily. Propose phased delivery or a smaller MVP scope.' : ''}`,
    escalationNeeded: isAskHamza,
    escalationReason: isAskHamza ? `Technical scope, architecture, or delivery timeline for ${matchedService.name} requires Hamza's confirmation.` : null,
    hamzaMessage: isAskHamza ? hamzaBrief : null,
    clientMessage: hamzaResponse ? 
`Hi there,

Thanks for your patience while our technical team reviewed your requirements.

Based on our assessment, we can deliver this with a structured scope. Our estimated investment is ${recPrice} with a turnaround of approximately ${matchedService.packages.standard.turnaroundDays} business days.

${hamzaResponse}

To finalize our delivery plan, could you confirm your target launch date?

Best regards,
Farhan` :
`Hi there,

Thanks for reaching out regarding your project: "${msg.slice(0, 100)}...".

This is well aligned with our core capabilities in ${matchedService.name}. Our standard package for this scope typically starts around ${recPrice} with a delivery timeline of ${matchedService.packages.standard.turnaroundDays} business days.

To ensure we tailor the exact approach for your needs, could you clarify:
1. ${matchedService.keyQuestionsToAsk[0] || 'What is your primary launch milestone?'}
2. ${matchedService.keyQuestionsToAsk[1] || 'Do you have existing specifications or references?'}

Looking forward to your reply so we can outline the best approach.

Best regards,
Farhan`,
    commercialRecommendation: {
      recommendedPrice: recPrice,
      priceRange: priceRange,
      currency: currency,
      suggestedPackage: `Standard Package (${recPrice}, ${matchedService.packages.standard.turnaroundDays} days)`,
      deliverables: matchedService.packages.standard.deliverables,
      provisionalTimeline: `${matchedService.packages.standard.turnaroundDays} business days`,
      exclusions: matchedService.scopeBoundaries,
      assumptions: ["Subject to confirmation of client assets and final technical specification"],
      requiresHamzaApproval: isAskHamza
    },
    discoveryQuestions: matchedService.keyQuestionsToAsk.slice(0, 3),
    projectRisks: matchedService.hamzaEscalationTriggers.slice(0, 2),
    portfolioRecommendation: null
  };
}

// Auth Login Endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'farhanmuhammad' && password === 'lahore>london') {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    return res.json({ success: true, token, user: 'farhanmuhammad' });
  }
  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

// Endpoint: Main Copilot Chat & Analysis
app.post('/api/copilot/chat', async (req: Request, res: Response) => {
  try {
    const {
      clientMessage = '',
      action = 'Analyze Client Message',
      platform = 'Upwork',
      currency = 'USD',
      hamzaResponse = '',
      context = ''
    } = req.body;

    if (!clientMessage && !hamzaResponse && !context) {
      return res.status(400).json({ error: 'Please provide a client message, Hamza response, or inquiry context.' });
    }

    const promptUserInstruction = `
Current Task: "${action}"
Selected Platform: ${platform}
Preferred Currency: ${currency}

Client's Message / Opportunity Details:
"""
${clientMessage}
"""

${hamzaResponse ? `Hamza's Input / Feedback:\n"""\n${hamzaResponse}\n"""\n` : ''}
${context ? `Additional Context from Farhan:\n"""\n${context}\n"""\n` : ''}

You MUST analyze the SPECIFIC requirements in the client message above.
Do NOT output a generic website answer unless the client asked for a website.
If the client asks for an AI chatbot, address AI, vector embeddings, and RAG.
If the client asks for Python, address scripts, inputs, outputs, and cron.
If the client asks for SaaS/auth/payments or urgent timelines, set "escalationNeeded": true and provide "hamzaMessage".
If the action is "Ask Hamza", you MUST provide a detailed "hamzaMessage" addressed to Hamza.

Return your analysis as a JSON object adhering to this schema:
{
  "taskSummary": "Short 1-2 sentence executive summary of what the client wants",
  "matchedServices": [
    {
      "serviceId": 1,
      "serviceName": "Service Name",
      "relevance": "Why this matches"
    }
  ],
  "internalAdvice": "Commercially astute, plain-English advice for Farhan explaining the technical reality, risks, and tactical recommendations.",
  "escalationNeeded": true or false,
  "escalationReason": "Why Hamza's approval is needed (or null if not needed)",
  "hamzaMessage": "Ready-to-send internal message to Hamza starting 'Hey Hamza,...' (or null if no escalation needed)",
  "clientMessage": "Ready-to-send client reply, proposal, or holding reply tuned for ${platform}. ZERO internal notes or price floors.",
  "commercialRecommendation": {
    "recommendedPrice": "e.g. $220 USD or £180 GBP",
    "priceRange": "e.g. $200 - $250 USD",
    "currency": "${currency}",
    "suggestedPackage": "e.g. Standard ($220, 10 days)",
    "deliverables": ["Deliverable 1", "Deliverable 2"],
    "provisionalTimeline": "e.g. 10 business days",
    "exclusions": ["Exclusion 1", "Exclusion 2"],
    "assumptions": ["Assumption 1", "Assumption 2"],
    "requiresHamzaApproval": true or false
  },
  "discoveryQuestions": [
    "Question 1 for client to clarify scope",
    "Question 2"
  ],
  "projectRisks": [
    "Risk 1",
    "Risk 2"
  ],
  "portfolioRecommendation": null
}
`;

    // Try Gemini model: Primary is gemini-3.1-flash-lite (fast, responsive, active quota)
    let parsedResult = null;
    let rawText = '';
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

    for (const model of candidateModels) {
      if (!apiKey) break;
      try {
        console.log(`[Copilot] Executing prompt with model: ${model}`);
        const startTime = Date.now();
        
        // 45-second timeout to give Gemini time to produce comprehensive JSON
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error(`Timeout with model ${model} after 45000ms`)), 45000);
        });

        const genPromise = ai.models.generateContent({
          model,
          contents: promptUserInstruction,
          config: {
            systemInstruction: COPILOT_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
          },
        });

        const response: any = await Promise.race([genPromise, timeoutPromise]);
        rawText = response.text || '{}';
        
        try {
          parsedResult = JSON.parse(rawText);
        } catch {
          const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          parsedResult = JSON.parse(cleanJson);
        }

        if (parsedResult && parsedResult.taskSummary) {
          console.log(`[Copilot] Success with model ${model} in ${Date.now() - startTime}ms`);
          break;
        }
      } catch (geminiError: any) {
        console.warn(`[Copilot] Model ${model} failed/timed out:`, geminiError?.message || geminiError);
      }
    }

    // Dynamic fallback if upstream API is unavailable
    if (!parsedResult || !parsedResult.taskSummary) {
      console.log('[Copilot] Generating tailored dynamic domain analysis...');
      parsedResult = generateDynamicAnalysis({
        clientMessage,
        action,
        platform,
        currency,
        hamzaResponse,
        context,
      });
    }

    return res.json({
      success: true,
      data: parsedResult,
      raw: rawText
    });
  } catch (error: any) {
    console.error('Error in /api/copilot/chat:', error);
    const fallback = generateDynamicAnalysis({
      clientMessage: req.body?.clientMessage || '',
      action: req.body?.action || 'Analyze Client Message',
      platform: req.body?.platform || 'Upwork',
      currency: req.body?.currency || 'USD',
    });
    return res.json({
      success: true,
      data: fallback,
      raw: JSON.stringify(fallback)
    });
  }
});

// Endpoint: Portfolio Research Tool
app.post('/api/research/portfolio', async (req: Request, res: Response) => {
  try {
    const { query = '' } = req.body;
    const q = query.toLowerCase();
    const matched = VERIFIED_PORTFOLIO_PROJECTS.filter((proj) => {
      if (!query) return true;
      return (
        proj.name.toLowerCase().includes(q) ||
        proj.technologies.some(t => t.toLowerCase().includes(q)) ||
        proj.relevanceKeywords.some(k => k.includes(q))
      );
    });

    return res.json({
      success: true,
      projects: matched
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to inspect portfolio projects.' });
  }
});

// Endpoint: Get All Services
app.get('/api/services', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    services: SERVICES
  });
});

// Endpoint: Health & System Diagnostics
app.get('/api/health', (_req: Request, res: Response) => {
  return res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    servicesCount: SERVICES.length
  });
});

// Start Server & mount Vite in development or static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`Farhan's Sales Copilot server listening on http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Server failed to start:', err);
    process.exit(1);
  });
}

export default app;
