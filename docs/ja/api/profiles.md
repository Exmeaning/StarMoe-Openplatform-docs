# プロフィールとお気に入り

**Scope:** `moenotes:profiles`

1人の公開プロフィール、複数プロフィールの一括取得、プレイヤーのお気に入り一覧を取得します。

## エンドポイント

以下は完全な API パスの一覧です。呼び出すエンドポイントに応じて必要なパラメータを指定してください。

### `/player/{playerId}/favorites`

```http
GET /api/open/v1/moenotes/{region}/player/{playerId}/favorites
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `playerId` | `path` | 必須 |

### `/profile`

```http
GET /api/open/v1/moenotes/{region}/profile
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `playerProfileId` | `query` | 必須 |

### `/profile/favorites`

```http
GET /api/open/v1/moenotes/{region}/profile/favorites
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `playerId` | `query` | 必須 |

### `/profile/{profileId}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `profileId` | `path` | 必須 |

### `/profiles`

```http
GET /api/open/v1/moenotes/{region}/profiles
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `accountIds` | `query` | 必須 |

### `/profiles/{accountIds}`

```http
GET /api/open/v1/moenotes/{region}/profiles/{accountIds}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `accountIds` | `path` | 必須 |

## パラメータ

| パラメータ | 説明 |
| --- | --- |
| `profileId` | 公開 profile ID。日本サーバー以外は 2、3 または 4 で始まる 11 桁、日本サーバーは正の int64 です。常に 10 進数の文字列として渡してください。 |
| `playerProfileId` | 単一プロフィール取得用の profile ID（クエリパラメータ形式）。playerId と混用することはできません。 |
| `accountIds` | 一括取得対象のアカウント ID（カンマ区切りで最大 100 件まで）。 |
| `playerId` | お気に入り一覧を取得する対象のアカウント ID。profileId と混用することはできません。 |

## リージョンごとの違い

4 つのリージョンすべてで利用可能ですが、profileId の形式規則がリージョンによって異なります。jp は正の int64、tw/en/kr は 11 桁の数字（先頭がそれぞれ 2、3、4）です。同一のアカウントであってもリージョンごとに割り当てられる ID は異なり、お気に入りデータもリージョンごとに独立して管理されます。

## 注意事項

profileId、playerId、accountId は互いに異なる識別子であり、相互に置き換えて使用することはできません。なお、パスパラメータ形式とクエリパラメータ形式のエンドポイントは同じデータを返します。

リクエストパラメータの不足・不正なフォーマット・未定義パラメータの指定時は 400 invalid_request、API キーが無効または未指定の場合は 401 invalid_api_key、キーに moenotes:profiles スコープが付与されていない場合は 403 insufficient_scope、対象のプレイヤーが存在しないかプロフィールが非公開の場合は 404 not_found が返されます。

## 例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
