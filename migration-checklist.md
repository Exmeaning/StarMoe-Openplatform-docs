# 文档迁移清单

| 旧来源 | 新位置 | 状态 |
|---|---|---|
| `moenotes/src/lib/account/open-platform-docs.ts` 路由与示例 | `docs/api/*.md`、`docs/guides/saves.md` | 已迁移 |
| `OpenPlatformDocsPage.astro` 导航、概览、步骤、错误 | `docs/index.md`、`docs/quickstart.md`、`docs/guides/*.md` | 已迁移 |
| 五语 `openPlatform.docs` 文案 | `docs/`、`docs/en/`、`docs/zh-tw/`、`docs/ja/`、`docs/ko/` | 已按原五语对象提取并核对（契约差异已修正） |
| `starmoe-api/docs/open-platform.md` 管理、配额、存档合同 | `docs/quickstart.md`、`docs/guides/*` | 已迁移 |
| `Moenotes-ranking/docs/api.md` 公开事件/快照/缓存头 | `docs/public-data.md`、`docs/public-ranking-contract.md` | 已迁移 |
| `Moenotes-ranking/docs/challenges.md` 挑战榜顺序与 lastSeen | `docs/public-ranking-contract.md` | 已迁移 |

## 删除前核对

- [x] passport.bdon.moe 与 api.bdon.moe 分开说明。
- [x] 限流写为 100/min、10000/day，说明按 Passport 用户共享。
- [x] saveServer `intl/jp` 与游戏 region 分开。
- [x] 鉴权 curl 使用环境变量占位 Secret。
- [x] 未写入真实密钥、未知正式文档域名或 runtime 跨仓库 import。
- [x] 文档域名固定为 `https://open-platform.bdon.moe`，部署根路径 `/`，无需环境变量。
- [x] 主站旧正文删除前完成五语迁移核对与旧锚点映射。旧路由保留为非索引兼容页。
- [x] 35 个 API 参考页按后端契约校验 31 条路由、295 项五语参数必填规则；包括旧页未单列的 arena band 路径变体。
- [x] 45 个非 scope 页面完成 175 项原文/翻译对照检查。
- [x] 主站文档链接固定到新文档域名；主站仍为 `https://bdon.moe`，应用管理与授权入口不变。

## 本地构建

`npm ci`、`npm run check`、`npm run build`；输出为 `docs/.vitepress/dist/`，上传整个目录到静态托管。`npm run preview` 可检查产物，`npm run dev` 用于修改 Markdown。

构建不读取其他仓库、不访问 API、不需要密钥。API 参考的独立契约快照位于 `scripts/api-contract.json`，更新后端契约时同步核对 Markdown；不再运行一次性迁移脚本。

## 旧锚点映射

| 原锚点 | 新页（加对应语言前缀） |
|---|---|
| overview | 首页 |
| stepsTitle | quickstart |
| scopesTitle | guides/auth |
| archiveTitle | guides/saves |
| securityTitle | guides/limits |
| errorsTitle | guides/errors |
| profiles / rankings / decks / circles / gacha / announcements | api/同名页 |
| profileImages | api/profile-images |

未识别锚点回到对应语言首页。五语前缀为根、zh-tw、en、ja、ko；其余主站语言回退英文。
