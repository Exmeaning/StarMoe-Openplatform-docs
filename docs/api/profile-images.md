# 资料卡图片

**Scope:** `moenotes:profile-images`

将玩家资料卡的某一页渲染为 PNG 图片。

## 接口

以下为该功能支持的完整端点路径，调用时仅需填写对应端点所列出的参数。

### `/profile/{profileId}/card/{page}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}/card/{page}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `profileId` | `path` | 必填 |
| `page` | `path` | 必填 |

## 参数

| 参数 | 说明 |
| --- | --- |
| `profileId` | 与资料接口相同的公开 profile id。 |
| `page` | 必填，从 1 开始的页码。响应为 PNG，上限 8MiB。 |

## 地区差异

接口在四个区服均可使用，卡面渲染效果取决于对应区服存储的玩家数据。玩家资料卡的总页数因区服与个人配置而异，某一区服中有效的页码在另一区服可能会超出实际范围。

## 注意事项

由于该接口必须携带包含密钥的 Authorization 请求头，因此无法在前端直接通过 &lt;img src&gt; 标签发起请求。建议由开发者服务端代为请求并中转图片二进制字节流，请求前请先确认目标页码在有效范围内。

密钥无效返回 401 invalid_api_key；缺少 moenotes:profile-images 权限返回 403 insufficient_scope；玩家资料不存在或请求页码超出范围返回 404 not_found；超出请求频次将返回 429。

## 示例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID/card/1" \
  -H "Authorization: Bearer $CLIENT_SECRET" \
  --output card.png
```
