# 错误处理 {#errorsTitle}

处理 API 响应时，建议先检查 HTTP 状态码，再读取响应体中的错误详情：400 说明请求参数有误请修正参数，401 请检查密钥有效性或应用状态，403 请检查是否缺少对应的 scope，404 请确认目标资源是否存在或是否已获授权，413 表示请求体超限，429 表示触发限流请按 Retry-After 标头退避重试，503 表示服务暂时不可用请稍后重试。响应格式方面，游戏 API 为 {error:{kind}}，存档与管理接口为 {error:string}。遇到凭据类错误请勿盲目重试；建议在日志中记录响应头中的 X-Request-Id 以便排障。

| HTTP | error.kind / error |
|---|---|
| 400 | invalid_request |
| 401 | invalid_api_key |
| 403 | insufficient_scope |
| 404 | not_found |
| 413 | too_large |
| 429 | rate_limited / daily_quota_exceeded / concurrency_limited |
| 503 | open_platform_disabled / admission_unavailable |

## 下载原始存档 {#saves}

调用存档接口时，若密钥缺少 saves:read 权限将返回 403 insufficient_scope；若未获得用户授权、存档不存在或所有权生命周期发生变化，将返回 404 not_found（而非 403）。文件上限规定：gzip 文件最大 8 MiB，解压后 JSON 最大 32 MiB，超出上限将返回 413 状态码。用户撤销授权只会拦截后续的新请求，已准入的下载仍可能正常传输完成，已下载的数据亦无法召回。

## 公开榜线与歌曲榜 {#public-data}

使用 ETag 与 If-None-Match 支持 304，并遵循 Cache-Control。X-Fetched-At 是实际采集时间，缓存命中不刷新它；X-Stale: 1 表示旧快照，X-Refreshing: 1 表示刷新已排队或进行中。503 pending/upstream 时遵守 Retry-After，指数退避；不要用固定高频重试绕过服务调度。

## 错误与限流 {#limits}

调用公开 profile 接口时，请求的 region 参数支持 tw/jp/en/kr，ID 统一采用十进制字符串。请求头需携带 Authorization: Bearer &lt;Secret&gt;，无需传入 clientID 请求头。若调用存档接口，saveServer 支持 intl/jp，accountID 对应已上传存档顶层的 _profileId，且必须拥有 saves:read 权限及用户对该特定存档的明确授权。公开 API 默认按 Passport 用户维度（跨所有应用与密钥共享）限制调用频次：每分钟最多 100 次、每日最多 10000 次，并发上限为单用户 4、全局 32（实际配置可根据部署进行调整）。遇到 503 状态码表示服务或准入网关当前不可用。游戏接口的错误返回格式为 {error:{kind}}，存档与管理接口返回格式为 {error:string}。

