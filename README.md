# Simple TODO Application

最新のRails（8.0.2）とNext.js（15.4.2）を使用したフルスタックTODOアプリケーション

## 技術スタック

### バックエンド (Rails API)
- **Rails 8.0.2** (API mode)
- **GraphQL** (スキーマファースト設計)
- **PostgreSQL** (データベース)
- **Google OAuth 2.0** (認証)
- **JWT** (トークン認証)
- **RSpec** (テスト)

### フロントエンド (Next.js)
- **Next.js 15.4.2** (App Router)
- **TypeScript** (型安全性)
- **Tailwind CSS** (スタイリング)
- **Apollo Client** (GraphQLクライアント)
- **NextAuth.js** (認証)
- **Jest + Testing Library** (テスト)

### 開発ツール
- **GraphQL Code Generator** (型自動生成)
- **Git** (バージョン管理)
- **TDD** (テスト駆動開発)

## 機能

- ✅ Google OAuth認証
- ✅ TODO作成・編集・削除
- ✅ TODO完了状態の切り替え
- ✅ リアルタイム更新
- ✅ 型安全なAPI連携
- ✅ レスポンシブデザイン

## プロジェクト構造

```
simple-todo/
├── todo_api/          # Rails GraphQL API
│   ├── app/
│   │   ├── models/    # User, Todo モデル
│   │   ├── graphql/   # GraphQL スキーマ・mutations・queries
│   │   └── lib/       # JWT認証
│   └── spec/          # RSpec テスト
└── todo_frontend/     # Next.js フロントエンド
    ├── src/
    │   ├── app/       # App Router ページ
    │   ├── components/ # React コンポーネント
    │   ├── contexts/  # 認証コンテキスト
    │   ├── generated/ # GraphQL CodeGenで生成された型
    │   └── __tests__/ # Jest テスト
    └── graphql/       # GraphQL クエリ定義
```

## セットアップ

### 1. バックエンド (Rails API)

```bash
cd todo_api
bundle install
rails db:create db:migrate
```

環境変数設定:
```bash
# .env
GOOGLE_CLIENT_ID=your-google-client-id
```

サーバー起動:
```bash
rails server -p 3001
```

### 2. フロントエンド (Next.js)

```bash
cd todo_frontend
npm install
```

環境変数設定:
```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3001/graphql
```

GraphQL型生成:
```bash
npm run codegen
```

開発サーバー起動:
```bash
npm run dev
```

## テスト実行

### バックエンドテスト
```bash
cd todo_api
bundle exec rspec
```

### フロントエンドテスト
```bash
cd todo_frontend
npm test
```

## 主要な設計思想

### 1. GraphQLファースト
- スキーマ定義からコード生成
- 型安全なAPI連携
- 効率的なデータフェッチング

### 2. TDD (テスト駆動開発)
- モデルテストから実装
- コンポーネントテストによる品質保証
- GraphQL mutations/queriesの包括的テスト

### 3. 型安全性
- TypeScript + GraphQL CodeGeneration
- フロントエンド〜バックエンド間の型整合性
- ランタイムエラーの最小化

### 4. 最新技術の活用
- Rails 8.0の最新機能
- Next.js 15のApp Router
- 最新のReactパターン

## API エンドポイント

### GraphQL Endpoint
```
POST http://localhost:3001/graphql
```

### 主要なMutations
- `googleAuth(idToken: String!)` - Google OAuth認証
- `createTodo(input: CreateTodoInput!)` - TODO作成
- `updateTodo(input: UpdateTodoInput!)` - TODO更新
- `deleteTodo(input: DeleteTodoInput!)` - TODO削除
- `toggleTodo(input: ToggleTodoInput!)` - TODO完了切り替え

### 主要なQueries
- `todos` - ユーザーのTODO一覧取得

## 開発プロセス

1. **要件定義**: シンプルなTODOアプリ with Google認証
2. **技術選定**: 最新のRails + Next.js
3. **アーキテクチャ設計**: GraphQL + TDD
4. **バックエンド実装**: Rails API + GraphQL
5. **フロントエンド実装**: Next.js + TypeScript
6. **テスト実装**: RSpec + Jest
7. **統合**: GraphQL CodeGenによる型連携

## 今後の拡張予定

- [ ] E2Eテスト (Playwright/Cypress)
- [ ] TODO カテゴリ機能
- [ ] TODO 共有機能
- [ ] プッシュ通知
- [ ] オフライン対応 (PWA)
- [ ] Docker化
- [ ] CI/CD パイプライン

## 貢献

このプロジェクトは学習・参考目的で作成されています。
改善提案やバグ報告はIssueでお願いします。

## ライセンス

MIT License