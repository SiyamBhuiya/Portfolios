export const SITE = {
  name: "Siyam",
  fullName: "MD. Siyam Bhuiyan",
  role: "Junior Automation Engineer",
  company: "SM Technology",
  location: "Dhaka",
  country: "Bangladesh",
  email: "siyambhuiya44@gmail.com",
  github: "https://github.com/SiyamBhuiya",
  linkedin: "https://bd.linkedin.com/in/md-siyam-bhuiyan-work",
  cv: "MD_Siyam_Bhuiyan_CV.pdf", // save the PDF in /public with this exact name
}

export const tools = ["n8n", "Make.com", "Shopify", "ClickUp", "Notion", "Airtable", "Google Sheets", "WhatsApp", "HubSpot", "Odoo", "respond.io", "Monday.com", "Frame.io", "Outseta", "Circle.so", "OpenAI and other AI APIs"]

export const PROFILE = {
  summary: [
    "I am a junior automation engineer at SM Technology in Dhaka. I build workflows in n8n and Make.com that connect CRMs, Shopify, Notion and ClickUp, and I add AI where it saves real work.",
    "I hold a B.Sc. in Software Engineering with a Data Science major. Outside automation I work in Python, with Scikit-learn, TensorFlow and PyTorch.",
  ],
  experience: [
    {
      role: "Junior Automation Engineer",
      org: "SM Technology, Dhaka",
      period: "Apr 2026 to present",
      points: [
        "Built end-to-end workflows in n8n and Make.com that connect several CRM platforms, Notion and ClickUp and remove repetitive manual work.",
        "Connected the Shopify API to n8n pipelines for order management, inventory sync and customer notifications.",
        "Used LLM and AI model APIs to add context-aware features to internal and client-facing products.",
        "Used PostgreSQL for structured data and Redis for caching.",
        "Containerised services with Docker so environments are consistent and repeatable.",
      ],
    },
  ],
  skills: [
    ["Automation and integration", "n8n, Make.com, Shopify API, CRM integrations, Airtable, Notion, ClickUp"],
    ["AI and machine learning", "Scikit-learn, TensorFlow, PyTorch, basic CNNs, LLM APIs, multi-agent systems"],
    ["Programming and web", "Python (primary), JavaScript, Java, React.js, FastAPI"],
    ["Databases", "PostgreSQL, Redis, MongoDB"],
    ["Dev tools", "Git, GitHub, Docker, Postman, VS Code"],
  ],
  education: [
    { title: "B.Sc. in Software Engineering, Data Science major", org: "Daffodil International University", period: "Feb 2021 to Dec 2024", note: "CGPA 3.24" },
    { title: "Higher Secondary Certificate, Science", org: "Govt. Kaliganj Sramik College", period: "2018 to 2020", note: "GPA 3.83" },
  ],
  certification: { name: "AI Agent Development Bootcamp", org: "Ostad", date: "Oct 2025", note: "AI agent workflows, LLM integration, multi-agent systems.", url: "" },
  languages: ["Bangla, native", "English, professional proficiency"],
  // add a url to show a link on the About page
  projects: [
    { name: "Multi-Agent System", desc: "Routes queries to specialised roles through FastAPI and LLM APIs.", tags: "Python, FastAPI, LLM APIs", url: "" },
    { name: "Multimodal Inference APIs", desc: "FastAPI endpoints for speech-to-text and image generation.", tags: "FastAPI, Speech-to-text, Image generation", url: "" },
    { name: "AI Support Assistant", desc: "LLM-powered chatbot that answers customer queries with contextual memory.", tags: "Python, LLM APIs, NLP", url: "" },
    { name: "Thesis Portal", desc: "React web app to track thesis progress and milestones.", tags: "React.js, JavaScript", url: "" },
  ],
}

