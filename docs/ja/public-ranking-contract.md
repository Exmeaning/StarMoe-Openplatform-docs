# 公開レスポンスとキャッシュ

本 API で返却されるデータは、ゲームサーバーへのリアルタイム直接接続ではなく、事前にキャッシュ・集計されたスナップショットです。server は対象リージョンに応じて tw、jp、en、kr のいずれかを指定し、存在しない値の場合は 404 が返されます。eventId や profileId などの int64 ID は精度落ちを防ぐため 10 進数の文字列として扱ってください。お知らせ機能の一部の上流フィールドを除き、時刻は原則として Unix エポックからのミリ秒単位で表現されます。

## latest {#latest}

latest は統合スナップショットです。未取得の順位をゼロに置き換えないでください。parts はそれぞれ fetchedAt を持ち、同じ順位の複数行に dup が付く場合があります。stale は収集中断後の古い成功結果、frozen は集計中のスコア凍結を示します。X-Server-Time と updatedAt から経過時間を求め、nextUpdateAt にランダムな遅延を加えてポーリングします。

## music / challenges {#rankings}

楽曲ランキングは players のレスポンス順を保持し、rank フィールドを持ちません。表示順位は index + 1 とし、レスポンス順であることを示します。スコアで並べ直したり同順位規則を推測したりせず、常に100件とも仮定しません。空オブジェクトは players ?? [] として扱い、musicId は対象リージョンの楽曲カタログに属する必要があります。

先にイベントの challenges カタログを読み、通常の musicId ではなく challengeMusicId を指定します。ranks・ページ分割・難易度パラメータはありません。ポイントランキングの disabled は楽曲ランキング停止を意味しません。曲ごとに状態と取得時刻が独立しています。X-Final-Quality: lastSeen は最後の成功観測であり、確認済みの公式最終順位ではありません。複数曲の結果は同時刻のスナップショットではありません。

## ETag / Retry-After {#cache}

ETag と If-None-Match による 304 を利用し、Cache-Control に従います。X-Fetched-At は実際の収集時刻で、キャッシュヒットでは変わりません。X-Stale: 1 は古い結果、X-Refreshing: 1 は更新待機中または実行中です。503 pending/upstream では Retry-After と指数バックオフに従い、高頻度の固定再試行を避けてください。

## お知らせの履歴 {#announcements}

お知らせ一覧の category 絞り込みはクライアント側で行います。startAt、endAt、lastUpdatedAt は Unix 秒の10進数文字列で、ランキングのミリ秒とは異なります。rev は保存済み版を指定し、省略時は最新を返します。X-Revision は版、X-Listed: 0 は一覧からの撤去を示します。本文は未処理の完全な HTML 文書なので、allow-scripts と allow-same-origin を付けない sandbox iframe のみで描画し、メイン DOM へ挿入しないでください。

## tiers / bundle {#curves}

ボーダー推移エンドポイント（tiers）では、クエリパラメータとして tiers、res、from、to、since を受け付けます。集計解像度 res には auto/raw/10m/1h を指定でき、最も細かい raw 解像度の取得範囲は最大 6 時間です。タイムスタンプ t は基準時刻 base からのミリ秒差分を表します。データが未観測の区間を 0 で埋めるような処理は避けてください。また、アーカイブパッケージ /bundle/{server}/event/{eventId}/v{n}/ はバージョン管理された不変（immutable）の静的リソースとして提供されます。

```json
{"error":{"kind":"pending","message":"..."}}
```

ETag と If-None-Match による 304 を利用し、Cache-Control に従います。X-Fetched-At は実際の収集時刻で、キャッシュヒットでは変わりません。X-Stale: 1 は古い結果、X-Refreshing: 1 は更新待機中または実行中です。503 pending/upstream では Retry-After と指数バックオフに従い、高頻度の固定再試行を避けてください。

[公開イベント・楽曲ランキング](/ja/public-data)

