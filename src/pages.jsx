import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SITE, PROFILE, projects, tools } from './data.js'
import Workflows from './Workflow.jsx'
import homeCover from './assets/hero-cover.jpg'
import workCover from './assets/cover-work.jpg'
import aboutCover from './assets/cover-about.jpg'
import contactCover from './assets/cover-contact.jpg'
import art1 from './assets/art-1.jpg'
import art2 from './assets/art-2.jpg'
import art3 from './assets/art-3.jpg'
import art4 from './assets/art-4.jpg'
import art5 from './assets/art-5.jpg'
import art6 from './assets/art-6.jpg'

const arts = [art1, art2, art3, art4, art5, art6]
// Drop your exported Figma image in src/assets as retro-device.png (or .jpg) and the Retro page shows it.
const retro = Object.values(import.meta.glob('./assets/retro-device.*', { eager: true, import: 'default' }))[0]

function Cover({ src, alt, pos, children }) {
  return <div className="cover in" style={{ '--pos': pos }}><img src={src} alt={alt} />{children}</div>
}
function T({ tag: Tag = 'span', s = 2, c, ls, className = '', style, children }) {
  return <Tag className={'t ' + className} style={{ fontSize: s + 'cqw', color: c, letterSpacing: ls, ...style }}>{children}</Tag>
}

function CV() {
  return (
    <section><div className="wrap cv">
      <div><h2>My CV</h2><p className="lead">My experience, skills and projects in one PDF. Read it in your browser or save a copy.</p></div>
      <div className="btns">
        <a className="btn main" href={SITE.cv} target="_blank" rel="noopener">View CV</a>
        <a className="btn" href={SITE.cv} download={SITE.cv}>Download CV</a>
      </div>
    </div></section>
  )
}

function Flow({ steps }) {
  return (
    <ol className="flow" aria-label="How the workflow runs">
      {steps.map((s, i) => (
        <li key={s} className={i === 0 ? 'first' : i === steps.length - 1 ? 'last' : ''}>{s}</li>
      ))}
    </ol>
  )
}

function Rows({ list }) {
  return (
    <div className="work">
      {list.map(p => (
        <Link key={p.slug} to={`/work/${p.slug}`} className="row">
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
          <small>{p.stack.join(', ')}</small>
        </Link>
      ))}
    </div>
  )
}

export function Home() {
  return (
    <>
      <div className="wrap">
        <div className="cover in">
          <img src={homeCover} alt="3D illustration of a person on a laptop surrounded by floating icons and a planet" />
          <span className="t c-tl">{SITE.name}</span>
          <span className="t c-tr">{SITE.location}, {SITE.country}</span>
          <span className="t c-small">n8n / Make.com / CRM / AI</span>
          <span className="t c-role">{SITE.role}</span>
          <h1 className="t c-title">n8n automation</h1>
          <span className="t c-label">Portfolio</span>
          <div className="t c-cta btns"><Link className="btn main" to="/work">See the work</Link><Link className="btn" to="/contact">Get in touch</Link></div>
          <span className="t c-bl">Automation / n8n</span>
        </div>
        <div className="cover-m">
          <h1>Automations that run the business<i className="dot o" /><i className="dot b" /></h1>
          <p className="lead">I'm {SITE.name}, a junior automation engineer in {SITE.location}. I build n8n and Make.com workflows that connect CRMs, Shopify, Notion and ClickUp, and add AI where it saves real work.</p>
          <div className="btns"><Link className="btn main" to="/work">See the work</Link><Link className="btn" to="/contact">Get in touch</Link></div>
        </div>
      </div>
      <section><div className="wrap">
        <h2>Recent projects</h2>
        <Rows list={projects.slice(0, 3)} />
        <p className="more"><Link to="/work">All {projects.length} projects</Link></p>
      </div></section>
      <CV />
      <section><div className="wrap">
        <h2>Tools I connect</h2>
        <div className="tools">{tools.map(t => <span key={t}>{t}</span>)}</div>
      </div></section>
    </>
  )
}

export function Work() {
  return (
    <>
      <div className="wrap">
        <Cover src={workCover} alt="Dark cover with a large gradient sphere" pos="75% 50%">
          <T s={2.1} ls=".05em" style={{ left: '6.4%', top: '9%' }}>{projects.length} projects</T>
          <T tag="h1" s={8.6} className="hd" style={{ left: '6.4%', top: '31%' }}>Selected work</T>
          <T s={3.2} ls=".08em" style={{ left: '6.4%', top: '51%' }}>Built for real clients</T>
          <T s={2.4} className="hd" style={{ left: '6.4%', bottom: '4.6%' }}>{SITE.name} / n8n</T>
        </Cover>
        <div className="cover-m"><h1 className="page">Selected work</h1><p className="lead">Automations I have built and kept running. Open one to see how it works.</p></div>
      </div>
      <section className="first-section"><div className="wrap"><Rows list={projects} /></div></section>
    </>
  )
}

export function Project() {
  const { slug } = useParams()
  const i = projects.findIndex(p => p.slug === slug)
  if (i < 0) return <NotFound />
  const p = projects[i]
  const next = projects[(i + 1) % projects.length]
  return (
    <section className="first-section"><div className="wrap">
      <Link to="/work" className="back">Back to work</Link>
      <div className="phead">
        <div><h1 className="page">{p.title}</h1><p className="lead">{p.summary}</p></div>
        <img className="art" src={arts[i % arts.length]} alt="" />
      </div>
      <div className="narrow">
        <Flow steps={p.flow} />
        <Workflows items={p.workflows || []} />
        <h2>The problem</h2>
        <p>{p.problem}</p>
        <h2>What I built</h2>
        <ul>{p.built.map(b => <li key={b}>{b}</li>)}</ul>
        {p.hard.length > 0 && (<><h2>What took work</h2><ul>{p.hard.map(b => <li key={b}>{b}</li>)}</ul></>)}
        <h2>Tools</h2>
        <div className="tools">{p.stack.map(t => <span key={t}>{t}</span>)}</div>
        {p.repo && <p className="more"><a href={p.repo} target="_blank" rel="noopener">Workflow files on GitHub</a></p>}
        <p className="more">Next project: <Link to={`/work/${next.slug}`}>{next.title}</Link></p>
      </div>
    </div></section>
  )
}

