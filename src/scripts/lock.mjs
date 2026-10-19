// Encrypts every file in workflows-src/ with your access code and writes the result to src/locked/.
// Usage:  npm run lock -- "your access code"      then:  npm run build
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { randomBytes, pbkdf2Sync, createCipheriv } from 'node:crypto'
import { join } from 'node:path'

const code = process.argv[2]
if (!code || code.length < 8) {
  console.error('Usage: npm run lock -- "your access code"   (at least 8 characters, 12 or more is better)')
  process.exit(1)
}
const src = 'workflows-src'
const out = 'src/locked'
if (!existsSync(src)) {
  console.error(`Put your cleaned workflow JSON files in ${src}/ first.`)
  process.exit(1)
}
mkdirSync(out, { recursive: true })
for (const f of readdirSync(out)) if (f.endsWith('.json')) rmSync(join(out, f))

const files = readdirSync(src).filter(f => f.endsWith('.json'))
for (const f of files) {
  const plain = readFileSync(join(src, f), 'utf8')
  JSON.parse(plain) // stop early if a file is not valid JSON
  const salt = randomBytes(16)
  const iv = randomBytes(12)
  const key = pbkdf2Sync(code, salt, 200000, 32, 'sha256')
  const c = createCipheriv('aes-256-gcm', key, iv)
  const data = Buffer.concat([c.update(plain, 'utf8'), c.final(), c.getAuthTag()])
  writeFileSync(join(out, f), JSON.stringify({ v: 1, salt: salt.toString('base64'), iv: iv.toString('base64'), data: data.toString('base64') }))
}
console.log(`Locked ${files.length} workflow file(s) into ${out}/. Now run: npm run build`)