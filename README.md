# Portfolio

Personal portfolio website showcasing my projects, skills, education, and experience.

Built with **React, Tailwind CSS, Node.js, and Express.js**.

## Live Website

https://venu-r.onrender.com/

## Tech Stack

- React
- Tailwind CSS
- Node.js
- Express.js
- Vite

## Project Structure

```text
portfolio/
├── client/        # React + Tailwind frontend
├── server/        # Express backend
├── package.json   # Project scripts
└── README.md
```

The Express server serves the built React application and provides APIs for portfolio content and resume access. No database is required.

## Run Locally

```bash
npm run build
npm start
```

The application will run at:

```text
http://localhost:5000
```

For development:

```bash
npm run dev:server
npm run dev:client
```

The Vite development server runs on:

```text
http://localhost:5173
```

## Deployment

The project is deployed on **Render** using:

```text
Build Command: npm run build
Start Command: npm start
```

## Updating Content

Most portfolio information can be updated from:

```text
server/data/content.json
```

The resume can be replaced at:

```text
server/public/resume.pdf
```

After committing and pushing changes, the deployed application can be rebuilt automatically by the hosting platform.
