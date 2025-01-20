# OpenAPIからのコード生成手順

## バックエンド

```bash
go run github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest -config oapi-codegen.yaml openapi.yaml
```

を実行すると `backend/handler/api.gen.go` が生成される。
