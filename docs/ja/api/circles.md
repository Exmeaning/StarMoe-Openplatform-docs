# サークル

**Scope:** `moenotes:circles`

id でサークルを取得、または名前と条件で検索します。

## エンドポイント

以下は完全な API パスの一覧です。呼び出すエンドポイントに応じて必要なパラメータを指定してください。

### `/circle`

```http
GET /api/open/v1/moenotes/{region}/circle
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `circleId` | `query` | 必須 |

### `/circle/{circleId}`

```http
GET /api/open/v1/moenotes/{region}/circle/{circleId}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `circleId` | `path` | 必須 |

### `/circles/search`

```http
GET /api/open/v1/moenotes/{region}/circles/search
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `options.name` | `query` | 任意 |
| `options.memberRange` | `query` | 任意 |
| `options.joinRule` | `query` | 任意 |
| `options.playStyle` | `query` | 任意 |

### `/circles/search/{name}`

```http
GET /api/open/v1/moenotes/{region}/circles/search/{name}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `name` | `path` | 必須 |
| `options.memberRange` | `query` | 任意 |
| `options.joinRule` | `query` | 任意 |
| `options.playStyle` | `query` | 任意 |

## パラメータ

| パラメータ | 説明 |
| --- | --- |
| `circleId` | サークル ID。 |
| `name` | 検索対象のサークル名（パスパラメータ形式）。 |
| `options.name` | 検索対象のサークル名フィルタ（クエリパラメータ形式・任意）。 |
| `options.memberRange` | メンバー人数の範囲フィルタ（任意）。 |
| `options.joinRule` | 加入条件フィルタ（任意）。 |
| `options.playStyle` | プレイスタイル方針フィルタ（任意）。 |

## リージョンごとの違い

サークルデータは各リージョンで完全に独立して管理されており、サーバー間で共有されることはありません。検索結果やフィルタリング処理は、指定したリージョン内のサークル情報にのみ適用されます。

## 注意事項

検索フィルタは options. プレフィックスを付けたクエリパラメータとして指定します（例: ?options.name=…）。パス形式のエンドポイントではサークル名のみを渡します。名前照合はゲーム内の値との完全一致で行われ、あいまい検索はサポートされておらず、結果のキャッシュも行われません。

リクエストパラメータが不正な場合は 400 invalid_request、API キーが無効または未指定の場合は 401 invalid_api_key、キーに moenotes:circles スコープが付与されていない場合は 403 insufficient_scope、該当するサークルが存在しない場合は 404 not_found が返されます。

## 例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/circles/search?options.name=$QUERY" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
