# 卡池概率

**Scope:** `moenotes:gacha`

卡池及其 UP 卡牌的公开概率。

## 接口

以下为该功能支持的完整端点路径，调用时仅需填写对应端点所列出的参数。

### `/gacha/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/rates
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `gachaId` | `query` | 必填 |
| `productId` | `query` | 可选 |
| `selectedPickUp` | `query` | 可选 |

### `/gacha/{gachaId}/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `gachaId` | `path` | 必填 |
| `productId` | `query` | 可选 |
| `selectedPickUp` | `query` | 可选 |

### `/gacha/{gachaId}/rates/{selectedPickUp}`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates/{selectedPickUp}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `gachaId` | `path` | 必填 |
| `productId` | `query` | 可选 |
| `selectedPickUp` | `path` | 必填 |

## 参数

| 参数 | 说明 |
| --- | --- |
| `gachaId` | 必填，卡池 id，不存在“省略即当前 UP”的行为。 |
| `selectedPickUp` | 卡池精选索引。查询形式可省略；路径形式必填。 |
| `productId` | 可选，用于限定卡池概率表的商品 id。 |

## 地区差异

卡池按区服排期开放，各服活动排期与 UP 内容均不相同，调用时传入的 gachaId 必须与目标区服一致。抽卡概率与 UP 卡牌配置同样因区服而异。

## 注意事项

调用时请务必传入明确的 gachaId；接口不会默认回退到当前正在开放的卡池。

若请求参数缺失或未知将返回 400 invalid_request；密钥无效返回 401；缺少 moenotes:gacha 权限返回 403；目标卡池不存在返回 404。

## 示例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/gacha/rates?gachaId=$GACHA_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
