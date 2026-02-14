// DOM要素の取得
const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const formatBtn = document.getElementById('formatBtn');
const clearInputBtn = document.getElementById('clearInputBtn');
const copyBtn = document.getElementById('copyBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');
const messageEl = document.getElementById('message');

// フォーマットボタンのクリックイベント
formatBtn.addEventListener('click', formatJSON);

// Enterキー（Ctrl+Enter）でフォーマット実行
jsonInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        formatJSON();
    }
});

// クリアボタンのクリックイベント
clearInputBtn.addEventListener('click', () => {
    jsonInput.value = '';
    jsonInput.focus();
    showMessage('', '');
});

clearOutputBtn.addEventListener('click', () => {
    jsonOutput.value = '';
    showMessage('', '');
});

// コピーボタンのクリックイベント
copyBtn.addEventListener('click', copyToClipboard);

/**
 * JSONをフォーマットする関数
 */
function formatJSON() {
    const input = jsonInput.value.trim();

    // 入力が空の場合
    if (!input) {
        showMessage('JSONを入力してください', 'error');
        jsonOutput.value = '';
        return;
    }

    try {
        // JSONをパースして整形
        // エスケープされたダブルクォーテーションを除去してパース
        // 例: {\"name\":\"Alice\"} → {"name":"Alice"}
        const parsed = JSON.parse(unescapeJSON(input));
        const formatted = JSON.stringify(parsed, null, 2);

        jsonOutput.value = formatted;
        showMessage('フォーマット完了！', 'success');
    } catch (error) {
        showMessage('エラー: 無効なJSONです - ' + error.message, 'error');
        jsonOutput.value = '';
    }
}

/**
 * エスケープされたJSONをアンエスケープする関数
 * 例: {\"name\":\"Alice\"} → {"name":"Alice"}
 * @param {string} jsonString - アンエスケープするJSON文字列
 * @returns {string} - アンエスケープされたJSON文字列
 */
function unescapeJSON(jsonString) {
    // 先頭と末尾がダブルクォーテーションで囲まれている場合は除去
    if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
        jsonString = jsonString.slice(1, -1);
    }

    // エスケープされたダブルクォーテーションを通常のダブルクォーテーションに変換
    jsonString = jsonString.replace(/\\"/g, '"');

    return jsonString;
}

/**
 * メッセージを表示する関数
 * @param {string} text - 表示するメッセージテキスト
 * @param {string} type - メッセージタイプ ('success' または 'error')
 */
function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = 'message';
    if (type) {
        messageEl.classList.add(type);
    }

    // 3秒後にメッセージを消す
    if (type === 'success') {
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 3000);
    }
}

/**
 * クリップボードにコピーする関数
 */
function copyToClipboard() {
    const output = jsonOutput.value.trim();

    if (!output) {
        showMessage('コピーできる内容がありません', 'error');
        return;
    }

    // クリップボードAPIを使用
    if (navigator.clipboard) {
        navigator.clipboard.writeText(output)
            .then(() => {
                showMessage('クリップボードにコピーしました！', 'success');
            })
            .catch(() => {
                fallbackCopy(output);
            });
    } else {
        // フォールバック方法
        fallbackCopy(output);
    }
}

/**
 * クリップボードへのコピーのフォールバック方法
 * @param {string} text - コピーするテキスト
 */
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showMessage('クリップボードにコピーしました！', 'success');
    } catch (err) {
        showMessage('コピーに失敗しました', 'error');
    }

    document.body.removeChild(textarea);
}
