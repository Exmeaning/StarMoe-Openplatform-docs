# 公開イベント・楽曲ランキング

イベント・楽曲・チャレンジランキングのデータ取得には、メインサイトでも利用されている公開サービス https://api.bdon.moe/api/v1 の利用を推奨します。本サービスは Passport 認証システムから独立しており、すべての公開エンドポイントは認証情報なし（clientSecret 不要）の GET リクエストを受け付けます。Passport の毎分 100 回 / 毎日 10000 回の制限も消費しません。なお、公開サービスでは固定の更新間隔やサードパーティ製ブラウザ向けの CORS 対応は保証されておらず、無制限のリクエストを許容するものでもありません。適切な頻度で呼び出し、ローカルキャッシュを活用してください。

本エンドポイントが返却するデータはサービス側で管理されているキャッシュスナップショットであり、ゲームサーバーへのリアルタイム直接接続ではありません。server パラメータはデプロイ設定に応じて tw、jp、en、kr をサポートし、未知のリージョンは 404 を返します。eventId や profileId などの 64 ビット整数 ID は10進数の文字列で渡す必要があります。お知らせ関連の一部上流フィールドを除き、タイムスタンプは原則として Unix ミリ秒で表されます。

`https://api.bdon.moe/api/v1`

## エンドポイント {#routes}

```http
GET /api/v1/{server}/music/{musicId}/ranking
GET /api/v1/{server}/events
GET /api/v1/{server}/events/current
GET /api/v1/{server}/events/{eventId}
GET /api/v1/{server}/events/{eventId}/latest
GET /api/v1/{server}/events/{eventId}/challenges
GET /api/v1/{server}/events/{eventId}/challenges/{challengeMusicId}/ranking
GET /api/v1/{server}/announcements
GET /api/v1/{server}/announcements/{id}?rev={lastUpdatedAt}
GET /api/v1/{server}/announcements/{id}/revisions
GET /api/v1/{server}/ranking/profile/{profileId}/card/{page}
```

```sh
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/current"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/latest"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/challenges/$CHALLENGE_MUSIC_ID/ranking"
```

## latest {#latest}

latest は統合スナップショットです。未取得の順位をゼロに置き換えないでください。parts はそれぞれ fetchedAt を持ち、同じ順位の複数行に dup が付く場合があります。stale は収集中断後の古い成功結果、frozen は集計中のスコア凍結を示します。X-Server-Time と updatedAt から経過時間を求め、nextUpdateAt にランダムな遅延を加えてポーリングします。

## music {#music}

楽曲ランキングは players のレスポンス順を保持し、rank フィールドを持ちません。表示順位は index + 1 とし、レスポンス順であることを示します。スコアで並べ直したり同順位規則を推測したりせず、常に100件とも仮定しません。空オブジェクトは players ?? [] として扱い、musicId は対象リージョンの楽曲カタログに属する必要があります。

## challenges {#challenges}

先にイベントの challenges カタログを読み、通常の musicId ではなく challengeMusicId を指定します。ranks・ページ分割・難易度パラメータはありません。ポイントランキングの disabled は楽曲ランキング停止を意味しません。曲ごとに状態と取得時刻が独立しています。X-Final-Quality: lastSeen は最後の成功観測であり、確認済みの公式最終順位ではありません。複数曲の結果は同時刻のスナップショットではありません。

## お知らせの履歴 {#announcements}

お知らせ一覧の category 絞り込みはクライアント側で行います。startAt、endAt、lastUpdatedAt は Unix 秒の10進数文字列で、ランキングのミリ秒とは異なります。rev は保存済み版を指定し、省略時は最新を返します。X-Revision は版、X-Listed: 0 は一覧からの撤去を示します。本文は未処理の完全な HTML 文書なので、allow-scripts と allow-same-origin を付けない sandbox iframe のみで描画し、メイン DOM へ挿入しないでください。

## 公開レスポンスとキャッシュ {#cache}

ETag と If-None-Match による 304 を利用し、Cache-Control に従います。X-Fetched-At は実際の収集時刻で、キャッシュヒットでは変わりません。X-Stale: 1 は古い結果、X-Refreshing: 1 は更新待機中または実行中です。503 pending/upstream では Retry-After と指数バックオフに従い、高頻度の固定再試行を避けてください。

[公開レスポンスとキャッシュ](/ja/public-ranking-contract)

