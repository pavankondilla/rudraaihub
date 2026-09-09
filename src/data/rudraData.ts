import { ServiceItem, ValueProp, DemoWorkflow, CaseStudy } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-automations',
    title: 'AI Automations',
    shortDesc: 'Automate repetitive tasks and save time with intelligent workflows.',
    fullDesc: 'We architect end-to-end autonomous agentic workflows that handle routine business processes, document routing, email processing, and CRM updates without manual intervention.',
    iconName: 'Workflow',
    features: [
      'Autonomous Lead Qualification & CRM Sync',
      'Automated Document & Invoice Parsing',
      'Customer Support AI Email & Ticket Triage',
      'Custom RPA (Robotic Process Automation) Bots'
    ],
    techStack: ['Python', 'Node.js', 'Zapier Enterprise', 'Make.com', 'Custom Webhooks', 'Vector DBs'],
    idealFor: 'Startups, Agencies, and Enterprises drowning in manual administrative tasks.',
    sampleUseCases: [
      'Extracting invoice fields and auto-booking into Accounting Software',
      'Categorizing incoming customer support tickets and auto-generating verified responses',
      'Scraping and analyzing market lead signals directly into sales pipelines'
    ]
  },
  {
    id: 'saas-solutions',
    title: 'SaaS Solutions',
    shortDesc: 'Powerful SaaS platforms designed to streamline your business.',
    fullDesc: 'Transform your concept into a production-grade, multi-tenant SaaS application with modern full-stack architectures, subscription management, and secure APIs.',
    iconName: 'Box',
    features: [
      'Custom Micro-SaaS Product Engineering',
      'Multi-tenant Architecture & Role-Based Access',
      'Stripe / Razorpay Payment Integration',
      'Interactive Analytics & Admin Dashboards'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Cloud Run'],
    idealFor: 'Founders looking to launch an AI SaaS or internal tool quickly.',
    sampleUseCases: [
      'B2B AI Content & Document Management Portal',
      'Customer Feedback & Sentiment Analytics Platform',
      'AI-powered Automated Hiring & Resume Screening Dashboard'
    ]
  },
  {
    id: 'ai-websites',
    title: 'AI Websites',
    shortDesc: 'Premium, conversion-focused websites engineered to make your brand look world-class.',
    fullDesc: 'We design and build premium websites for you — sleek, fast, AI-enhanced experiences that turn visitors into customers, from marketing sites to full product landing pages.',
    iconName: 'Globe',
    features: [
      'Premium, Conversion-Focused Website Design',
      'AI-Personalized Content & Smart Chat Widgets',
      'Blazing-Fast, SEO-Optimized Builds',
      'Fully Responsive, Pixel-Perfect UI/UX'
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel / Netlify', 'Headless CMS'],
    idealFor: 'Brands and founders who need a premium web presence that converts.',
    sampleUseCases: [
      'High-converting SaaS marketing & landing pages',
      'AI-powered product showcase sites with live demos',
      'Premium portfolio & agency websites with custom motion design'
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    shortDesc: 'Connect your tools and systems for a seamless business flow.',
    fullDesc: 'Eliminate data silos by interconnecting your existing stack (CRM, ERP, Slack, Google Workspace, Databases) with secure, real-time API integrations.',
    iconName: 'GitFork',
    features: [
      'Custom REST & GraphQL API Development',
      'Legacy ERP & CRM System Interconnections',
      'Slack & WhatsApp Enterprise Bot Bridges',
      'Real-time Webhook & Event Streaming'
    ],
    techStack: ['REST APIs', 'GraphQL', 'Webhooks', 'OAuth 2.0', 'Redis Queues', 'FastAPI'],
    idealFor: 'Businesses operating with fragmented software tools that need unified data flows.',
    sampleUseCases: [
      'Syncing Salesforce leads with internal WhatsApp notification bots',
      'Bi-directional ERP inventory updates with Shopify & Amazon storefronts',
      'Automated Google Sheets & Notion database synchronization'
    ]
  },
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    shortDesc: 'Get expert guidance to implement AI and scale your business.',
    fullDesc: 'Partner with our AI architects to identify high-ROI opportunities, select optimal technology stacks, assess data readiness, and create a structured 12-month AI roadmap.',
    iconName: 'Lightbulb',
    features: [
      'AI Readiness Audit & Tech Stack Evaluation',
      'ROI & Cost-Benefit Feasibility Mapping',
      'Custom Model Strategy & Fine-tuning Advice',
      'Data Privacy & Security Compliance Audits'
    ],
    techStack: ['Enterprise AI Strategy', 'Data Engineering Frameworks', 'LLM Security', 'Cloud Cost Optimization'],
    idealFor: 'C-Suite executives and leadership teams seeking a roadmap before committing capital to AI.',
    sampleUseCases: [
      'Evaluating enterprise cloud vs on-prem AI deployment costs',
      'Designing custom data pipelines for domain-specific fine-tuning',
      'Formulating corporate AI safety and data privacy policy protocols'
    ]
  }
];

export const WHY_CHOOSE_US: ValueProp[] = [
  {
    id: 'innovation',
    title: 'Innovation Driven',
    desc: 'We use cutting-edge AI technologies to solve real business problems.',
    iconName: 'Sparkles',
    metric: '100%',
    metricLabel: 'Modern AI Architecture'
  },
  {
    id: 'scalability',
    title: 'Scalable Solutions',
    desc: 'Our solutions grow with your business and adapt to your needs.',
    iconName: 'TrendingUp',
    metric: '99.9%',
    metricLabel: 'System Uptime Guarantee'
  },
  {
    id: 'expert-team',
    title: 'Expert Team',
    desc: 'Experienced professionals passionate about AI and automation.',
    iconName: 'Users',
    metric: '50+',
    metricLabel: 'AI Pipelines Deployed'
  },
  {
    id: 'results',
    title: 'Results Focused',
    desc: 'We focus on measurable outcomes that drive business success.',
    iconName: 'Target',
    metric: '10x',
    metricLabel: 'Average ROI Realized'
  }
];

export const DEMO_WORKFLOWS: DemoWorkflow[] = [
  {
    id: 'wf-lead',
    title: 'Inbound Lead Qualification & CRM Sync',
    category: 'Sales Automation',
    description: 'Simulates automatic enrichment, sentiment scoring, and assignment of incoming web form submissions directly into HubSpot CRM.',
    timeSaved: '15 Hours / Week',
    steps: [
      { id: 1, name: 'Webform Triggered', description: 'Captured lead: "Acme Corp - Enterprise Inquiry"', status: 'idle', outputLog: 'Raw payload parsed: Name, Email, Budget ($50k+)' },
      { id: 2, name: 'AI Data Enrichment', description: 'Evaluating company domain, team size & tech stack', status: 'idle', outputLog: 'Enriched: Acme Corp (50-200 employees, B2B SaaS)' },
      { id: 3, name: 'Lead Scoring & Triage', description: 'Calculated Intent Score: 94/100 (High Priority)', status: 'idle', outputLog: 'Tag applied: "Hot Lead - High Value"' },
      { id: 4, name: 'HubSpot CRM Sync & Rep Alert', description: 'Created Lead Record #4892 & notified Senior Sales AE on Slack', status: 'idle', outputLog: 'Slack alert dispatched to #sales-leads' }
    ]
  },
  {
    id: 'wf-invoice',
    title: 'Automated Invoice OCR & ERP Entry',
    category: 'Finance Automation',
    description: 'Simulates extracting structured line items, VAT/tax data, and totals from PDF vendor invoices into accounting databases.',
    timeSaved: '22 Hours / Week',
    steps: [
      { id: 1, name: 'PDF Ingestion', description: 'Received email attachment: Invoice_INV-2026-88.pdf', status: 'idle', outputLog: 'Document decrypted and converted to high-res raster' },
      { id: 2, name: 'Vision OCR Extraction', description: 'Extracting Vendor Name, Line Items, Tax IDs, Total Amount', status: 'idle', outputLog: 'Extracted: Total $12,450.00 | Vendor: CloudTech Solutions' },
      { id: 3, name: 'Validation & Duplicate Check', description: 'Cross-checking PO #8831 against ERP records', status: 'idle', outputLog: 'PO matched. No duplicates found.' },
      { id: 4, name: 'QuickBooks Entry & Approval Request', description: 'Pushed line items to Accounts Payable queue', status: 'idle', outputLog: 'Payment approval ticket created for CFO' }
    ]
  },
  {
    id: 'wf-support',
    title: 'Customer Ticket Auto-Categorization & Response',
    category: 'Support Automation',
    description: 'Simulates reading customer emails, determining issue urgency, generating a verified reply draft, and routing to specialist teams.',
    timeSaved: '18 Hours / Week',
    steps: [
      { id: 1, name: 'Support Email Ingestion', description: 'Inbound message: "Unable to connect custom domain to portal"', status: 'idle', outputLog: 'Subject parsed: DNS Configuration Query' },
      { id: 2, name: 'Intent & Sentiment Analysis', description: 'Detected category: "Domain Setup", Urgency: "Medium"', status: 'idle', outputLog: 'Confidence Score: 98.4%' },
      { id: 3, name: 'Knowledge Base Match', description: 'Retrieved troubleshooting guide for domain A-records', status: 'idle', outputLog: 'Matched Article ID #104' },
      { id: 4, name: 'Draft Generation & Zendesk Update', description: 'Drafted tailored resolution instructions for agent review', status: 'idle', outputLog: 'Ticket #9123 updated with auto-reply draft' }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    clientName: 'FinEdge Global',
    industry: 'Fintech & Payments',
    challenge: 'Manual customer onboarding verification was taking 48+ hours, causing 35% drop-off in user conversion.',
    solution: 'Designed and deployed an automated AI verification workflow linking document analysis, ID checks, and database sync.',
    impact: 'Reduced verification processing time from 48 hours to 45 seconds while boosting onboarding completion rate by 42%.',
    metrics: [
      { label: 'Time Reduction', value: '98%' },
      { label: 'Conversion Increase', value: '+42%' },
      { label: 'Annual Cost Saved', value: '$120,000' }
    ]
  },
  {
    id: 'cs-2',
    clientName: 'LogiFlow Supply Chain',
    industry: 'Logistics & Warehousing',
    challenge: 'Managing over 1,000 daily shipping manifest manifests across 14 fragmented warehouse systems.',
    solution: 'Engineered a unified API integration layer with automated document parsing and real-time inventory webhooks.',
    impact: 'Achieved 100% error-free shipment tracking and saved 120+ team hours per week.',
    metrics: [
      { label: 'Weekly Hours Saved', value: '120+' },
      { label: 'Data Accuracy', value: '99.9%' },
      { label: 'Order Velocity', value: '3x' }
    ]
  }
];

export const FAQS = [
  {
    question: 'How long does a typical AI Automation project take to deploy?',
    answer: 'Most custom workflow automations and API integrations are deployed within 2 to 4 weeks. Full-scale SaaS platforms or complex enterprise consulting engagements typically span 6 to 12 weeks.'
  },
  {
    question: 'Will RudraAiHub solutions integrate with our existing software tools?',
    answer: 'Yes! We build seamless integrations for Zapier, Make, custom REST APIs, databases (PostgreSQL, MongoDB), HubSpot, Salesforce, Stripe, Slack, WhatsApp, Google Workspace, and ERPs.'
  },
  {
    question: 'How do you ensure data privacy and security?',
    answer: 'We enforce enterprise-grade security protocols. Your business data is encrypted in transit and at rest, and we strictly follow zero-retention data policies so your confidential records are never trained on by public models.'
  },
  {
    question: 'What is the pricing model for RudraAiHub services?',
    answer: 'We offer flexible engagement models: fixed-price milestone projects for custom SaaS and automations, or monthly retainer models for ongoing AI consulting and workflow maintenance.'
  }
];
