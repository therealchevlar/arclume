export interface ServicePackage {
  tier: 'Basic' | 'Standard' | 'Premium';
  priceUSD: number;
  turnaroundDays: number;
  summary: string;
  deliverables: string[];
}

export interface ServiceDefinition {
  id: number;
  name: string;
  category: 'Web Development' | 'AI & Automation' | 'Design & Prototype' | 'Data & Analytics' | 'Infrastructure & CMS';
  description: string;
  packages: {
    basic: ServicePackage;
    standard: ServicePackage;
    premium: ServicePackage;
  };
  typicalWork: string[];
  keyQuestionsToAsk: string[];
  scopeBoundaries: string[];
  hamzaEscalationTriggers: string[];
  commercialAdvice: string;
}

export const SERVICES: ServiceDefinition[] = [
  {
    id: 1,
    name: "Business Website and Landing Page Development",
    category: "Web Development",
    description: "Professional business websites, high-converting landing pages, and responsive corporate web presence.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 75,
        turnaroundDays: 5,
        summary: "1-2 page modern responsive landing page with contact form.",
        deliverables: ["Single landing page or simple 2-page site", "Fully responsive mobile layout", "Working contact form", "Basic SEO tags"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 220,
        turnaroundDays: 10,
        summary: "Up to 5 standard pages (Home, About, Services, Contact, Blog/Team).",
        deliverables: ["Up to 5 responsive pages", "Custom branding alignment", "Contact form with notifications", "Interactive sections & animations", "Deployment assistance"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 450,
        turnaroundDays: 15,
        summary: "Comprehensive business website (up to 8-10 pages) with rich interactive elements.",
        deliverables: ["Up to 8-10 customized pages", "High-conversion UI layouts", "Custom forms and integrations", "Speed optimization", "Full deployment & domain handover"]
      }
    },
    typicalWork: [
      "Professional business websites",
      "Landing pages",
      "Responsive page layouts",
      "Contact forms and common website sections",
      "Business-focused presentation and calls to action"
    ],
    keyQuestionsToAsk: [
      "How many total pages or distinct sections do you require?",
      "Do you already have copy/text content, logos, and images prepared?",
      "Do you have design references or an existing site you want improved?",
      "Are any third-party integrations needed (calendars, CRM, newsletter)?"
    ],
    scopeBoundaries: [
      "Content writing and copywriting are not included unless specified",
      "Complex user logins or custom e-commerce engines require custom scoping",
      "Hosting and domain fees are client responsibilities"
    ],
    hamzaEscalationTriggers: [
      "Client requests custom database backend or authentication",
      "Client demands tight turnaround (< 4 days for multi-page)",
      "Unusual third-party API or portal integration"
    ],
    commercialAdvice: "Clarify page count and content readiness first. If client provides Figma or clear references, quoting Standard ($220) is straightforward."
  },
  {
    id: 2,
    name: "Website Bug Fixing",
    category: "Web Development",
    description: "Front-end bugs, CSS layout issues, responsive layout errors, and JavaScript glitches.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 25,
        turnaroundDays: 2,
        summary: "Single isolated styling or minor functional glitch.",
        deliverables: ["1 isolated front-end bug fix", "Responsive fix on specific viewport", "Verification across Chrome/Safari/Firefox"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 75,
        turnaroundDays: 4,
        summary: "2-3 related front-end bugs or broken component interaction.",
        deliverables: ["Up to 3 front-end issues fixed", "Component script or styling debugging", "Cross-browser test"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 150,
        turnaroundDays: 7,
        summary: "Complex front-end bug set or legacy layout reconciliation.",
        deliverables: ["Multiple complex front-end bugs", "Deep debugging of conflicting scripts", "Code cleanup and stability check"]
      }
    },
    typicalWork: [
      "Front-end bugs",
      "Layout problems",
      "Responsive issues",
      "CSS and JavaScript errors",
      "Small functional corrections"
    ],
    keyQuestionsToAsk: [
      "What is the live URL or staging URL where the bug occurs?",
      "Can you provide screenshots or screen recordings of the expected vs actual behaviour?",
      "What device, operating system, or browser triggers the issue?",
      "Can you share repository or FTP/code access so we can inspect the source?"
    ],
    scopeBoundaries: [
      "A large rewrite or undocumented complex architectural defect must not be sold as a minor bug fix",
      "Backend server crashes or database corruption are not covered under front-end bug fix packages"
    ],
    hamzaEscalationTriggers: [
      "Bug stems from obsolete legacy backend or corrupted database",
      "Requires refactoring entire codebase or framework migration",
      "Client cannot provide reproduction steps or access"
    ],
    commercialAdvice: "Never promise a 1-hour turnaround before seeing the code. Basic ($25) applies only to straightforward CSS/JS tweaks with verified access."
  },
  {
    id: 3,
    name: "AI Chatbot Integration",
    category: "AI & Automation",
    description: "Conversational AI widgets, custom knowledge assistants, and AI chat interfaces for websites.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "Standard website chat widget connected to an AI API with system prompt persona.",
        deliverables: ["Embeddable web chat widget", "Connection to OpenAI/Gemini/Anthropic API", "Custom persona & business greeting prompt", "Instructions to embed on site"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "Custom FAQ / business knowledge chatbot with conversation styling and lead capture.",
        deliverables: ["Custom branded UI matching site", "Curated business knowledge FAQ prompt/context", "Email/lead capture before or during chat", "Conversation reset and safety guidelines"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 650,
        turnaroundDays: 18,
        summary: "Advanced AI chatbot with vector search (RAG) or multi-turn document retrieval.",
        deliverables: ["Full custom chatbot interface", "Vector retrieval over client business docs", "Session history & admin log view", "Third-party lead forwarding webhook", "Deployment on client server/Cloud"]
      }
    },
    typicalWork: [
      "AI chat interfaces",
      "Website chatbot integration",
      "Basic conversational experiences",
      "Integration with an appropriate AI service"
    ],
    keyQuestionsToAsk: [
      "Does the bot only need general business guidelines, or must it query proprietary documents/databases (RAG)?",
      "Do users need to authenticate or log in to use the chatbot?",
      "Do you have your own OpenAI/Gemini API key, or do you need assistance configuring billing?",
      "Should the bot collect client contact details (leads) and forward them via email or webhook?"
    ],
    scopeBoundaries: [
      "Client is responsible for their own third-party AI provider token costs",
      "Chatbot cannot guarantee 100% hallucination-free answers; disclaimers apply"
    ],
    hamzaEscalationTriggers: [
      "Client requests custom database/CRM two-way integration",
      "Complex vector database infrastructure (Pinecone, pgvector) with dynamic updates",
      "High-concurrency enterprise load or strict compliance (HIPAA/GDPR)"
    ],
    commercialAdvice: "Distinguish between a simple prompt-engineered widget ($100-$300) and a complex document RAG system ($650+). Client must provide or pay for LLM API keys."
  },
  {
    id: 4,
    name: "Python Scripts and Automation",
    category: "AI & Automation",
    description: "Custom Python automation scripts, task schedulers, web scrapers, data parsers, and batch file utilities.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 35,
        turnaroundDays: 3,
        summary: "Single-purpose Python script (e.g., CSV formatter, file renamer, simple parser).",
        deliverables: ["Clean Python 3 script", "Requirements.txt file", "Execution instructions and comments", "Sample run verification"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "Multi-step automated pipeline or public web scraper with error handling.",
        deliverables: ["Robust automation script", "Web scraping or API extraction logic", "Error handling and retry logic", "Structured output (CSV/JSON/Excel)", "Setup guide"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 250,
        turnaroundDays: 10,
        summary: "Comprehensive automation with scheduled execution, notifications, and logging.",
        deliverables: ["End-to-end automation suite", "Automated email/Slack notification trigger", "Configurable cron/task scheduler setup", "Comprehensive logging & edge-case handling"]
      }
    },
    typicalWork: [
      "Small Python scripts",
      "Repetitive-task automation",
      "File processing",
      "Data transformation",
      "Practical utilities"
    ],
    keyQuestionsToAsk: [
      "What is the exact input data format (files, URLs, database)?",
      "What is the desired output (CSV, Google Sheets, database, email)?",
      "Where will this script run (client's local machine, AWS, Linux VPS)?",
      "How frequently will it be executed (one-off, hourly, daily)?"
    ],
    scopeBoundaries: [
      "Scraping websites protected by heavy CAPTCHAs (Cloudflare Turnstile) requires proxy services funded by client",
      "Script maintenance due to third-party website DOM changes is outside initial build scope"
    ],
    hamzaEscalationTriggers: [
      "Large-scale distributed scraping or reverse-engineering private mobile APIs",
      "Real-time processing of gigabytes of data with strict latency limits"
    ],
    commercialAdvice: "Check inputs, outputs, and running environment. Standard ($100) covers most single scraper/automation requests cleanly."
  },
  {
    id: 5,
    name: "React and TypeScript Web Applications",
    category: "Web Development",
    description: "Modern Single Page Applications (SPAs), dynamic client portals, interactive dashboards, and React components.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "1-2 interactive screens or standalone React component module.",
        deliverables: ["Clean React + TypeScript implementation", "Responsive Tailwind CSS styling", "State management & mock data flow", "Component documentation"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "3-5 screen interactive web app with routing and REST API integration.",
        deliverables: ["Multi-screen React application", "Client-side routing (React Router)", "API client integration (Fetch/Axios)", "Form validation and error handling", "Production build configuration"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 650,
        turnaroundDays: 18,
        summary: "Full-featured web application front-end with state store, auth screens, and complex tables/forms.",
        deliverables: ["Complete multi-view web app", "Auth flow UI & protected routes", "Complex data filters, sorting, and pagination", "Optimized performance & accessibility", "Deployment to Vercel/Netlify/Cloud"]
      }
    },
    typicalWork: [
      "Interactive web applications",
      "React front ends",
      "TypeScript implementation",
      "Responsive interfaces",
      "Application components and user flows"
    ],
    keyQuestionsToAsk: [
      "Do you already have backend APIs built, or do we need to build the API/database as well?",
      "Do you have Figma designs or wireframes, or do we design the UI?",
      "What authentication provider are you using (Supabase, Firebase, custom JWT)?",
      "What is the target deadline for launch?"
    ],
    scopeBoundaries: [
      "Complex SaaS applications, payments, and multi-tenant backends require separate scoping",
      "Third-party paid libraries or subscriptions are not included"
    ],
    hamzaEscalationTriggers: [
      "Client expects full backend, database, and auth included without a dedicated backend budget",
      "Tight deadline (< 10 days for a full multi-screen app)",
      "Real-time websockets, video streaming, or complex state synchronization"
    ],
    commercialAdvice: "Clarify whether this is front-end only or full-stack. If full-stack, bundle with Service 10 and escalate to Hamza for architecture review."
  },
  {
    id: 6,
    name: "API Integration",
    category: "Web Development",
    description: "Connecting web and backend applications with third-party APIs (Stripe, Twilio, OpenAI, Google APIs, CRMs).",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 75,
        turnaroundDays: 4,
        summary: "Single REST API endpoint integration with simple data fetch and display.",
        deliverables: ["1 API endpoint integration", "Authentication configuration (API key/Bearer)", "Error handling & loading states", "Sample payload verification"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 200,
        turnaroundDays: 8,
        summary: "Two-way integration (e.g., Stripe checkout, CRM webhook, email service).",
        deliverables: ["Full two-way API connection", "Webhook listener or event handler", "Payload transformation & data mapping", "Sandbox/Test environment validation", "Documentation of endpoints"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 450,
        turnaroundDays: 14,
        summary: "Multiple third-party APIs integrated with synchronization and fallback queuing.",
        deliverables: ["Integration of 2-3 APIs", "OAuth 2.0 flow or token refresh cycle", "Rate-limit handling & exponential backoff", "End-to-end sandbox verification", "Security audit of credentials handling"]
      }
    },
    typicalWork: [
      "Connecting applications to external APIs",
      "Retrieving and submitting data",
      "API-based application features",
      "Integrating third-party services"
    ],
    keyQuestionsToAsk: [
      "Which specific API or service are we connecting (e.g., Stripe, HubSpot, Google Calendar)?",
      "Do you have access to API documentation and sandbox/test developer credentials?",
      "What authentication does it use (API Key, OAuth2, HMAC)?",
      "What are the expected data triggers and actions?"
    ],
    scopeBoundaries: [
      "Never ask for live production API secrets in open chat; use secure environment variables",
      "API usage costs or subscription tiers are paid directly by client"
    ],
    hamzaEscalationTriggers: [
      "Complex OAuth2 flows with refresh tokens and multi-tenant security",
      "Legacy SOAP, private XML APIs, or undocumented third-party services",
      "High financial transaction volume requiring PCI-DSS compliance"
    ],
    commercialAdvice: "Always verify that public documentation exists before giving a firm quote. Standard ($200) works for well-documented standard REST APIs."
  },
  {
    id: 7,
    name: "Data Cleaning and Analysis",
    category: "Data & Analytics",
    description: "Dataset wrangling, missing data imputation, statistical summaries, exploratory data analysis, and visualizations.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 50,
        turnaroundDays: 3,
        summary: "Clean and format a single dataset (CSV/Excel) up to 10k rows.",
        deliverables: ["Deduplication and missing value resolution", "Standardized columns, date formats, data types", "Clean export file (CSV/Excel)", "Summary of modifications"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 150,
        turnaroundDays: 6,
        summary: "Comprehensive data wrangling, statistical summary, and visual charts.",
        deliverables: ["Multi-table joining and data cleansing", "Exploratory data analysis (EDA)", "5-8 informative charts/visualizations", "Jupyter notebook or clean script", "Executive insights summary"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "Advanced dataset analysis, correlation modeling, and presentation-ready report.",
        deliverables: ["End-to-end data pipeline script", "Advanced statistical breakdowns", "Interactive visualizations or PDF report", "Clean reproducible code repository", "Walkthrough summary"]
      }
    },
    typicalWork: [
      "Cleaning datasets",
      "Handling missing or inconsistent data",
      "Exploratory data analysis",
      "Statistical summaries",
      "Data visualization"
    ],
    keyQuestionsToAsk: [
      "What is the file format (CSV, Excel, SQL dump) and total row/column size?",
      "What specific business questions or hypotheses do you want the analysis to answer?",
      "Do you need only the cleaned data file, or also charts, a report, and the Python code?",
      "Are there known data quality issues (duplicates, null values, inconsistent date formats)?"
    ],
    scopeBoundaries: [
      "Predictive machine learning modeling is scoped under Service 17",
      "Client must ensure sensitive personal data (PII) is anonymized before sharing"
    ],
    hamzaEscalationTriggers: [
      "Big data (> millions of records requiring PySpark or database clustering)",
      "Unclear statistical criteria with contractual accuracy or audit requirements"
    ],
    commercialAdvice: "Confirm row count and deliverable type (file only vs code vs report). Standard ($150) is very popular for business datasets."
  },
  {
    id: 8,
    name: "Figma UI/UX Design",
    category: "Design & Prototype",
    description: "High-fidelity website UI design, mobile screens, component libraries, and user experience flows.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 75,
        turnaroundDays: 5,
        summary: "1-2 web pages or landing page desktop mockup in Figma.",
        deliverables: ["1-2 high-fidelity desktop page designs", "Figma file with editable layers", "Color palette and typography guide", "Exported image assets"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 220,
        turnaroundDays: 9,
        summary: "Up to 5 responsive pages (desktop + mobile layouts) in Figma.",
        deliverables: ["Up to 5 page layouts (Desktop & Mobile)", "Reusable Figma components (buttons, headers, cards)", "Interactive Figma click-through preview", "Organized design system variables"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 450,
        turnaroundDays: 15,
        summary: "Comprehensive multi-screen web app or product UI/UX design (up to 10 screens).",
        deliverables: ["Up to 10 application views/screens", "Complete design system & UI component kit", "Developer handoff documentation & redlines", "Interactive prototype with micro-interactions"]
      }
    },
    typicalWork: [
      "Website UI design",
      "Application screens",
      "Layout design",
      "Components and visual systems",
      "User experience improvements"
    ],
    keyQuestionsToAsk: [
      "How many unique screens or pages need to be designed?",
      "Do you need both desktop and mobile responsive viewports?",
      "Do you have brand guidelines (logos, colors, fonts), or should we establish them?",
      "Is this design-only, or will you want us to develop the code in React later?"
    ],
    scopeBoundaries: [
      "Figma design does not include frontend coding (upsell to Service 12 for Figma to React)",
      "Custom 3D rendering or bespoke logo branding is quoted separately"
    ],
    hamzaEscalationTriggers: [
      "Client expects code implementation bundled without appropriate development budget",
      "Unusually massive product design (> 15 screens with complex workflows)"
    ],
    commercialAdvice: "Great upsell opportunity: Offer Figma design first, then transition into Service 12 (Figma to React) for the implementation phase."
  },
  {
    id: 9,
    name: "Website Deployment and Domain Setup",
    category: "Infrastructure & CMS",
    description: "Deploying web applications to hosting providers, DNS domain connection, SSL certificates, and CI/CD pipelines.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 30,
        turnaroundDays: 2,
        summary: "Single static site or React app deployment to Vercel/Netlify with custom domain.",
        deliverables: ["Deploy frontend to Vercel/Netlify/GitHub Pages", "DNS A/CNAME record configuration", "Free SSL certificate provisioning", "Live site launch check"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 75,
        turnaroundDays: 3,
        summary: "Full-stack application deployment (Node/Python) to VPS/Cloud with domain & environment setup.",
        deliverables: ["VPS setup (DigitalOcean, Render, Heroku, AWS LightSail)", "Domain DNS configuration & HTTPS certificate", "Environment variable configuration", "Process manager setup (PM2/Docker)"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 150,
        turnaroundDays: 5,
        summary: "Multi-environment Cloud deployment with CI/CD GitHub Actions pipeline and monitoring.",
        deliverables: ["Automated GitHub Actions CI/CD deployment", "Staging and Production environments", "Custom domain routing with Cloudflare/DNS", "Automated SSL renewals & basic uptime check"]
      }
    },
    typicalWork: [
      "Website deployment",
      "Hosting configuration",
      "Domain connection",
      "Deployment troubleshooting",
      "Basic launch assistance"
    ],
    keyQuestionsToAsk: [
      "What hosting provider or platform do you prefer (Vercel, AWS, DigitalOcean, Netlify, cPanel)?",
      "Where is your domain registered (GoDaddy, Namecheap, Google Domains, Cloudflare)?",
      "Is the source code stored in a GitHub/GitLab repository?",
      "Is this a static frontend, a WordPress site, or a full-stack app with a database?"
    ],
    scopeBoundaries: [
      "Hosting platform fees and domain purchase costs are paid directly by client",
      "Fixing broken application code is not included in standard deployment (see Service 2)"
    ],
    hamzaEscalationTriggers: [
      "Complex AWS architecture (VPC, multi-region ECS, Kubernetes, RDS migrations)",
      "High security compliance or sensitive government/enterprise cloud requirements"
    ],
    commercialAdvice: "Fast, reliable turnaround. Clarify that client owns their hosting/domain accounts and adds us as a collaborator."
  },
  {
    id: 10,
    name: "Backend and Database Integration",
    category: "Infrastructure & CMS",
    description: "Server-side REST APIs, database schema design, PostgreSQL/MongoDB/Firebase, and authentication.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "Simple database setup and 2-3 CRUD endpoints (Node/Express or Python).",
        deliverables: ["Database setup (PostgreSQL, Supabase, or MongoDB)", "Basic schema design (1-2 tables/collections)", "3 CRUD API endpoints", "API documentation (Postman/Markdown)"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "Complete backend service with authentication, relational schema, and secure endpoints.",
        deliverables: ["User authentication (JWT / Firebase Auth / Supabase Auth)", "Normalized database schema (3-6 tables)", "Full CRUD REST API with validation", "Environment secrets management", "Cloud database deployment"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 650,
        turnaroundDays: 18,
        summary: "Robust production backend architecture with role-based access, indexing, and third-party webhooks.",
        deliverables: ["Role-Based Access Control (RBAC)", "Complex query optimization & database indexing", "Third-party service integrations & background workers", "Automated data validation & rate limiting", "Comprehensive API spec & deployment"]
      }
    },
    typicalWork: [
      "Backend integration",
      "Database connections",
      "Data persistence",
      "Connecting interfaces to backend services",
      "Basic application data flows"
    ],
    keyQuestionsToAsk: [
      "What database technology do you prefer (PostgreSQL, MySQL, MongoDB, Firebase)?",
      "What data entities need to be stored, and how are they related?",
      "Do you need user authentication with roles (admin, user, viewer)?",
      "Will the backend connect to an existing frontend, or are we building both?"
    ],
    scopeBoundaries: [
      "Database hosting fees (AWS RDS, Supabase Pro) are client expenses",
      "Production-critical data migrations require separate scoping"
    ],
    hamzaEscalationTriggers: [
      "Complex security architecture, payment processing, or HIPAA/GDPR constraints",
      "High-scale concurrent databases (> 100k requests/minute)",
      "Legacy database schema migration with live production data"
    ],
    commercialAdvice: "Backend architecture always benefits from Hamza's sign-off before committing to a delivery date."
  },
  {
    id: 11,
    name: "AI Feature Integration",
    category: "AI & Automation",
    description: "Adding AI capabilities (summarization, smart categorization, translation, automated draft generation) into existing applications.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "Integrate 1 single AI feature (e.g., text summarization or auto-tagging button).",
        deliverables: ["1 targeted AI feature integrated into existing UI", "Prompt template engineering", "API connection with error handling", "Testing with client sample data"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "2-3 AI-assisted features (e.g., content generation, sentiment scoring, automated email drafts).",
        deliverables: ["Up to 3 AI capabilities integrated", "Structured JSON output parsing", "UI feedback states (spinners, streaming text)", "Input sanitization and prompt safety guardrails"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 600,
        turnaroundDays: 16,
        summary: "Multi-modal or advanced AI pipeline integrated with user workflow and feedback loop.",
        deliverables: ["Multi-step AI processing pipeline", "Support for image/document inputs or streaming output", "User editing & revision controls for AI output", "Token usage monitoring and caching"]
      }
    },
    typicalWork: [
      "Adding AI capabilities to an existing application",
      "AI-assisted text generation",
      "Summarization",
      "Classification or other appropriate AI features",
      "Integration with an AI provider"
    ],
    keyQuestionsToAsk: [
      "What specific feature should the AI perform (e.g., generate a proposal, summarize notes, classify tickets)?",
      "What application or tech stack are we integrating this into?",
      "Which AI model provider do you prefer (Gemini, OpenAI, Anthropic)?",
      "What is the expected frequency or volume of usage per day?"
    ],
    scopeBoundaries: [
      "Not to be confused with a complete standalone chatbot (Service 3) or document RAG engine (Service 16)",
      "Model API usage costs are the client's direct responsibility"
    ],
    hamzaEscalationTriggers: [
      "Fine-tuning proprietary models or local LLM deployment (Ollama on private server)",
      "Real-time audio/video AI analysis"
    ],
    commercialAdvice: "Focus on the specific user action. Clarify that the client needs their own API key."
  },
  {
    id: 12,
    name: "Figma to React Development",
    category: "Web Development",
    description: "Pixel-perfect conversion of approved Figma designs into clean, responsive React and TypeScript components.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "1-2 responsive pages converted from Figma to React/Tailwind.",
        deliverables: ["1-2 pixel-perfect React pages", "Responsive mobile/tablet/desktop layouts", "Clean TypeScript components", "Tailwind CSS styling", "Source code repository"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "Up to 5 responsive pages with reusable UI components and interactions.",
        deliverables: ["Up to 5 pages coded faithfully from Figma", "Modular component hierarchy", "Interactive hover/active states", "React Router navigation", "Form inputs with validation"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 650,
        turnaroundDays: 18,
        summary: "Full Figma design system and multi-page application (up to 8-10 views).",
        deliverables: ["Up to 8-10 complete responsive views", "Comprehensive design system component library", "Micro-animations & transitions", "Production build optimization", "Deployment ready"]
      }
    },
    typicalWork: [
      "Implementing approved Figma designs in React",
      "Responsive layouts",
      "Reusable UI components",
      "Translating design specifications into code"
    ],
    keyQuestionsToAsk: [
      "Can you share the Figma file link to verify design completeness and responsiveness?",
      "Does the Figma file include mobile and tablet frames, or desktop only?",
      "Do the components need to connect to real backend APIs, or is this front-end code only?",
      "Are all vector icons, images, and fonts readily exportable?"
    ],
    scopeBoundaries: [
      "Backend database and server-side logic are not included unless scoped with Service 10",
      "If mobile frames are missing in Figma, responsive behavior is adapted using standard conventions"
    ],
    hamzaEscalationTriggers: [
      "Figma file includes complex animations, Three.js 3D models, or canvas drawings",
      "Very tight deadline with incomplete Figma designs"
    ],
    commercialAdvice: "Always request the Figma link first! Check if desktop and mobile frames are provided before locking in the price."
  },
  {
    id: 13,
    name: "HTML, CSS and JavaScript Websites",
    category: "Web Development",
    description: "Lightweight, high-speed static websites built with modern vanilla HTML5, CSS3, and JavaScript.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 60,
        turnaroundDays: 4,
        summary: "Single-page responsive static site with clean vanilla code.",
        deliverables: ["1 responsive HTML5/CSS3 page", "Mobile-first responsive styling", "Basic JavaScript interactions (mobile menu, modals)", "W3C valid code"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 160,
        turnaroundDays: 7,
        summary: "Up to 4-5 static pages with modern styling and contact form.",
        deliverables: ["Up to 5 interconnected HTML pages", "Clean CSS styling with animations", "Working contact form integration (Formspree/Web3Forms)", "Cross-browser testing"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 300,
        turnaroundDays: 12,
        summary: "Up to 8 static pages with custom JS widgets, sliders, and speed optimization.",
        deliverables: ["Up to 8 pages with modular structure", "Interactive widgets (tabs, accordions, lightboxes)", "90+ Google PageSpeed score target", "SEO meta optimization & sitemap", "Deployment to hosting"]
      }
    },
    typicalWork: [
      "Custom front-end websites",
      "Responsive pages",
      "Interactive elements",
      "Website sections and navigation",
      "HTML, CSS, and JavaScript implementation"
    ],
    keyQuestionsToAsk: [
      "How many total pages are needed?",
      "Do you require a framework (React/Next) or do you specifically want lightweight vanilla HTML/CSS/JS?",
      "Do you already have a design or wireframe to follow?",
      "Where will the site be hosted?"
    ],
    scopeBoundaries: [
      "No dynamic CMS backend or user database included in static HTML",
      "Content updates require editing HTML files unless connected to a headless CMS"
    ],
    hamzaEscalationTriggers: [
      "Client actually needs a dynamic database or CMS but asks for HTML",
      "Complex custom web graphics or Canvas rendering"
    ],
    commercialAdvice: "Great for clients who want ultra-fast load times, low hosting costs, and no framework overhead."
  },
  {
    id: 14,
    name: "Website Redesign and Responsive Improvements",
    category: "Web Development",
    description: "Modernizing outdated websites, fixing mobile/tablet responsiveness, improving UX and visual aesthetics.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 60,
        turnaroundDays: 3,
        summary: "Fix broken mobile responsiveness on 1-2 key pages.",
        deliverables: ["Audit of mobile layout issues", "CSS media query adjustments", "Testing across iPhone, Android, and tablets", "Verification on live staging"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 180,
        turnaroundDays: 7,
        summary: "Visual modernization and full responsive overhaul of a 3-5 page website.",
        deliverables: ["Modernized typography, colors, and layout spacing", "Complete responsive fixes across all devices", "Improved navigation & mobile drawer menu", "Retain existing content and URLs"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 350,
        turnaroundDays: 12,
        summary: "Complete redesign and UI refresh for up to 8-10 pages.",
        deliverables: ["Full visual overhaul with modern SaaS/corporate aesthetics", "Enhanced call-to-actions and conversion layout", "Speed optimization and modern CSS", "Cross-browser and device regression testing"]
      }
    },
    typicalWork: [
      "Website visual improvements",
      "Responsive corrections",
      "Layout redesign",
      "Improved usability and presentation"
    ],
    keyQuestionsToAsk: [
      "What is the current website URL?",
      "What are the main pain points with the current design?",
      "Do you have reference websites whose look and feel you admire?",
      "Do we need to preserve existing text and structure, or rewrite them?"
    ],
    scopeBoundaries: [
      "Never promise specific conversion percentage increases or Google search ranking positions",
      "Underlying backend platform changes are not included in a front-end redesign"
    ],
    hamzaEscalationTriggers: [
      "The underlying codebase is severely broken or built on an obsolete custom framework",
      "Client wants a complete backend migration alongside redesign"
    ],
    commercialAdvice: "Always inspect the live URL first before promising delivery. Ask what specific parts look outdated to the client."
  },
  {
    id: 15,
    name: "AI Agents and Workflow Automation",
    category: "AI & Automation",
    description: "Multi-step autonomous AI workflows, automated lead processing, Zapier/Make AI automations, and LLM tool-calling.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 125,
        turnaroundDays: 5,
        summary: "Single-trigger automated workflow connecting an AI step (e.g., email webhook -> AI summary -> Slack).",
        deliverables: ["Single workflow automation (Make.com, Zapier, or Python)", "AI prompt & output formatting step", "Integration of 2 external apps", "Testing and error alerts"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 350,
        turnaroundDays: 10,
        summary: "Multi-step automated pipeline with decision branching, data extraction, and CRM updating.",
        deliverables: ["Multi-step automated pipeline with conditional logic", "Data extraction & structured validation", "Integration across 3-4 platforms (e.g. Gmail + OpenAI + Airtable + Slack)", "Fallback error handling & execution logs", "Admin walkthrough video/guide"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 750,
        turnaroundDays: 20,
        summary: "Custom autonomous agent system with tool execution, memory, and human-in-the-loop approval.",
        deliverables: ["Custom AI agent pipeline with function calling", "Human-in-the-loop review interface or Slack approval", "Persistent memory/database logging", "Rate-limit and quota management", "Deployment and operating documentation"]
      }
    },
    typicalWork: [
      "AI-assisted workflows",
      "Multi-step automation",
      "Task orchestration",
      "Connecting appropriate services",
      "Reducing repetitive manual work"
    ],
    keyQuestionsToAsk: [
      "What triggers the workflow (new email, form submit, cron schedule)?",
      "What specific actions should the AI take, and what tools should it invoke?",
      "Do you want this built in no-code (Make.com, Zapier) or custom code (Python/Node)?",
      "Does a human need to approve the action before it sends/publishes?"
    ],
    scopeBoundaries: [
      "Third-party subscription costs (Zapier/Make, OpenAI tokens) are paid by the client",
      "Autonomous actions that modify financial data or send public messages without human review carry risks that must be acknowledged"
    ],
    hamzaEscalationTriggers: [
      "Autonomous agents that execute financial transactions or send unvetted customer communications",
      "Complex multi-agent architectures (LangGraph, CrewAI) requiring dedicated server hosting"
    ],
    commercialAdvice: "Clarify whether no-code (Make/Zapier) or custom Python is preferred. Human-in-the-loop approval is always recommended for client safety."
  },
  {
    id: 16,
    name: "AI Document Assistant and Knowledge Search",
    category: "AI & Automation",
    description: "Retrieval-Augmented Generation (RAG) over PDFs, internal docs, Notion, or knowledge bases with source-attributed answers.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 200,
        turnaroundDays: 7,
        summary: "Document Q&A assistant over a small curated set of documents (up to 10 PDFs/docs).",
        deliverables: ["Document parsing & chunking pipeline", "Vector embedding generation", "Search and question-answering interface", "Source reference mentions in responses"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 500,
        turnaroundDays: 14,
        summary: "Knowledge assistant over dynamic document library with custom web interface and source citations.",
        deliverables: ["Dynamic document upload interface", "Vector database setup (Chroma/Pinecone/pgvector)", "Accurate citation & snippet highlighting", "User session management", "Deployment to cloud staging"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 1000,
        turnaroundDays: 25,
        summary: "Enterprise-grade knowledge search system with access permissions, analytics, and hybrid keyword+vector search.",
        deliverables: ["Hybrid search (BM25 + Dense vector embeddings)", "Role-based document access controls", "Document sync connector (Google Drive/S3)", "Admin analytics on frequent questions", "Full production deployment & security setup"]
      }
    },
    typicalWork: [
      "Question answering over documents",
      "Knowledge search",
      "Document-based AI assistants",
      "Retrieval-based workflows",
      "Source-aware answers where supported"
    ],
    keyQuestionsToAsk: [
      "What formats are your documents in (PDFs, DOCX, Markdown, Notion)?",
      "How many total documents or pages, and how often do they change?",
      "Do different users have different access permissions to documents?",
      "What privacy/security requirements exist for sensitive company data?"
    ],
    scopeBoundaries: [
      "Do not guarantee 100% infallible accuracy; AI document systems reduce hallucinations but cannot eliminate them entirely",
      "Client must fund their vector database and embedding token costs"
    ],
    hamzaEscalationTriggers: [
      "Enterprise security, confidential legal/medical documents, HIPAA/SOC2 compliance",
      "Large corpus (> 1,000 documents) requiring custom OCR and chunking tuning"
    ],
    commercialAdvice: "High-value service. Always emphasize source citations so the user can verify answers. Requires Hamza's technical sign-off for enterprise scale."
  },
  {
    id: 17,
    name: "Machine-Learning Model Prototype",
    category: "Data & Analytics",
    description: "Scoping, training, baseline evaluation, and prototype deployment of tabular, NLP, or computer vision machine learning models.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "Data exploration, feature engineering, and baseline classification/regression model.",
        deliverables: ["Data preparation script", "2 baseline ML models evaluated (e.g. Scikit-Learn / XGBoost)", "Performance metrics report (Accuracy, F1, RMSE)", "Jupyter notebook with comments"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "Hyperparameter-tuned ML model with evaluation report and simple inference script.",
        deliverables: ["Feature engineering and selection", "Hyperparameter tuning across multiple architectures", "Comprehensive evaluation charts (ROC, confusion matrix, feature importance)", "Inference script with sample test predictions", "Saved model artifact (.pkl / .onnx)"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 600,
        turnaroundDays: 18,
        summary: "End-to-end ML prototype with containerized FastAPI inference endpoint.",
        deliverables: ["Trained model artifact with preprocessing pipeline", "REST API for real-time predictions (FastAPI)", "Docker container setup for deployment", "Model validation report & drift notes", "API documentation"]
      }
    },
    typicalWork: [
      "ML prototypes",
      "Dataset preparation",
      "Baseline models",
      "Model evaluation",
      "Prediction experiments"
    ],
    keyQuestionsToAsk: [
      "What is the target variable you are trying to predict or classify?",
      "How many labeled training examples do you have available?",
      "What metric determines business success (precision, recall, latency)?",
      "Do you need a research notebook or a live API inference endpoint?"
    ],
    scopeBoundaries: [
      "Never guarantee a specific accuracy percentage before evaluating the client's actual data",
      "Model performance is strictly bounded by dataset quality and quantity"
    ],
    hamzaEscalationTriggers: [
      "Client demands a guaranteed accuracy metric as a condition of milestone payment",
      "Deep learning on massive video/audio datasets requiring GPU cluster training"
    ],
    commercialAdvice: "Explain to Farhan: ML depends heavily on data quality. Emphasize that we provide a prototype and rigorous evaluation, never promising 99% accuracy blind."
  },
  {
    id: 18,
    name: "Analytics Dashboards and Reporting",
    category: "Data & Analytics",
    description: "Interactive KPI dashboards, executive reporting portals, Chart.js/Recharts/Tremor implementations, and business intelligence.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "Single dashboard page with 3-4 KPI metric cards and 2 interactive charts.",
        deliverables: ["1 clean responsive dashboard view", "3-4 summary KPI cards", "2 interactive charts (bar/line/pie)", "Mock data or CSV file connector", "Tailwind styling"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "Multi-tab analytics dashboard connected to real API/database with date filtering.",
        deliverables: ["Multi-view analytics dashboard", "Date-range picker and category filters", "5-8 diverse interactive charts", "Connection to SQL database or REST API", "CSV/PDF report export button"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 600,
        turnaroundDays: 18,
        summary: "Enterprise reporting portal with role-based metric views, real-time refresh, and automated email summaries.",
        deliverables: ["Full analytics portal with role-based views", "Real-time or scheduled data refresh", "Custom drill-down reporting", "Automated scheduled email report summaries", "Deployment to production"]
      }
    },
    typicalWork: [
      "Analytics dashboards",
      "KPI visualizations",
      "Charts and reports",
      "Data presentation interfaces",
      "Dashboard UI implementation"
    ],
    keyQuestionsToAsk: [
      "Where does the underlying data live (SQL database, Google Analytics, Stripe, CSV)?",
      "What specific KPIs or metrics must appear on the executive view?",
      "Do users need date filtering, sorting, or custom CSV/PDF exports?",
      "Is this an internal company tool or a client-facing portal?"
    ],
    scopeBoundaries: [
      "Complex ETL pipelines to ingest third-party databases are scoped under Service 7/10",
      "Third-party BI software subscriptions (Tableau, PowerBI) are not included"
    ],
    hamzaEscalationTriggers: [
      "Massive real-time streaming data (> thousands of events/second) requiring WebSockets",
      "Complex multi-tenant security where clients can only view their own sub-accounts"
    ],
    commercialAdvice: "Clients love visual dashboards! Confirm data sources early so we know whether live API connectors are needed."
  },
  {
    id: 19,
    name: "WordPress and Shopify Websites",
    category: "Infrastructure & CMS",
    description: "Theme customization, WooCommerce and Shopify stores, plugin configuration, and content layout management.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 100,
        turnaroundDays: 5,
        summary: "Theme installation, logo setup, and 1-3 content pages or basic product setup.",
        deliverables: ["Installation of client's chosen theme", "Header, footer, logo, and color setup", "Up to 3 pages configured", "Contact form setup", "Mobile responsive check"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 300,
        turnaroundDays: 10,
        summary: "Complete store or business site (up to 6 pages, 15 products), payment gateway setup, and plugins.",
        deliverables: ["Up to 6 complete pages", "Setup of up to 15 products with variations", "Payment gateway connection (Stripe, PayPal, Shopify Payments)", "Essential plugins (SEO, caching, security)", "Mobile checkout optimization"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 650,
        turnaroundDays: 18,
        summary: "Custom theme customization, liquid/PHP code modifications, advanced store features, and migration.",
        deliverables: ["Custom CSS/PHP or Liquid theme modifications", "Up to 10 pages + product catalog structure", "Advanced filtering, reviews, and upsell apps", "Speed optimization and SEO setup", "Store launch checklist & handover training"]
      }
    },
    typicalWork: [
      "WordPress websites",
      "Shopify storefronts",
      "Theme customization",
      "Product or content layouts",
      "Basic store or website setup"
    ],
    keyQuestionsToAsk: [
      "Are you using WordPress (WooCommerce) or Shopify?",
      "Do you already have a purchased theme, or do you want free themes configured?",
      "How many total pages and products do you plan to launch with?",
      "Which payment gateway will you use (Stripe, PayPal, Shopify Payments)?"
    ],
    scopeBoundaries: [
      "Paid themes, paid Shopify apps, and WordPress hosting subscriptions are paid directly by client",
      "Writing product descriptions and taking product photography are not included"
    ],
    hamzaEscalationTriggers: [
      "Custom headless Shopify/WordPress build with React/Next.js frontend",
      "Complex data migration of thousands of customers/orders from an older platform"
    ],
    commercialAdvice: "Make sure client understands Shopify and paid plugins carry their own monthly fees."
  },
  {
    id: 20,
    name: "Wireframes and Clickable Prototypes",
    category: "Design & Prototype",
    description: "Low and mid-fidelity wireframing, UX user journey mapping, screen architecture, and clickable prototypes.",
    packages: {
      basic: {
        tier: "Basic",
        priceUSD: 60,
        turnaroundDays: 4,
        summary: "Wireframes for 2-3 key screens outlining layout and content hierarchy.",
        deliverables: ["2-3 low-fidelity wireframe screens", "Information architecture and layout planning", "PDF and Figma view link"]
      },
      standard: {
        tier: "Standard",
        priceUSD: 180,
        turnaroundDays: 7,
        summary: "Complete wireframe flow for 5-7 screens with user journey maps.",
        deliverables: ["5-7 screens in mid-fidelity", "User journey flow diagrams", "Clickable prototype link in Figma", "Feedback revision session"]
      },
      premium: {
        tier: "Premium",
        priceUSD: 350,
        turnaroundDays: 12,
        summary: "Full product wireframe specification (up to 12 screens) with interactive user flows.",
        deliverables: ["Up to 12 wireframe screens", "Comprehensive clickable prototype demonstrating all core user actions", "UX specification notes for developers", "Exported assets and user flow documentation"]
      }
    },
    typicalWork: [
      "Low-fidelity wireframes",
      "User flows",
      "Screen planning",
      "Clickable prototypes",
      "Early product experience design"
    ],
    keyQuestionsToAsk: [
      "What is the core user goal or problem your application solves?",
      "How many primary user roles exist (e.g. buyer vs seller, admin vs customer)?",
      "Do you need web, mobile app, or both wireframes?",
      "What fidelity do you want: conceptual low-fidelity wireframes or interactive prototype?"
    ],
    scopeBoundaries: [
      "Wireframes focus on UX structure and user flows, not final polished visual graphic design (see Service 8)",
      "Coding is not included (can be scoped later)"
    ],
    hamzaEscalationTriggers: [
      "Complex technical workflows where technical feasibility must be vetted during wireframing"
    ],
    commercialAdvice: "Ideal first step for clients with a raw startup idea. Wireframes help de-risk scope before committing to code."
  }
];