// Each project can list workflows. For a workflow with id "x", add the files
//   src/assets/shots/x.png   (n8n or Make screenshot, optional)
//   workflows-src/x.json     (cleaned export, optional; run "npm run lock" to encrypt it)
// tool: "n8n" (default) or "Make"
const w = (id, name, note, tool = "n8n") => ({ id, name, note, tool })

export const projects = [
  {
    slug: "meeting-scheduling",
    title: "Meeting scheduling for 800 clients",
    summary: "Clients pick a meeting time in WhatsApp and the calendar books itself.",
    problem: "Arranging meetings with roughly 800 clients means a lot of back and forth. The goal was to take that off the team and keep one reliable record of every meeting.",
    built: [
      "A monthly run that finds clients without a meeting and gives each one a unique slot from Google Calendar.",
      "WhatsApp proposals sent through Wassenger in batches of 10, with each send marked as sent or failed in Notion.",
      "A reply handler that reads what the client meant, checks the calendar and books the meeting, or asks for another time.",
      "An owner-instructed flow: the owner names a client and constraints, and the system finds the first free slot and proposes it.",
      "A Q&A flow that answers plain-language questions about clients and upcoming meetings from the Notion records.",
    ],
    hard: [
      "Wassenger rate limits, handled with batches and a wait between them.",
      "Checking for calendar conflicts before auto-booking, and logging conflicts for a manual follow-up.",
    ],
    stack: ["n8n", "Wassenger", "Google Calendar", "Notion", "OpenAI"],
    flow: ["Monthly schedule", "WhatsApp proposal", "AI reads reply", "Calendar booking", "Notion update"],
    workflows: [
      w("yearly-proposal", "Yearly meeting proposal scheduler", "Finds clients without a meeting and offers each one a unique slot over WhatsApp."),
      w("meeting-reply-handler", "Meeting reply handler", "Reads a client reply, works out the intent and books or reschedules."),
      w("manual-scheduler", "Owner-instructed booking", "The owner names a client and constraints, and the flow proposes the first free slot."),
      w("summary-qa", "Meeting Q&A", "Answers plain-language questions about clients and meetings from Notion."),
    ],
  },
  {
    slug: "whatsapp-invoice-reader",
    title: "WhatsApp invoice reader",
    summary: "Clients send an invoice in a chat and the data lands in Notion.",
    problem: "Clients already talk to the business on WhatsApp, so documents and requests arrive there. They needed to be read, sorted and acted on without retyping.",
    built: [
      "A webhook that receives WhatsApp messages from Wassenger and checks the sender number.",
      "Attachments: waits for the media, downloads it, reads images with GPT-4o and extracts text from PDFs, logs the result to a Notion client database and confirms by WhatsApp.",
      "Text messages: a GPT-4o classifier decides whether it is a meeting reply, a summary question, an email to send or a task for the secretary.",
      "Email requests: generates the content, then sends it or saves a Gmail draft, with alerts if sending fails.",
      "A retry loop for media that is not ready yet, with a timeout message to the sender.",
    ],
    hard: [
      "Wassenger API details: device IDs, string casting and template payload structure.",
      "Notion node output shape, which flattens fields and changes between n8n versions.",
      "Gmail and Notion nodes overwrite the incoming data, so later nodes reference the upstream node they need by name.",
    ],
    stack: ["n8n", "Wassenger", "GPT-4o", "Notion", "Gmail"],
    flow: ["WhatsApp message", "Phone check", "Read or classify", "Notion, email or task"],
    workflows: [w("whatsapp-ocr", "WhatsApp media reader and message router", "Reads attachments, classifies text messages and hands them to the right flow.")],
  },
  {
    slug: "telegram-invoicing",
    title: "Telegram AI agent for invoicing",
    summary: "Ask a bot about clients and payments in Telegram, while a schedule checks payments and prepares invoices.",
    problem: "Client and payment data lived in Google Sheets. Updating it, checking payments and producing invoice PDFs meant repeating the same steps by hand.",
    built: [
      "A Telegram bot with an AI agent (Claude) that can read and update the clients and checking sheets.",
      "A scheduled run that reads the clients, loops through them and checks payments through the Plaid API.",
      "Logic that either marks the client as paid and sends a completion email, or flags the case for manual review.",
      "Invoice PDFs: copies a Google Docs template, fills it in, converts it to PDF, renames it and saves a Gmail draft.",
    ],
    hard: [],
    stack: ["n8n", "Telegram", "Claude", "Google Sheets", "Plaid", "Google Drive", "Gmail"],
    flow: ["Schedule", "Read clients", "Check payment", "Paid or review", "Invoice PDF"],
    workflows: [w("telegram-invoicing", "Telegram agent and invoicing run", "Two flows on one canvas: the chat agent, and the scheduled payment check and invoicing.")],
  },
  {
    slug: "real-estate-email",
    title: "Real estate email triage",
    summary: "Every incoming email is labelled by who sent it and gets a drafted reply.",
    problem: "A real estate inbox mixes buyers, sellers, renters and other agents, and each needs a different reply.",
    built: [
      "A Gmail trigger with a filter that skips no-reply senders.",
      "An AI step that sorts each email into buyer, seller, rental, agent or other.",
      "A Gmail label for each category.",
      "The full thread is read and an AI step writes a reply, saved as a Gmail draft for a person to review.",
      "Emails marked other are labelled and marked as read without a draft.",
    ],
    hard: [],
    stack: ["n8n", "Gmail", "OpenAI"],
    flow: ["New email", "AI classifies", "Label", "Draft reply"],
    workflows: [w("real-estate-email", "Real estate email automation", "Classifies, labels and drafts replies for every new email.")],
  },
  {
    slug: "shopify-chargeback-clickup",
    title: "Shopify chargebacks to ClickUp",
    summary: "A new chargeback becomes a ClickUp task, and repeat alerts update the existing one.",
    problem: "Chargebacks need to be tracked until they are resolved, and a second alert for the same order should not create a duplicate task.",
    built: [
      "A custom webhook that starts the scenario instantly.",
      "The order is fetched from Shopify.",
      "Existing ClickUp tasks are listed and aggregated so the scenario can see if the order is already tracked.",
      "A router either updates the existing task or creates a new one named after the order and the customer.",
    ],
    hard: [],
    stack: ["Make", "Shopify", "ClickUp"],
    flow: ["Webhook", "Get Shopify order", "Find existing task", "Update or create"],
    workflows: [w("shopify-chargeback", "Shopify chargeback to ClickUp", "Instant scenario that creates or updates the chargeback task.", "Make")],
  },
  {
    slug: "shopify-bookkeeping",
    title: "Daily bookkeeping for a Shopify store",
    summary: "A scheduled run writes yesterday's ad spend, orders, chargebacks and refunds into a monthly Google Sheet.",
    problem: "Daily numbers came from three places: Google Ads, Shopify and the chargeback records. Putting them in one sheet by hand every day does not scale.",
    built: [
      "A daily run that works out yesterday in New York time.",
      "Google Ads cost for the day is pulled and totalled.",
      "Shopify is queried through the GraphQL Admin API, with a second request for chargebacks and refunds.",
      "Code steps calculate the fees and the profit formulas.",
      "A row is added to the sheet for the month, then updated with the profit formulas. A run takes about 7 seconds.",
    ],
    hard: [],
    stack: ["Make", "Shopify", "Google Ads", "Google Sheets"],
    flow: ["Daily schedule", "Google Ads spend", "Shopify orders", "Chargebacks and refunds", "Monthly sheet"],
    workflows: [w("shopify-bookkeeping", "Shopify bookkeeping scenario", "Daily scenario that fills the monthly bookkeeping sheet.", "Make")],
  },
  {
    slug: "fb-lead-airtable",
    title: "Facebook leads to Airtable and WhatsApp",
    summary: "A new lead from a Facebook form is saved, the owner is told, and the lead gets a WhatsApp message.",
    problem: "Leads from Facebook Lead Ads need to reach the sales side straight away, in a tidy format.",
    built: [
      "A Facebook Lead Ads trigger starts the flow.",
      "A code step tidies the fields: name, email, phone number with a country prefix, Instagram handle and lead ID.",
      "An Airtable record is created for the lead.",
      "The owner is notified on WhatsApp, and the lead gets a WhatsApp message through a self-hosted sender.",
    ],
    hard: [],
    stack: ["n8n", "Facebook Lead Ads", "Airtable", "WhatsApp"],
    flow: ["Facebook lead", "Clean fields", "Airtable record", "WhatsApp"],
    workflows: [w("fb-lead-airtable", "Facebook lead to Airtable", "Saves each new lead and sends the WhatsApp messages.")],
  },
  {
    slug: "pharmacy-product-search",
    title: "Pharmacy product search chatbot",
    summary: "A customer describes symptoms and the bot finds matching products.",
    problem: "A pharmacy in Zambia wanted customers to find products on WhatsApp. Exact-name search only works if you already know what to ask for.",
    built: [
      "A WhatsApp chatbot connected to the pharmacy's Odoo product database.",
      "An upgrade from exact-name search to symptom-based semantic search with GPT-4.1-mini.",
      "An AI agent that calls a tag-based product search sub-workflow.",
      "A product tagging guide so non-technical staff can keep the catalogue searchable.",
    ],
    hard: [
      "Passing structured fields correctly between the parent workflow and sub-workflows.",
      "Recommendations got more accurate once Odoo tag IDs were resolved to names before the AI ranked results.",
    ],
    stack: ["n8n", "WhatsApp", "Odoo", "GPT-4.1-mini"],
    flow: ["Customer describes symptoms", "AI agent", "Tag search in Odoo", "Ranked products"],
    workflows: [],
  },
  {
    slug: "shopify-airtable-sync",
    title: "Shopify to Airtable customer sync",
    summary: "A large customer list kept in step between a store and a database.",
    problem: "A retail client needed Shopify customers mirrored in Airtable. The first approach failed on pagination, rate limits and execution time limits.",
    built: [
      "A sync reworked to use three API calls per customer.",
      "Error handling on each node so one bad record does not stop the run.",
    ],
    hard: ["Pagination failures, Shopify rate limiting and n8n Cloud execution time limits."],
    stack: ["n8n", "Shopify", "Airtable"],
    flow: ["Shopify customers", "Paginate", "Sync to Airtable"],
    workflows: [],
  },
  {
    slug: "hubspot-contact-export",
    title: "HubSpot contact export",
    summary: "40,000 contacts moved into Google Sheets without hitting quotas.",
    problem: "Exporting a 40,000-contact HubSpot list to Google Sheets ran into pagination problems and Google API quota limits.",
    built: [
      "Paginated reads from HubSpot.",
      "Batched HTTP Request writes to the Sheets API instead of the native node writing row by row.",
    ],
    hard: ["Quota exhaustion from row-by-row calls, solved by batching."],
    stack: ["n8n", "HubSpot", "Google Sheets"],
    flow: ["HubSpot contacts", "Paginate", "Batch write", "Google Sheets"],
    workflows: [],
  },
  {
    slug: "membership-tier-sync",
    title: "Membership tier sync",
    summary: "Members get the right community access when their plan changes.",
    problem: "Billing in Outseta and community access in Circle.so need to agree. A tier change in one has to show up in the other.",
    built: [
      "A workflow that fetches Circle access groups dynamically instead of hard-coding them.",
      "Member tags as the source of truth for which groups a member belongs to.",
      "Gmail notifications whenever a member's tier changes.",
    ],
    hard: [],
    stack: ["n8n", "Outseta", "Circle.so", "Gmail"],
    flow: ["Outseta tier change", "Fetch Circle groups", "Sync membership", "Email notice"],
    workflows: [],
  },
]