import { useEffect, useRef, useState } from 'react'

const API = import.meta.env.VITE_API_URL || ''

/* ---------- small helpers ---------- */
function Icon({ name, className = 'h-4 w-4' }) {
  const p = {
    github: <path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />,
    linkedin: <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />,
    arrow: <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" />,
    down: <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />,
    copy: <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 9h10v10H9zM5 15V5h10" />,
    check: <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7.5" />,
  }[name]
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{p}</svg>
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} style={{ '--d': `${delay}ms` }} className={`reveal ${className}`}>{children}</div>
}

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* ---------- buttons ---------- */
const base = 'group inline-flex items-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5'
const btn = {
  primary: `${base} btn-shine px-6 py-3 text-white bg-gradient-to-b from-[#2f56d6] to-[#1f3fa3] shadow-[0_10px_24px_-10px_rgba(35,71,181,.7),inset_0_1px_0_rgba(255,255,255,.25)] hover:shadow-[0_16px_30px_-10px_rgba(35,71,181,.75),inset_0_1px_0_rgba(255,255,255,.25)]`,
  dark: `${base} btn-shine px-5 py-2.5 text-white bg-gradient-to-b from-[#232834] to-[#11141b] shadow-[0_10px_22px_-10px_rgba(17,20,27,.7),inset_0_1px_0_rgba(255,255,255,.12)] hover:shadow-[0_16px_28px_-10px_rgba(17,20,27,.7),inset_0_1px_0_rgba(255,255,255,.12)]`,
  ghost: `${base} bg-white/80 px-5 py-2.5 text-ink ring-1 ring-line backdrop-blur hover:bg-white hover:ring-ink/30 hover:shadow-[0_12px_24px_-14px_rgba(17,20,27,.35)]`,
}

function Ext({ href, className, children }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>
}

