import { readFileSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const { routes } = JSON.parse(readFileSync(new URL('scripts/api-contract.json', root), 'utf8'));
const languages = [['', '必填', '可选'], ['zh-tw/', '必填', '選填'], ['en/', 'Required', 'Optional'], ['ja/', '必須', '任意'], ['ko/', '필수', '선택']];
let checks = 0;
for (const [prefix, required, optional] of languages) {
  for (const route of routes) {
    const slug = route.scope.split(':')[1];
    const path = `docs/${prefix}api/${slug}.md`;
    const text = readFileSync(new URL(path, root), 'utf8');
    const marker = `### \`${route.path}\``;
    const section = text.split(marker)[1]?.split('\n### ')[0]?.split('\n## ')[0];
    if (!section || !section.includes(`GET /api/open/v1/moenotes/{region}${route.path}`)) throw Error(`${path}: missing route ${route.path}`);
    for (const parameter of route.parameters) {
      const row = `| \`${parameter.name}\` | \`${parameter.in}\` | ${parameter.required ? required : optional} |`;
      if (!section.includes(row)) throw Error(`${path}: wrong parameter contract ${route.path}: ${row}`);
      checks++;
    }
    if (!text.includes('https://passport.bdon.moe/api/open/v1/moenotes/$REGION')) throw Error(`${path}: missing absolute API example`);
  }
}
console.log(`Verified ${routes.length} API routes across 5 languages, ${checks} parameter contracts.`);
