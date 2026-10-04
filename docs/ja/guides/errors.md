# エラー処理 {#errorsTitle}

API レスポンスを処理する際は、まず HTTP ステータスコードを確認した上でレスポンス詳細を確認することを推奨します。400 はリクエストパラメータの修正、401 はキーの有効性やアプリ状態の確認、403 は必要なスコープが付与されているかの確認、404 は対象リソースの存在やユーザー認可の確認を行ってください。413 はペイロードのサイズ上限超過、429 はレート・同時実行制限超過（Retry-After ヘッダーに従って退避）、503 はサービスの一時的な利用不可を示します。レスポンス形式について、ゲーム API は {error:{kind}}、セーブおよび管理 API は {error:string} となります。認証エラーを無暗に再試行することは避け、障害調査用にレスポンスヘッダーの X-Request-Id をログに記録してください。

| HTTP | error.kind / error |
|---|---|
| 400 | invalid_request |
| 401 | invalid_api_key |
| 403 | insufficient_scope |
| 404 | not_found |
| 413 | too_large |
| 429 | rate_limited / daily_quota_exceeded / concurrency_limited |
| 503 | open_platform_disabled / admission_unavailable |

## 元のセーブをダウンロード {#saves}

セーブデータ API の呼び出し時、キーに saves:read スコープが付与されていない場合は 403 insufficient_scope が返されます。ユーザーの明示的な許可が無い場合やセーブデータが存在しない場合、データの所有権が無効化した場合は 403 ではなく 404 not_found が返されます。アーカイブのファイルサイズには制限があり、gzip 形式で最大 8 MiB、展開後の JSON で最大 32 MiB までとなります（超過時は 413 エラー）。ユーザーが許可を取り消した場合、以降の新規リクエストのみがブロックされます。すでに受付を通過し転送中のダウンロードは完了することがあり、ダウンロード済みのデータは回収できません。

## 公開イベント・楽曲ランキング {#public-data}

ETag と If-None-Match による 304 を利用し、Cache-Control に従います。X-Fetched-At は実際の収集時刻で、キャッシュヒットでは変わりません。X-Stale: 1 は古い結果、X-Refreshing: 1 は更新待機中または実行中です。503 pending/upstream では Retry-After と指数バックオフに従い、高頻度の固定再試行を避けてください。

## エラーと制限 {#limits}

公開 profile を呼び出す際、region は tw/jp/en/kr を指定し、ID は10進数の文字列で渡します。リクエストヘッダーには Authorization: Bearer &lt;Secret&gt; を指定し、clientID ヘッダーは不要です。セーブデータ API を利用する場合、saveServer は intl/jp を指定し、accountID はアップロードしたセーブの最上位にある _profileId を指定します（saves:read スコープおよび対象セーブに対するユーザーの明示的な許可が必要です）。公開 API のレート制限は Passport ユーザー単位（名下の全アプリ・キー間で共有）で管理され、既定値は毎分 100 回、毎日 10000 回、同時実行数はユーザーごと 4 件、全体 32 件です（制限値はデプロイ設定により異なる場合があります）。503 はサービスまたは受付ゲートウェイが一時的に利用不可であることを示します。ゲーム API のエラー形式は {error:{kind}}、セーブおよび管理 API は {error:string} です。

