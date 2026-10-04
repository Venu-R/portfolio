import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentFile = path.join(__dirname, 'data', 'content.json')
const resumeFile = path.join(__dirname, 'public', 'resume.pdf')
const dist = path.join(__dirname, '..', 'client', 'dist')

const app = express()
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())

// Content is read from disk on every request, so editing content.json updates the site without rebuilding the frontend.
app.get('/api/content', (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache')
    res.json(JSON.parse(fs.readFileSync(contentFile, 'utf8')))
  } catch (err) {
    console.error('content.json problem:', err.message)
    res.status(500).json({ error: 'content.json is missing or contains invalid JSON.' })
  }
})

app.get('/api/resume', (req, res) => {
  res.set('Cache-Control', 'no-cache')
  res.download(resumeFile, 'Venu_R_Resume.pdf')
})

app.get('/api/health', (req, res) => res.json({ ok: true }))

// index.html is served with the site's own address filled into the link-preview tags (WhatsApp, LinkedIn etc. need absolute URLs).
app.set('trust proxy', 1)
app.use(express.static(dist, { index: false }))
app.use((req, res) => {
  const site = `${req.protocol}://${req.get('host')}`
  const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8').replaceAll('%SITE_URL%', site)
  res.type('html').send(html)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Portfolio running on port ${port}`))
