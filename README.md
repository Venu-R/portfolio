# Portfolio (React + Tailwind + Node/Express)

One Express service serves the API and the built React site. No database is needed.

## Updating the site after deployment
- Text, projects, skills, links, education: edit `server/data/content.json`.
- Resume: replace `server/public/resume.pdf` (keep the filename).
- Commit and push. The host redeploys automatically and the changes go live.
- Add experience later by filling `"experience"`, e.g. `{ "role": "Intern", "company": "X", "period": "Jun 2027 to Aug 2027", "points": ["..."] }`. The Experience section appears automatically once it has an entry.

## Run locally
```
npm run build
npm start          # http://localhost:5000
```
For live editing, run `npm run dev:server` and `npm run dev:client` in two terminals (client on http://localhost:5173).

## Deploy (Render, Railway or similar)
- Build command: `npm run build`
- Start command: `npm start`
- Node 18 or newer. No environment variables are required.