/* ---------- layout ---------- */
function Section({ id, title, children }) {
  const ref = useReveal()
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[220px_1fr]">
        <div ref={ref} className="reveal self-start lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <span className="h-line" />
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

function SkillRow({ s }) {
  return (
    <div className="skill-row group grid gap-3 border-t border-line py-7 sm:grid-cols-[170px_1fr] sm:gap-8">
      <h3 className="font-semibold transition-colors duration-300 group-hover:text-accent">{s.group}</h3>
      <ul className="flex flex-wrap gap-x-7 gap-y-2.5 text-lg text-muted">
        {s.items.map((i) => (
          <li key={i} className="cursor-default transition-colors duration-200 hover:text-ink">{i}</li>
        ))}
      </ul>
    </div>
  )
}

function Project({ p }) {
  return (
    <article onMouseMove={spot} className="spot rounded-3xl border border-line bg-white p-7 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{p.title}</h3>
          <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
        </div>
      </div>

      <p className="mt-5 max-w-prose leading-relaxed text-muted">{p.description}</p>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-xs font-semibold text-muted">Tech stack</p>
        <ul className="mt-2.5 flex flex-wrap gap-y-1.5 text-sm font-medium">
          {p.tags.map((t, i) => (
            <li key={t} className={`pr-3.5 ${i ? 'border-l border-line pl-3.5' : ''}`}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {p.live && (
          <Ext href={p.live} className={btn.dark}>
            Live demo
            <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Ext>
        )}
        <Ext href={p.github} className={btn.ghost}>
          <Icon name="github" className="h-4 w-4" />
          GitHub
          <Icon name="arrow" className="h-3.5 w-3.5 opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </Ext>
      </div>
    </article>
  )
}

/* ---------- app ---------- */
export default function App() {
  const [d, setD] = useState(null)
  const [err, setErr] = useState(false)
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)
  const [menu, setMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/content`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setD(data))
      .catch(() => setErr(true))
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!d) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('header[id], section[id]').forEach((el) => io.observe(el))
    const atEnd = () => {
      const h = document.documentElement
      if (h.scrollTop + h.clientHeight >= h.scrollHeight - 4) setActive('contact')
    }
    window.addEventListener('scroll', atEnd, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', atEnd) }
  }, [d])

  if (err) return <p className="p-10 text-muted">Could not load portfolio content. Check that the server is running and content.json is valid.</p>
  if (!d) return <p className="p-10 text-muted">Loading...</p>

  const hasExp = d.experience?.length > 0
  const nav = [['About', 'about'], ['Skills', 'skills'], hasExp && ['Experience', 'experience'], ['Projects', 'projects'], ['Education', 'education'], ['Contact', 'contact']].filter(Boolean)

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(d.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch {}
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-30 h-[2px] w-full origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />

      <nav className="sticky top-0 z-20 border-b border-line bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <a href="#home" className="font-bold tracking-tight">{d.name}</a>
          <ul className="hidden gap-1 text-sm font-medium md:flex">
            {nav.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`} className={`relative rounded-full px-3.5 py-1.5 transition-colors ${active === id ? 'bg-white text-ink ring-1 ring-line' : 'text-muted hover:text-ink'}`}>{label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href={`${API}/api/resume`} className={btn.dark}>
              <Icon name="down" className="h-4 w-4" /> Resume
            </a>
            <button onClick={() => setMenu(!menu)} aria-label="Menu" className="rounded-full p-2 ring-1 ring-line md:hidden">
              <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d={menu ? 'M6 6l12 12M18 6 6 18' : 'M4 8h16M4 16h16'} /></svg>
            </button>
          </div>
        </div>
        {menu && (
          <ul className="border-t border-line bg-paper/95 px-6 py-3 md:hidden">
            {nav.map(([label, id]) => (
              <li key={id}><a href={`#${id}`} onClick={() => setMenu(false)} className="block py-2.5 font-medium text-muted">{label}</a></li>
            ))}
          </ul>
        )}
      </nav>

      <header id="home" className="relative overflow-hidden">
        <div className="grid-fade absolute inset-0" />
        <div className="blob blob-a -left-20 top-10 h-72 w-72" />
        <div className="blob blob-b right-0 top-32 h-80 w-80" />
        <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-24 md:pt-36">
          <div className="hero-in">
            {d.availability && (
              <p className="inline-flex items-center gap-2.5 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium ring-1 ring-line backdrop-blur">
                <span className="ping relative h-2 w-2 rounded-full bg-emerald-500" />
                {d.availability}
              </p>
            )}
            <h1 className="mt-7 text-6xl font-extrabold tracking-tighter md:text-8xl">{d.name}</h1>
            <p className="mt-5 flex flex-col gap-1 text-lg font-medium sm:flex-row sm:items-center sm:gap-3">{d.role}<span className="hidden h-4 w-px bg-line sm:block" /><span className="text-muted">{d.location}</span></p>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-muted">{d.tagline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#projects" className={btn.primary}>
                View projects
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0-6-6m6 6 6-6" /></svg>
              </a>
              <Ext href={d.github} className={btn.ghost}><Icon name="github" /> GitHub</Ext>
              <Ext href={d.linkedin} className={btn.ghost}><Icon name="linkedin" /> LinkedIn</Ext>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Section id="about" title="About me">
          <Reveal>
            <div className="max-w-prose space-y-5 text-lg leading-relaxed text-muted">
              {d.about.map((t, i) => <p key={i}>{t}</p>)}
            </div>
          </Reveal>
        </Section>

        <Section id="skills" title="Technical skills">
          <div className="border-b border-line">
            {d.skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 80}><SkillRow s={s} /></Reveal>
            ))}
          </div>
        </Section>

        {hasExp && (
          <Section id="experience" title="Experience">
            <div className="space-y-8">
              {d.experience.map((x, i) => (
                <Reveal key={i}>
                  <h3 className="text-lg font-bold">{x.role}, {x.company}</h3>
                  <p className="text-sm text-muted">{x.period}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                    {x.points?.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        <Section id="projects" title="Projects">
          <div className="grid gap-7">
            {d.projects.map((p) => <Reveal key={p.title}><Project p={p} /></Reveal>)}
          </div>
        </Section>

        <Section id="education" title="Education">
          <Reveal>
            {d.education.map((e) => (
              <div key={e.school} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold">{e.school}</h3>
                <p className="mt-1 text-muted">{e.degree}</p>
                <p className="mt-3 text-sm text-muted">{e.period}{e.detail && <span className="ml-3 rounded-full bg-paper px-3 py-1 font-semibold text-ink ring-1 ring-line">{e.detail}</span>}</p>
              </div>
            ))}
            {d.certifications?.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold">Certifications</h3>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {d.certifications.map((c) => (
                    <li key={c.title} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                      <span className="font-medium">{c.title}</span>
                      <span className="text-sm text-muted">{c.issuer}, {c.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </Section>

        <Section id="contact" title="Get in touch">
          <Reveal>
            <p className="max-w-prose text-lg text-muted">I'm currently open to full-time roles, internships, and opportunities to collaborate. Feel free to reach out to me via email or LinkedIn.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href={`mailto:${d.email}`} className="u-link break-all pb-1 text-2xl font-bold tracking-tight text-accent md:text-3xl">{d.email}</a>
              <button onClick={copyEmail} className={`${btn.ghost} !py-2`}>
                <Icon name={copied ? 'check' : 'copy'} className="h-4 w-4" />
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Ext href={d.linkedin} className={btn.ghost}><Icon name="linkedin" /> LinkedIn</Ext>
              <Ext href={d.github} className={btn.ghost}><Icon name="github" /> GitHub</Ext>
              <a href={`${API}/api/resume`} className={btn.dark}><Icon name="down" /> Resume (PDF)</a>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">© {new Date().getFullYear()} {d.name}</footer>
    </>
  )
}
