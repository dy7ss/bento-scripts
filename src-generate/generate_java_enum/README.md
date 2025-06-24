# generate_java_enum

このディレクトリは、Javaのenumクラスを自動生成するためのスクリプトを提供します。

## 概要

`generate_java_enum.py` は、指定した入力データ（例: CSVやJSONファイル）からJavaのenumクラスのソースコードを自動生成します。  
定数名や値、コメントなどを柔軟に設定でき、手作業によるミスや工数を削減します。

## 構成ファイル

- `generate_java_enum.py`  
  入力データからJavaのenumクラスを生成するPythonスクリプトです。
- `sample.csv`  
  サンプルの入力データファイルです（必要に応じて用意してください）。
- `output/`  
  生成されたJavaファイルの出力先ディレクトリです。

## 使い方

1. 必要なPythonパッケージ（標準ライブラリのみの場合は追加インストール不要）を用意します。

2. 入力データ（例: `sample.csv`）を準備します。

3. 以下のコマンドでスクリプトを実行します。

    ```sh
    python generate_java_enum.py sample.csv
    ```

4. `output/` ディレクトリにJavaのenumクラスファイルが生成されます。

## 入力データ例（CSV）

```csv
NAME,VALUE,COMMENT
APPLE,1,りんご
BANANA,2,バナナ
ORANGE,3,オレンジ
```

## 注意事項

- 入力データのフォーマットはスクリプトの仕様に従ってください。
- 生成されたJavaファイルは必要に応じてプロジェクトに組み込んでください。
- 本ツールは開発・テスト用途を想定しています。