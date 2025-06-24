# git-hooks/pre-push

Gitの `pre-push` フック用スクリプトです。

## 概要

`pre-push` スクリプトは、`master`、`main`、`develop` などの保護されたブランチへの push を防止するためのものです。  
誤って重要なブランチへ直接 push してしまうことを防ぎ、開発フローの安全性を高めます。

## 使い方

1. 本スクリプト（`pre-push`）をリポジトリの `.git/hooks/` ディレクトリに配置し、実行権限を付与してください。

    ```sh
    cp git-hooks/pre-push .git/hooks/pre-push
    chmod +x .git/hooks/pre-push
    ```

2. 以降、`master`、`main`、`develop` ブランチへの push を試みるとエラーとなり、push がブロックされます。

## 動作概要

- push 対象のリファレンス名からブランチ名を抽出し、保護ブランチに該当する場合はエラーを表示して終了します。
- 保護ブランチ以外への push は通常通り実行されます。

## 注意事項

- チームの運用ルールに合わせて、保護ブランチのリスト（スクリプト内の `PROTECTED_BRANCHES`）は適宜編集してください。
- このフックはローカルリポジトリごとに設定が必要です。