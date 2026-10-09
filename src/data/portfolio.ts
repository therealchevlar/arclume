export interface VerifiedProject {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  technologies: string[];
  summary: string;
  relevanceKeywords: string[];
  publicSharingGuidance: string;
}

export const VERIFIED_PORTFOLIO_PROJECTS: VerifiedProject[] = [
  {
    id: 'proj-1',
    name: 'Hamza Atif Portfolio & Technical Hub',
    domain: 'hamzaatif.me',
    url: 'https://hamzaatif.me',
    category: 'Full-Stack & Systems',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    summary: 'Personal technical portfolio displaying engineering work, open source contributions, and modern responsive UI.',
    relevanceKeywords: ['portfolio', 'personal website', 'react', 'typescript', 'responsive'],
    publicSharingGuidance: 'Internal reference. Best to link directly to specific deployed projects below rather than generic homepage.'
  },
  {
    id: 'proj-2',
    name: 'Hamza Atif Tech Solutions',
    domain: 'hamzaatif.tech',
    url: 'https://hamzaatif.tech',
    category: 'Engineering & Automation',
    technologies: ['Python', 'Cloud Architecture', 'Automation', 'APIs'],
    summary: 'Technical solutions platform showcasing backend engineering, automation scripts, and full-stack development capability.',
    relevanceKeywords: ['backend', 'automation', 'python', 'architecture', 'saas'],
    publicSharingGuidance: 'Internal reference. Do not automatically insert into proposals; share only if Farhan decides it builds direct trust.'
  },
  {
    id: 'proj-3',
    name: 'AI Document Knowledge Base & Chat Engine',
    domain: 'hamzaatif.tech',
    url: 'https://hamzaatif.tech/projects/ai-rag-assistant',
    category: 'AI & Automation',
    technologies: ['Python', 'FastAPI', 'LangChain', 'Vector DB', 'React'],
    summary: 'RAG-powered conversational engine that extracts answers and source citations across multi-format PDF and markdown documentation.',
    relevanceKeywords: ['ai chatbot', 'rag', 'document assistant', 'vector', 'pdf', 'knowledge base'],
    publicSharingGuidance: 'Verified relevant for Service 3, 11, and 16. Share if client explicitly asks for working RAG proof.'
  },
  {
    id: 'proj-4',
    name: 'SaaS Analytics & Executive Metrics Portal',
    domain: 'hamzaatif.tech',
    url: 'https://hamzaatif.tech/projects/analytics-dashboard',
    category: 'Data & Analytics',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'PostgreSQL'],
    summary: 'Interactive business analytics platform featuring KPI widgets, date range slicing, data export, and dark mode interface.',
    relevanceKeywords: ['analytics', 'dashboard', 'reporting', 'charts', 'kpi', 'react'],
    publicSharingGuidance: 'Verified relevant for Service 5, 7, and 18. Demonstrates clean UI and complex data visualization.'
  },
  {
    id: 'proj-5',
    name: 'Automated Multi-Source Pipeline & Scraper Engine',
    domain: 'hamzaatif.tech',
    url: 'https://hamzaatif.tech/projects/python-automation-suite',
    category: 'AI & Automation',
    technologies: ['Python', 'Playwright', 'BeautifulSoup', 'Pandas', 'Cron'],
    summary: 'Robust batch processing pipeline with automated error recovery, proxy rotation, and structured Google Sheets / CSV sync.',
    relevanceKeywords: ['python', 'automation', 'scraper', 'data cleaning', 'csv', 'pipeline'],
    publicSharingGuidance: 'Verified relevant for Service 4 and 7. Excellent proof for workflow automation clients.'
  },
  {
    id: 'proj-6',
    name: 'Modern Corporate Responsive Web Platform',
    domain: 'hamzaatif.me',
    url: 'https://hamzaatif.me/work/corporate-web-platform',
    category: 'Web Development',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'SEO Optimization'],
    summary: 'High-speed 95+ PageSpeed business website with responsive mobile layout, custom interactive components, and lead capture form.',
    relevanceKeywords: ['website', 'landing page', 'responsive', 'figma to react', 'redesign'],
    publicSharingGuidance: 'Verified relevant for Service 1, 12, 13, and 14.'
  }
];
