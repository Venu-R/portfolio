import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || ''

function Ext({ href, children, className = '' }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[180px_1fr]">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  )
}

function Project({ p }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-slate-200/70">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
        <span className="text-sm text-muted">{p.subtitle}</span>
      </div>
      <p className="mt-3 max-w-prose leading-relaxed text-muted">{p.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-medium ring-1 ring-line">{t}</li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
        {p.live && (
          <Ext href={p.live} className="rounded-full bg-accent px-4 py-2 text-white hover:bg-[#1b3a97]">Live demo</Ext>
        )}
        <Ext href={p.github} className="rounded-full px-4 py-2 ring-1 ring-line hover:bg-paper">View on GitHub</Ext>
      </div>
    </article>
  )
}

export default function App() {
  const [d, setD] = useState(null)
  const [err, setErr] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/content`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => { setD(data); document.title = `${data.name} | Portfolio` })
      .catch(() => setErr(true))
  }, [])

  if (err) return <p className="p-10 text-muted">Could not load portfolio content. Check that the server is running and content.json is valid.</p>
  if (!d) return <p className="p-10 text-muted">Loading...</p>

  const hasExp = d.experience?.length > 0
  const nav = [['About', 'about'], ['Skills', 'skills'], hasExp && ['Experience', 'experience'], ['Projects', 'projects'], ['Education', 'education'], ['Contact', 'contact']].filter(Boolean)

  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#home" className="font-bold tracking-tight">{d.name}</a>
          <ul className="hidden gap-7 text-sm font-medium text-muted md:flex">
            {nav.map(([label, id]) => (
              <li key={id}><a href={`#${id}`} className="hover:text-ink">{label}</a></li>
            ))}
          </ul>
          <a href={`${API}/api/resume`} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-black">Resume</a>
        </div>
      </nav>

      <header id="home" className="mx-auto max-w-5xl px-6 pb-24 pt-24 md:pt-32">
        <div className="hero-in">
          <p className="text-muted">{d.role} · {d.location}</p>
          <h1 className="mt-4 text-6xl font-extrabold tracking-tighter md:text-8xl">{d.name}</h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">{d.tagline}</p>
          <div className="mt-9 flex flex-wrap gap-3 text-sm font-semibold">
            <a href="#projects" className="rounded-full bg-accent px-6 py-3 text-white hover:bg-[#1b3a97]">View projects</a>
            <a href={`${API}/api/resume`} className="rounded-full px-6 py-3 ring-1 ring-line hover:bg-white">Download resume</a>
            <Ext href={d.github} className="rounded-full px-6 py-3 ring-1 ring-line hover:bg-white">GitHub</Ext>
            <Ext href={d.linkedin} className="rounded-full px-6 py-3 ring-1 ring-line hover:bg-white">LinkedIn</Ext>
          </div>
        </div>
      </header>

      <main>
        <Section id="about" title="About">
          <div className="max-w-prose space-y-4 text-lg leading-relaxed text-muted">
            {d.about.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="space-y-6">
            {d.skills.map((s) => (
              <div key={s.group} className="grid gap-2 sm:grid-cols-[170px_1fr]">
                <dt className="font-semibold">{s.group}</dt>
                <dd className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-line">{i}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {hasExp && (
          <Section id="experience" title="Experience">
            <div className="space-y-8">
              {d.experience.map((x, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold">{x.role}, {x.company}</h3>
                  <p className="text-sm text-muted">{x.period}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                    {x.points?.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section id="projects" title="Projects">
          <div className="grid gap-6">
            {d.projects.map((p) => <Project key={p.title} p={p} />)}
          </div>
        </Section>

        <Section id="education" title="Education">
          {d.education.map((e) => (
            <div key={e.school}>
              <h3 className="text-lg font-bold">{e.school}</h3>
              <p className="text-muted">{e.degree} · {e.period}</p>
              {e.detail && <p className="mt-1 text-muted">{e.detail}</p>}
            </div>
          ))}
          {d.certifications?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold">Certifications</h3>
              <ul className="mt-2 space-y-1 text-muted">
                {d.certifications.map((c) => (
                  <li key={c.title}>{c.title}, {c.issuer} ({c.year})</li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        <Section id="contact" title="Contact">
          <p className="max-w-prose text-lg text-muted">Open to internships and collaboration. The quickest way to reach me is email.</p>
          <a href={`mailto:${d.email}`} className="mt-4 inline-block text-2xl font-bold tracking-tight text-accent hover:underline md:text-3xl">{d.email}</a>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Ext href={d.linkedin} className="rounded-full px-5 py-2.5 ring-1 ring-line hover:bg-white">LinkedIn</Ext>
            <Ext href={d.github} className="rounded-full px-5 py-2.5 ring-1 ring-line hover:bg-white">GitHub</Ext>
            <a href={`${API}/api/resume`} className="rounded-full px-5 py-2.5 ring-1 ring-line hover:bg-white">Resume (PDF)</a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">© {new Date().getFullYear()} {d.name}</footer>
    </>
  )
}