export function About() {
  const c = PROFILE.certification
  return (
    <>
      <div className="wrap">
        <Cover src={aboutCover} alt="Frosted glass card with floating blue spheres" pos="78% 50%">
          <T s={1.6} c="#2b2d3a" ls=".12em" style={{ left: '9.5%', top: '16.1%' }}>n8n / Make.com / Python / AI</T>
          <T s={3.2} c="#3a3a45" className="hd" style={{ left: '12.5%', top: '28.6%' }}>Based in {SITE.location}</T>
          <T tag="h1" s={8.5} c="#0b0d1a" className="hd" style={{ left: '12.5%', top: '39.6%' }}>About me</T>
          <T s={1.7} c="#0b0d1a" style={{ left: '12.5%', top: '64.2%' }}>{SITE.role}</T>
          <Link to="/work" className="t pill">My work</Link>
        </Cover>
        <div className="cover-m"><h1 className="page">About me</h1></div>
      </div>
      <section className="first-section"><div className="wrap narrow">
        <p className="lead">{PROFILE.summary[0]}</p>
        <p>{PROFILE.summary[1]}</p>
        <h2>Experience</h2>
        {PROFILE.experience.map(j => (
          <div className="job" key={j.role}>
            <h3>{j.role}</h3>
            <p className="meta">{j.org}, {j.period}</p>
            <ul>{j.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
          </div>
        ))}
        <h2>Skills</h2>
        <dl className="skills">{PROFILE.skills.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        <h2>Education</h2>
        {PROFILE.education.map(e => (
          <div className="item" key={e.title}><h3>{e.title}</h3><p className="meta">{e.org}, {e.period}. {e.note}</p></div>
        ))}
        <h2>Certification</h2>
        <div className="item">
          <h3>{c.name}</h3>
          <p className="meta">{c.org}, {c.date}</p>
          <p>{c.note}</p>
          {c.url && <p><a href={c.url} target="_blank" rel="noopener">View certificate</a></p>}
        </div>
        <h2>Other projects</h2>
        {PROFILE.projects.map(p => (
          <div className="item" key={p.name}>
            <h3>{p.url ? <a href={p.url} target="_blank" rel="noopener">{p.name}</a> : p.name}</h3>
            <p>{p.desc}</p>
            <p className="meta">{p.tags}</p>
          </div>
        ))}
        <h2>Languages</h2>
        <div className="tools">{PROFILE.languages.map(l => <span key={l}>{l}</span>)}</div>
      </div></section>
      <CV />
    </>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const send = e => {
    e.preventDefault()
    const body = `${f.message}\n\n${f.name}\n${f.email}`
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Project enquiry from ' + f.name)}&body=${encodeURIComponent(body)}`
  }
  return (
    <>
      <div className="wrap">
        <Cover src={contactCover} alt="Soft green and blue gradient cover" pos="50% 50%">
          <T s={1.5} c="#555" style={{ left: '3.8%', top: '6.6%' }}>n8n / Make.com / CRM / AI</T>
          <T tag="h1" s={8} c="#2f2f2f" className="hd" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>Let's talk</T>
          <T s={2} c="#555" style={{ left: '50%', top: '63%', transform: 'translateX(-50%)' }}>Tell me what to automate</T>
          <T s={1.4} c="#666" style={{ left: '3.8%', top: '90.2%' }}>Email</T>
          <T s={2} c="#000" style={{ left: '3.8%', top: '93.2%' }}>{SITE.email}</T>
          <T s={1.4} c="#666" style={{ right: '3.8%', top: '90.2%' }}>Based in</T>
          <T s={2} c="#000" style={{ right: '3.8%', top: '93.2%' }}>{SITE.location}</T>
        </Cover>
        <div className="cover-m"><h1 className="page">Let's talk</h1></div>
      </div>
      <section className="first-section"><div className="wrap narrow">
        <p className="lead">Tell me what is slowing your team down. I will reply with how I would build it and a rough timeline.</p>
        <form onSubmit={send} className="form">
          <label>Your name<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
          <label>Your email<input required type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
          <label>What should be automated?<textarea required rows="5" value={f.message} onChange={set('message')} /></label>
          <button className="btn main" type="submit">Open email to send</button>
        </form>
        <p className="note">This opens your email app with the message filled in. You can also write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, or find me on <a href={SITE.linkedin} target="_blank" rel="noopener">LinkedIn</a> and <a href={SITE.github} target="_blank" rel="noopener">GitHub</a>.</p>
      </div></section>
    </>
  )
}

export function Retro() {
  return (
    <section className="first-section"><div className="wrap">
      {retro
        ? <img className="retro" src={retro} alt="Two clear retro monitors showing the word CLEAN" />
        : <p className="note">Add the exported design as src/assets/retro-device.png and it will show here.</p>}
    </div></section>
  )
}

export function NotFound() {
  return (
    <section className="first-section"><div className="wrap narrow">
      <h1 className="page">Page not found</h1>
      <p className="lead">That address doesn't exist here.</p>
      <Link className="btn main" to="/">Go to the home page</Link>
    </div></section>
  )
}