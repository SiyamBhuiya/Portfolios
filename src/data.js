export const SITE = {
  name: 'Siyam',
  fullName: 'MD. Siyam Bhuiyan',
  role: 'Junior Automation Engineer',
  company: 'SM Technology',
  location: 'Dhaka',
  country: 'Bangladesh',
  email: 'siyambhuiya44@gmail.com',
  github: 'https://github.com/SiyamBhuiya',
  linkedin: 'https://www.linkedin.com/in/siyam-bhuiyan',
  cv: 'MD_Siyam_Bhuiyan_CV.pdf', // save the PDF in /public with this exact name
}

export const tools = ['n8n', 'Make.com', 'Shopify', 'ClickUp', 'Notion', 'Airtable', 'Google Sheets', 'WhatsApp', 'HubSpot', 'Odoo', 'respond.io', 'Monday.com', 'Frame.io', 'Outseta', 'Circle.so', 'OpenAI and other AI APIs']

export const PROFILE = {
  summary: [
    'I am a junior automation engineer at SM Technology in Dhaka. I build workflows in n8n and Make.com that connect CRMs, Shopify, Notion and ClickUp, and I add AI where it saves real work.',
    'I hold a B.Sc. in Software Engineering with a Data Science major. Outside automation I work in Python, with Scikit-learn, TensorFlow and PyTorch.',
  ],
  experience: [
    {
      role: 'Junior Automation Engineer',
      org: 'SM Technology, Dhaka',
      period: 'Apr 2026 to present',
      points: [
        'Built end-to-end workflows in n8n and Make.com that connect several CRM platforms, Notion and ClickUp and remove repetitive manual work.',
        'Connected the Shopify API to n8n pipelines for order management, inventory sync and customer notifications.',
        'Used LLM and AI model APIs to add context-aware features to internal and client-facing products.',
        'Used PostgreSQL for structured data and Redis for caching.',
        'Containerised services with Docker so environments are consistent and repeatable.',
      ],
    },
  ],
  skills: [
    ['Automation and integration', 'n8n, Make.com, Shopify API, CRM integrations, Airtable, Notion, ClickUp'],
    ['AI and machine learning', 'Scikit-learn, TensorFlow, PyTorch, basic CNNs, LLM APIs, multi-agent systems'],
    ['Programming and web', 'Python (primary), JavaScript, Java, React.js, FastAPI'],
    ['Databases', 'PostgreSQL, Redis, MongoDB'],
    ['Dev tools', 'Git, GitHub, Docker, Postman, VS Code'],
  ],
  education: [
    { title: 'B.Sc. in Software Engineering, Data Science major', org: 'Daffodil International University', period: 'Feb 2021 to Dec 2024', note: 'CGPA 3.24' },
    { title: 'Higher Secondary Certificate, Science', org: 'Govt. Kaliganj Sramik College', period: '2018 to 2020', note: 'GPA 3.83' },
  ],
  certification: { name: 'AI Agent Development Bootcamp', org: 'Ostad', date: 'Oct 2025', note: 'AI agent workflows, LLM integration, multi-agent systems.', url: '' },
  languages: ['Bangla, native', 'English, professional proficiency'],
  // add a url to show a link on the About page
  projects: [
    { name: 'Multi-Agent System', desc: 'Routes queries to specialised roles through FastAPI and LLM APIs.', tags: 'Python, FastAPI, LLM APIs', url: '' },
    { name: 'Multimodal Inference APIs', desc: 'FastAPI endpoints for speech-to-text and image generation.', tags: 'FastAPI, Speech-to-text, Image generation', url: '' },
    { name: 'AI Support Assistant', desc: 'LLM-powered chatbot that answers customer queries with contextual memory.', tags: 'Python, LLM APIs, NLP', url: '' },
    { name: 'Thesis Portal', desc: 'React web app to track thesis progress and milestones.', tags: 'React.js, JavaScript', url: '' },
  ],
}