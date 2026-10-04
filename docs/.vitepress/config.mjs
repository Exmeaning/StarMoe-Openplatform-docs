import { defineConfig } from 'vitepress'

const siteUrl = 'https://open-platform.bdon.moe'
const base = '/'
const locales = {
  root: { label: '简体中文', lang: 'zh-CN', prefix: '', labels: 'zh' },
  en: { label: 'English', lang: 'en-US', prefix: '/en', labels: 'en' },
  'zh-tw': { label: '繁體中文', lang: 'zh-TW', prefix: '/zh-tw', labels: 'tw' },
  ja: { label: '日本語', lang: 'ja', prefix: '/ja', labels: 'ja' },
  ko: { label: '한국어', lang: 'ko', prefix: '/ko', labels: 'ko' }
}

const commonNav = (label, prefix = '') => [
  { text: label.docs, items: [
    { text: label.quickstart, link: `${prefix}/quickstart` },
    { text: label.api, link: `${prefix}/api/` },
    { text: label.public, link: `${prefix}/public-data` }
  ] }, 
  { text: label.console, link: `https://bdon.moe${prefix}/open-platform` }
]

const side = (label, prefix = '') => [
  { text: label.start, items: [{ text: label.quickstart, link: `${prefix}/quickstart` }, { text: label.auth, link: `${prefix}/guides/auth` }, { text: label.saves, link: `${prefix}/guides/saves` }] },
  { text: label.reference, items: [{ text: label.profiles, link: `${prefix}/api/profiles` }, { text: label.images, link: `${prefix}/api/profile-images` }, { text: label.rankings, link: `${prefix}/api/rankings` }, { text: label.decks, link: `${prefix}/api/decks` }, { text: label.circles, link: `${prefix}/api/circles` }, { text: label.gacha, link: `${prefix}/api/gacha` }, { text: label.announcements, link: `${prefix}/api/announcements` }] },
  { text: label.public, items: [{ text: label.publicData, link: `${prefix}/public-data` }, { text: label.rankingContract, link: `${prefix}/public-ranking-contract` }] },
  { text: label.operations, items: [{ text: label.limits, link: `${prefix}/guides/limits` }, { text: label.errors, link: `${prefix}/guides/errors` }] }
]

const labels = {
  zh: {docs:'开放平台文档',quickstart:'快速开始',api:'API 参考',public:'公开数据',console:'开发者控制台',start:'开始使用',auth:'认证、scope 与区服',saves:'存档授权与下载',reference:'API 参考',profiles:'玩家资料',images:'资料卡图片',rankings:'排行榜',decks:'编队',circles:'圈子',gacha:'卡池概率',announcements:'公告',publicData:'公开榜线接口',rankingContract:'榜线服务契约',operations:'运维与错误',limits:'限流与安全',errors:'错误处理'},
  en: {docs:'Open Platform Docs',quickstart:'Quickstart',api:'API reference',public:'Public data',console:'Developer console',start:'Get started',auth:'Auth, scopes and regions',saves:'Save authorization',reference:'API reference',profiles:'Profiles',images:'Profile images',rankings:'Rankings',decks:'Decks',circles:'Circles',gacha:'Gacha rates',announcements:'Announcements',publicData:'Public ranking APIs',rankingContract:'Ranking contract',operations:'Operations and errors',limits:'Limits and security',errors:'Error handling'},
  tw: {docs:'開放平台文件',quickstart:'快速開始',api:'API 參考',public:'公開資料',console:'開發者控制台',start:'開始使用',auth:'驗證、scope 與區服',saves:'存檔授權與下載',reference:'API 參考',profiles:'玩家資料',images:'資料卡圖片',rankings:'排行榜',decks:'編隊',circles:'圈子',gacha:'卡池機率',announcements:'公告',publicData:'公開榜線介面',rankingContract:'榜線服務契約',operations:'維運與錯誤',limits:'限流與安全',errors:'錯誤處理'},
  ja: {docs:'オープンプラットフォーム',quickstart:'クイックスタート',api:'API リファレンス',public:'公開データ',console:'開発者コンソール',start:'はじめに',auth:'認証・scope・リージョン',saves:'セーブの認可とダウンロード',reference:'API リファレンス',profiles:'プロフィール',images:'プロフィール画像',rankings:'ランキング',decks:'編成',circles:'サークル',gacha:'ガチャ確率',announcements:'お知らせ',publicData:'公開ランキング API',rankingContract:'ランキング契約',operations:'運用とエラー',limits:'制限とセキュリティ',errors:'エラー処理'},
  ko: {docs:'오픈 플랫폼 문서',quickstart:'빠른 시작',api:'API 레퍼런스',public:'공개 데이터',console:'개발자 콘솔',start:'시작하기',auth:'인증·scope·지역',saves:'세이브 승인과 다운로드',reference:'API 레퍼런스',profiles:'프로필',images:'프로필 이미지',rankings:'랭킹',decks:'덱',circles:'서클',gacha:'가챠 확률',announcements:'공지',publicData:'공개 랭킹 API',rankingContract:'랭킹 계약',operations:'운영과 오류',limits:'제한과 보안',errors:'오류 처리'}
}

export default defineConfig({
  title: 'MoeNotes Open Platform',
  description: 'Static developer documentation for the MoeNotes Open Platform',
  lang: 'zh-CN', base,
  ...(siteUrl ? { sitemap: { hostname: siteUrl } } : {}),
  transformHead({ pageData }) {
    if (!siteUrl || pageData.isNotFound) return [];
    const path = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '.html');
    return [['link', { rel: 'canonical', href: new URL(path, new URL(base, siteUrl)).href }]];
  },
  themeConfig: {
    siteTitle: 'MoeNotes', logo: undefined, search: { provider: 'local' }, outline: 'deep', socialLinks: [],
    nav: commonNav(labels.zh), sidebar: side(labels.zh),
  },
  locales: Object.fromEntries(Object.entries(locales).map(([key, meta]) => [key, {
    label: meta.label, lang: meta.lang,
    themeConfig: { nav: commonNav(labels[meta.labels], meta.prefix), sidebar: side(labels[meta.labels], meta.prefix) }
  }])),  
  head: [['meta', { name: 'color-scheme', content: 'light dark' }]],
  vite: { define: { __DOC_SITE_URL__: JSON.stringify(siteUrl || '') } }
})
