import { useEffect } from 'react'
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { SITE } from './data.js'
import { Home, Work, Project, About, Contact, Retro, NotFound } from './pages.jsx'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <header className="wrap top">
        <Link to="/" className="brand">{SITE.name}</Link>
        <nav aria-label="Main">
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/retro">Retro</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/retro" element={<Retro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="wrap foot">
        {SITE.fullName}, {SITE.role.toLowerCase()}. {SITE.location}, {SITE.country}.{' '}
        <a href={SITE.github} target="_blank" rel="noopener">GitHub</a>{' '}
        <a href={SITE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      </footer>
    </>
  )
}