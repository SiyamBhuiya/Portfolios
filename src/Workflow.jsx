import { useState, useEffect } from 'react'
import { SITE } from './data.js'

const shots = import.meta.glob('./assets/shots/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
const locked = import.meta.glob('./locked/*.json', { eager: true, import: 'default' })

const pick = (files, id, ext) =>
  Object.entries(files)
    .filter(([k]) => new RegExp(`/${id}(-\\d+)?\\.(${ext})$`).test(k))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, v]) => v)

const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0))

// Throws if the code is wrong. Runs only in the browser, the plain JSON is never stored in the site files.
async function decrypt(blob, code) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64(blob.salt), iterations: 200000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['decrypt'])
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(blob.iv) }, key, b64(blob.data))
  return new TextDecoder().decode(plain)
}

const KEY = 'wf-access-code'
const saved = () => { try { return sessionStorage.getItem(KEY) || '' } catch { return '' } }
const remember = c => { try { sessionStorage.setItem(KEY, c) } catch {} }
const forget = () => { try { sessionStorage.removeItem(KEY) } catch {} }

const Lock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

export default function Workflows({ items }) {
  const [big, setBig] = useState(null)
  const [copied, setCopied] = useState('')
  const [open, setOpen] = useState(null)
  const [kind, setKind] = useState('')
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [unlocked, setUnlocked] = useState(!!saved())

  useEffect(() => {
    if (!big) return
    const onKey = e => e.key === 'Escape' && setBig(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [big])

  if (!items.length) return null

  const deliver = async (w, what, plain, make) => {
    if (what === 'copy') {
      try {
        await navigator.clipboard.writeText(plain)
        setCopied(w.id)
        setTimeout(() => setCopied(''), 2000)
      } catch {}
      return
    }
    const url = URL.createObjectURL(new Blob([plain], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = make ? `${w.id}.blueprint.json` : `${w.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const press = async (w, what, make) => {
    setErr('')
    const code = saved()
    if (code) {
      try {
        await deliver(w, what, await decrypt(pick(locked, w.id, 'json')[0], code), make)
        return
      } catch { forget(); setUnlocked(false) }
    }
    setOpen(w.id)
    setKind(what)
  }

  const submit = async (e, w, make) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    const code = text.trim()
    try {
      const plain = await decrypt(pick(locked, w.id, 'json')[0], code)
      remember(code)
      setUnlocked(true)
      setOpen(null)
      setText('')
      await deliver(w, kind, plain, make)
    } catch {
      setErr('That code did not work. Check it and try again.')
    }
    setBusy(false)
  }

  return (
    <>
      <h2>{items.length > 1 ? 'The workflows' : 'The workflow'}</h2>
      {items.map(w => {
        const images = pick(shots, w.id, 'png|jpe?g|webp')
        const hasFile = pick(locked, w.id, 'json').length > 0
        const make = w.tool === 'Make'
        return (
          <div className="wf" key={w.id}>
            <h3>{w.name} <span className="badge">{w.tool || 'n8n'}</span></h3>
            {w.note && <p className="wfnote">{w.note}</p>}
            {images.map((src, i) => (
              <button key={src} className="shot-btn" onClick={() => setBig(src)} aria-label={`Enlarge screenshot ${i + 1} of ${w.name}`}>
                <img className="shot" src={src} alt={`${w.name} in ${w.tool || 'n8n'}`} />
              </button>
            ))}
            {hasFile && (
              <>
                <div className="btns jsonbtns">
                  <button className="btn" onClick={() => press(w, 'download', make)}>
                    {!unlocked && <Lock />}{make ? 'Download Make blueprint' : 'Download workflow JSON'}
                  </button>
                  {!make && (
                    <button className="btn" onClick={() => press(w, 'copy', make)}>
                      {!unlocked && <Lock />}{copied === w.id ? 'Copied' : 'Copy JSON'}
                    </button>
                  )}
                </div>
                {open === w.id && (
                  <form className="unlock" onSubmit={e => submit(e, w, make)}>
                    <input type="password" autoFocus autoComplete="off" aria-label="Access code" placeholder="Access code"
                      value={text} onChange={e => setText(e.target.value)} />
                    <button className="btn main" type="submit" disabled={busy || !text.trim()}>{busy ? 'Checking' : 'Unlock'}</button>
                    <button className="btn" type="button" onClick={() => setOpen(null)}>Cancel</button>
                    {err && <p className="err" role="alert">{err}</p>}
                  </form>
                )}
                <p className="note">
                  {unlocked
                    ? (make
                      ? 'In Make, create a scenario, open the menu at the bottom and choose Import Blueprint, then connect your own accounts.'
                      : 'Paste the JSON onto an empty n8n canvas, then connect your own credentials.')
                    : <>The workflow files are locked. <a href={`mailto:${SITE.email}?subject=Workflow%20access%20code`}>Ask me for the access code.</a></>}
                </p>
              </>
            )}
          </div>
        )
      })}
      {big && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Workflow screenshot" onClick={() => setBig(null)}>
          <button className="lb-close btn main" onClick={() => setBig(null)}>Close</button>
          <img src={big} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}