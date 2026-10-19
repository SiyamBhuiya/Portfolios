# Siyam Bhuiyan, portfolio

Portfolio site for an automation engineer (n8n, Make.com, AI). Built with React and Vite.

Live site: https://siyambhuiya.github.io/YOUR-REPO-NAME/

## Run it locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The site deploys to GitHub Pages automatically when changes are pushed to `main`.

## Editing content

- Profile, projects and workflow list: `src/data.js`
- Pages: `src/pages.jsx`
- CV: save the PDF in `public/` with the name set in `src/data.js`
- Workflow screenshots: `src/assets/shots/<workflow-id>.png`

## Workflow files

Workflow JSON downloads are locked with an access code. The plain files are kept private
in `workflows-src/`, which is not committed. To lock them for the site:

```bash
npm run lock -- "your access code"
npm run build
```