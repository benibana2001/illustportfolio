# Scripts

このディレクトリには、プロジェクトで使用するユーティリティスクリプトが含まれています。

## convert-mp4-to-webp.sh

MP4動画ファイルをWebPアニメーションに変換するスクリプトです。

### 使用方法

```bash
# 基本的な使用方法
./scripts/convert-mp4-to-webp.sh input.mp4

# 出力ファイル名を指定
./scripts/convert-mp4-to-webp.sh input.mp4 output.webp

# 例
./scripts/convert-mp4-to-webp.sh public/images/til-2024-07-25-01.mp4
```

### 変換パラメータ

- **fps=10**: フレームレートを10fpsに設定（ファイルサイズを抑制）
- **scale=800:-1**: 幅を800pxに設定、高さは自動計算
- **quality=75**: 品質を75%に設定
- **loop=0**: 無限ループ設定

### 依存関係

- ffmpegが必要です
- ffmpegがインストールされていない場合、スクリプトが自動的にポータブル版をダウンロードします

### ギャラリーへの追加手順

1. MP4ファイルを `public/images/` に配置
2. スクリプトを実行してWebPアニメーションを生成
3. `src/data/gallery.json` に新しいエントリを追加：

```json
{
  "id": "unique-id",
  "title": "作品タイトル",
  "description": "作品の説明",
  "imageUrl": "/images/filename.webp",
  "videoUrl": "/images/filename.mp4",
  "width": 800,
  "height": 800,
  "category": "fanart|original|other",
  "type": "animation"
}
```

### 注意事項

- WebPアニメーションはギャラリー一覧でサムネイルとして表示されます
- MP4動画は詳細ページで再生されます（ダウンロード保護付き）
- 変換後のファイルサイズが表示されます