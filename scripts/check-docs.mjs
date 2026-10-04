import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = new URL('../docs/', import.meta.url)
const docsPath = fileURLToPath(root)
const required = ['index.md','quickstart.md','public-data.md','guides/auth.md','guides/saves.md','guides/limits.md','guides/errors.md','api/index.md','api/profiles.md','api/profile-images.md','api/rankings.md','api/decks.md','api/circles.md','api/gacha.md','api/announcements.md']
for (const file of required) await readFile(new URL(file, root))
const locales = ['en','zh-tw','ja','ko']
const localeSignals = { en: /\b(Required|Region|Notes|Endpoints)\b/g, 'zh-tw': /[\u3400-\u9fff]/g, ja: /[\u3040-\u30ff]/g, ko: /[\uac00-\ud7af]/g }
for (const locale of locales) {
  await readFile(new URL(`${locale}/index.md`, root))
  for (const file of ['profiles','profile-images','rankings','decks','circles','gacha','announcements']) {
    const body = await readFile(new URL(`${locale}/api/${file}.md`, root), 'utf8')
    for (const marker of ['Scope:', 'GET /api/open/v1/moenotes/{region}', 'curl --fail-with-body']) if (!body.includes(marker)) throw new Error(`${locale}/${file} missing ${marker}`)
    if ((body.match(localeSignals[locale]) || []).length < 5) throw new Error(`${locale}/${file} lacks substantive localized text`)
    if (!body.includes('401') || !body.includes('403') || !body.includes('Authorization')) throw new Error(`${locale}/${file} missing error/auth detail`)
  }
}
const files = []
async function walk(dir) { for (const name of await readdir(dir, {withFileTypes:true})) { const p=join(dir,name.name); if(name.isDirectory() && !name.name.startsWith('.')) await walk(p); else if(name.name.endsWith('.md')) files.push(p) } }
await walk(docsPath)
const text = await Promise.all(files.map(f=>readFile(f,'utf8')))
const joined = text.join('\n')
for (const forbidden of ['sk_live_real_secret', 'YOUR_SECRET', 'example.com']) if (joined.includes(forbidden)) throw new Error(`forbidden placeholder/content: ${forbidden}`)
for (const expected of ['passport.bdon.moe','api.bdon.moe','100','10000','saves:read']) if (!joined.includes(expected)) throw new Error(`missing contract term: ${expected}`)
console.log(`checked ${files.length} markdown files; required locales and contract terms present`)
