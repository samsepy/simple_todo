# Simple TODO Project - 進捗管理ドキュメント

## プロジェクト概要
TDD、Git管理、GraphQL、codegenでAPI-Web連携を自動化するGoogleログイン認証付きTODOアプリ

**技術スタック:**
- Rails API (最新版) + GraphQL
- Next.js (最新版) + TypeScript + Tailwind CSS
- GraphQL CodeGen (型安全な連携)
- Google OAuth認証
- PostgreSQL
- TDD (RSpec + Jest)

## 完了済みタスク ✅

### 基盤セットアップ
1. ✅ Git初期化とリポジトリセットアップ
2. ✅ Rails API (GraphQL) バックエンドのセットアップ (最新版)
3. ✅ GraphQL CodeGen設定とスキーマ自動生成環境構築
4. ✅ Next.js フロントエンドのセットアップ (最新版)

### バックエンド開発 (Rails + GraphQL)
5. ✅ Rails側でユーザーモデルのテスト作成 (TDD)
6. ✅ Rails側でユーザーモデル実装
7. ✅ GraphQLスキーマ定義とcodegen実行
8. ✅ Rails側でGoogle OAuth設定とGraphQL認証機能のテスト作成
9. ✅ Rails側でGoogle OAuth設定とGraphQL認証機能実装
10. ✅ Rails側でTODOモデルのテスト作成 (TDD)
11. ✅ Rails側でTODOモデル実装

## 現在進行中タスク 🚧
15. 🚧 Next.js側でGoogle OAuth設定とGraphQLクライアント設定

## 残りタスク 📋

### Rails API完成 ✅
- ✅ 全GraphQL mutations/queries実装完了
- ✅ GraphQLスキーマエクスポート完了
- ✅ CodeGen用型定義生成完了

### フロントエンド開発 (Next.js)
16. ⏳ Next.js側でcodegen生成された型を使用したTODOリストUI実装
17. ⏳ Next.js側でテスト実装（codegen型使用）

### 統合・品質保証
18. ⏳ 統合テストとE2Eテスト実装

## 詳細な残りタスク

### 15. Next.js側でGoogle OAuth設定とGraphQLクライアント設定 🚧
- [ ] Google OAuth設定 (next-auth)
- [ ] Apollo Client設定
- [ ] 認証プロバイダー設定
- [ ] GraphQLクライアント初期化

### 16. Next.js側でcodegen生成された型を使用したTODOリストUI実装
- [ ] ログインページ実装
- [ ] メインTODOリストページ実装
- [ ] TODO作成コンポーネント
- [ ] TODO編集・削除機能
- [ ] レスポンシブデザイン (Tailwind)

### 17. Next.js側でテスト実装（codegen型使用）
- [ ] コンポーネントテスト (Jest + React Testing Library)
- [ ] GraphQL操作テスト
- [ ] 認証フローテスト

### 18. 統合テストとE2Eテスト実装
- [ ] API-Frontend結合テスト
- [ ] E2Eテスト (Playwright/Cypress)
- [ ] 認証フローE2Eテスト

## 作成済みファイル構造

### Rails API (todo_api/)
```
app/
├── models/
│   ├── user.rb (認証、TODOリレーション)
│   └── todo.rb (CRUD、スコープ、メソッド)
├── graphql/
│   ├── types/
│   │   ├── user_type.rb
│   │   ├── todo_type.rb
│   │   ├── auth_payload_type.rb
│   │   └── *_input_type.rb (各種入力型)
│   ├── mutations/
│   │   └── google_auth.rb
│   └── todo_api_schema.rb
├── controllers/
│   └── graphql_controller.rb (認証付き)
└── lib/
    ├── json_web_token.rb
    └── exception_handler.rb

spec/ (完全なテストカバレッジ)
├── models/ (User, Todo)
├── factories/ (FactoryBot)
└── graphql/mutations/ (認証テスト)
```

### Next.js Frontend (todo_frontend/)
```
src/
├── app/ (App Router)
├── generated/ (CodeGen出力先)
└── codegen.ts (設定)

package.json (GraphQL, Apollo, CodeGen依存関係)
```

## 次回開始時のアクション

1. **TODO mutations実装の続き**: CreateTodo, UpdateTodo, DeleteTodo, ToggleTodo mutations を作成
2. **認証チェック**: 各mutationで current_user 存在確認
3. **テスト実行**: 全mutationテストがパスすることを確認
4. **コミット**: mutation実装完了後にGitコミット
5. **GraphQLスキーマ更新**: CodeGenでNext.js用型生成

## 開発環境

- Rails API: `http://localhost:3001`
- Next.js Frontend: `http://localhost:3000`  
- PostgreSQL: ローカル環境
- Git: ローカルリポジトリ (リモート未設定)

## 重要な技術的判断

1. **TDD採用**: 全機能をテストファースト開発
2. **GraphQL CodeGen**: 型安全なAPI-Frontend連携
3. **JWT認証**: Google OAuth + JWT token
4. **Rails API Only**: フロントエンド完全分離
5. **最新技術スタック**: Rails 8.0, Next.js 15, TypeScript 5

最終更新: 2025-07-21