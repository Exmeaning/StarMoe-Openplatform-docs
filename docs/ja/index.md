# オープンプラットフォーム API ガイド

Moenotes API で公開プロフィール、ランキング、ガチャ情報、許可された gzip セーブを取得します。

[開発者コンソール](https://bdon.moe/ja/open-platform) · [アカウントとセーブ許可](https://bdon.moe/ja/account)

## 概要 {#overview}

アプリ登録ですぐに clientID と Secret が発行されます。ボット、確認コード、審査は不要です。

本プラットフォームはゲーム運営会社の公式 API ではありません。アプリの作成や API キーの管理（発行・失効）はメインサイトのコンソールで行ってください（本静的ドキュメントサイトは閲覧専用です）。アプリの作成に手動審査は不要です。各アプリで保持できる有効なキーは最大2つまでです。キーのローテーションを行う際は、先にクライアント側を新しいキーへ切り替えて動作確認した上で、古いキーを明示的に失効させてください。

## 公開イベント・楽曲ランキング {#public-data}

イベント・楽曲・チャレンジランキングのデータ取得には、メインサイトでも利用されている公開サービス https://api.bdon.moe/api/v1 の利用を推奨します。本サービスは Passport 認証システムから独立しており、すべての公開エンドポイントは認証情報なし（clientSecret 不要）の GET リクエストを受け付けます。Passport の毎分 100 回 / 毎日 10000 回の制限も消費しません。なお、公開サービスでは固定の更新間隔やサードパーティ製ブラウザ向けの CORS 対応は保証されておらず、無制限のリクエストを許容するものでもありません。適切な頻度で呼び出し、ローカルキャッシュを活用してください。

[公開イベント・楽曲ランキング](/ja/public-data)

## 導入手順 {#stepsTitle}

[導入手順](/ja/quickstart) · [認証・スコープ・リージョン](/ja/guides/auth) · [元のセーブをダウンロード](/ja/guides/saves) · [制限とセキュリティ](/ja/guides/limits) · [エラー処理](/ja/guides/errors)

## API リファレンス {#scopesTitle}

- [プロフィールとお気に入り](/ja/api/profiles) — `moenotes:profiles`: 1人の公開プロフィール、複数プロフィールの一括取得、プレイヤーのお気に入り一覧を取得します。
- [プロフィールカード画像](/ja/api/profile-images) — `moenotes:profile-images`: プレイヤーのプロフィールカードの1ページを PNG として描画します。
- [ランキング](/ja/api/rankings) — `moenotes:rankings`: 楽曲・イベント・チャレンジ・アリーナのランキング。
- [人気編成](/ja/api/decks) — `moenotes:decks`: イベントランキングの編成構成とアリーナの編成傾向。
- [サークル](/ja/api/circles) — `moenotes:circles`: id でサークルを取得、または名前と条件で検索します。
- [ガチャ確率](/ja/api/gacha) — `moenotes:gacha`: ガチャ池とピックアップカードの公開確率。
- [お知らせ](/ja/api/announcements) — `moenotes:announcements`: ゲーム内お知らせの一覧と詳細。

