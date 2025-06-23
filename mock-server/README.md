# json_mock_server

このスクリプトは、かんたんなJSONレスポンスを返すモックサーバーです。  
API開発やフロントエンドのテスト用途で利用できます。

## 構成ファイル

- `mock.py`  
  WSGIサーバーとして動作するPython製モックサーバー本体です。
- `settings.json`  
  エンドポイントごとのレスポンスファイルやポート番号を定義する設定ファイルです。
- `data.json`  
  モックAPIのレスポンスとして返すJSONデータ例です。
- `test.http`  
  VSCodeでAPIリクエストをテストするためのサンプルリクエストです。
  VSCode拡張機能である`REST Client`を導入して利用します。

## 使い方

1. 必要なパッケージ（標準ライブラリのみ使用）を用意し、`mock-server` ディレクトリで以下を実行します。

    ```sh
    python mock.py
    ```

2. サーバーが `settings.json` で指定したポート（デフォルト: 18023）で起動します。

3. `test.http` などを使い、APIリクエストを送信して動作を確認できます。

## 設定例

`settings.json` でエンドポイントごとに返すファイルやメソッドを指定できます。

```json
{
    "port": 18023,
    "response_files": {
        "/customer": {
            "GET": "data.json"
        },
        "/customer/123": {
            "PUT": "data.json",
            "GET": "data.json"
        }
    }
}
```

## 注意事項

- レスポンスはすべて `data.json` など指定したファイルの内容を返します。
- 複雑なロジックや認証処理はありません。  
- 本番用途ではなく、開発・テスト用途にご利用ください。