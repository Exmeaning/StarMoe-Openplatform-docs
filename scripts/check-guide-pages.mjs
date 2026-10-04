import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
const root = new URL('../docs/', import.meta.url)
const evidence = JSON.parse(await readFile(new URL('./guide-migration-evidence.json', import.meta.url),'utf8'))
const pages=['index.md','api/index.md','quickstart.md','guides/auth.md','guides/limits.md','guides/errors.md','guides/saves.md','public-data.md','public-ranking-contract.md']
// Nine pages per locale, 45 in total. Check independently of scope-page migration.
const bodies = new Map()
const normalize = text=>text.replace(/```[\s\S]*?```/g,'').replace(/https?:\/\/[^\s)]+/g,'').replace(/\]\([^)]*\)/g,']').replace(/\s/g,'')
const requirements = {
 'index.md':['{#overview}','{#stepsTitle}','/open-platform','/account'],
 'quickstart.md':['{#stepsTitle}','{#securityTitle}','account?invite=CLIENT_ID','Authorization: Bearer $CLIENT_SECRET'],
 'guides/auth.md':['{#authentication}','{#scopesTitle}','{#regions}','{#securityTitle}','saves:read','tw','jp','en','kr'],
 'guides/limits.md':['100','10000','UTC','X-RateLimit-','X-Quota-','Retry-After','{#securityTitle}'],
 'guides/errors.md':['401','403','404','413','429','503','insufficient_scope','not_found','{#errorsTitle}'],
 'guides/saves.md':['{#archiveTitle}','saveServer','intl','jp','accountID','saves:read','404 not_found','Content-Encoding: gzip','application/gzip','8 MiB','32 MiB','account?invite=CLIENT_ID'],
 'api/index.md':['moenotes:profiles','moenotes:profile-images','moenotes:rankings','moenotes:decks','moenotes:circles','moenotes:gacha','moenotes:announcements','passport.bdon.moe/api/open/openapi.json'],
 'public-data.md':['api.bdon.moe/api/v1','X-Fetched-At','X-Stale','Retry-After','lastSeen','challengeMusicId','/revisions','/latest','CORS'],
 'public-ranking-contract.md':['X-Fetched-At','ETag','lastSeen','players ?? []','index + 1','allow-scripts','/bundle/','X-Revision']
}
let sourceChecks=0
for(const locale of evidence){
 const prefix=locale.prefix?locale.prefix+'/':''
 assert.deepEqual(new Set(locale.pages),new Set(pages),'Unexpected migration page set')
 for(const page of pages){
  const body=await readFile(new URL(prefix+page,root),'utf8')
  bodies.set(prefix+page,body)
  assert.ok(body.length>450,`${prefix}${page}: suspiciously short page`)
  assert.equal((body.match(/^# /gm)||[]).length,1,`${prefix}${page}: must have one H1`)
  for(const marker of requirements[page]) assert.ok(body.includes(marker),`${prefix}${page}: missing ${marker}`)
  assert.ok(!body.includes('passport.bdon.moe/open-platform'),`${prefix}${page}: wrong console host`)
  assert.ok(!body.includes('/zh-TW/'),`${prefix}${page}: wrong locale path`)
  assert.ok(!/(?:每分钟|每分鐘|毎分|분당\s*)30|(?:每日|毎日|일일\s*)1000(?!0)|\b30 requests\/minute|\b1000\/day/.test(body),`${prefix}${page}: obsolete quota`)
  if(locale.prefix==='en') {
   assert.ok(!/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/u.test(body),`${prefix}${page}: contains non-English copied prose`)
   assert.ok((body.match(/\b[A-Za-z]{3,}\b/g)||[]).length>=100,`${prefix}${page}: insufficient English prose`)
  }
  if(locale.prefix==='ja') assert.ok((body.match(/[\u3040-\u30ff]/gu)||[]).length>=80,`${prefix}${page}: missing Japanese prose`)
  if(locale.prefix==='ko'){
   assert.ok((body.match(/[\uac00-\ud7af]/gu)||[]).length>=100,`${prefix}${page}: missing Korean prose`)
   assert.ok(!/[\u3400-\u9fff]/u.test(body),`${prefix}${page}: Chinese prose leaked into Korean`)
  }
  if(locale.prefix==='zh-tw') assert.ok((body.match(/[體臺與個號國資料應請為時間開發權網頁傳後選擇檔]/gu)||[]).length>=20,`${prefix}${page}: missing Traditional Chinese prose`)
  if(locale.prefix) assert.notEqual(normalize(body),normalize(bodies.get(page)),`${prefix}${page}: exact Chinese-page copy`)
  for(const match of body.matchAll(/\]\((\/[^)]+)\)/g)){
   assert.ok(match[1].startsWith('/'+prefix),`${prefix}${page}: link escapes locale: ${match[1]}`)
  }
 }
 for(const retained of locale.retained){
  assert.ok(bodies.get(prefix+retained.page).includes(retained.text),`${prefix}${retained.page}: missing migrated field ${retained.field}`)
  sourceChecks++
 }
}
assert.equal(evidence.length,5)
assert.equal(bodies.size,45)
console.log(`PASS: ${bodies.size} non-scope pages / 5 locales; ${sourceChecks} exact original-or-translated prose checks; localized language, anchors, links and contracts checked.`)
