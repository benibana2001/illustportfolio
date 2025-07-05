#!/bin/bash

# MP4をWebPアニメーションに変換するスクリプト
# Usage: ./convert-mp4-to-webp.sh input.mp4 [output.webp]

# 引数チェック
if [ $# -eq 0 ]; then
    echo "Usage: $0 input.mp4 [output.webp]"
    echo "Example: $0 til-2024-07-25-01.mp4"
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_FILE="${2:-${INPUT_FILE%.mp4}.webp}"

# 入力ファイルの存在チェック
if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: Input file '$INPUT_FILE' not found"
    exit 1
fi

# ffmpegの存在チェック
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg not found. Downloading portable version..."
    # ポータブルffmpegをダウンロード
    curl -s https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz | tar -xJ -C /tmp
    cp /tmp/ffmpeg-*/ffmpeg /tmp/ffmpeg-temp
    chmod +x /tmp/ffmpeg-temp
    FFMPEG_CMD="/tmp/ffmpeg-temp"
else
    FFMPEG_CMD="ffmpeg"
fi

echo "Converting $INPUT_FILE to $OUTPUT_FILE..."

# MP4をWebPアニメーションに変換
# パラメータ説明:
# - fps=10: フレームレートを10fpsに設定（アニメーションサイズを抑制）
# - scale=800:-1: 幅を800pxに設定、高さは自動計算
# - flags=lanczos: 高品質スケーリング
# - libwebp: WebPエンコーダー
# - lossless 0: 非可逆圧縮を使用
# - quality 75: 品質を75%に設定
# - loop 0: 無限ループ
$FFMPEG_CMD -i "$INPUT_FILE" \
    -vf "fps=10,scale=800:-1:flags=lanczos" \
    -c:v libwebp \
    -lossless 0 \
    -quality 75 \
    -loop 0 \
    "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo "Conversion completed successfully!"
    echo "Input: $INPUT_FILE"
    echo "Output: $OUTPUT_FILE"
    
    # ファイルサイズを表示
    if command -v du &> /dev/null; then
        echo "Input size: $(du -h "$INPUT_FILE" | cut -f1)"
        echo "Output size: $(du -h "$OUTPUT_FILE" | cut -f1)"
    fi
else
    echo "Conversion failed!"
    exit 1
fi

# 一時ファイルをクリーンアップ
if [ -f "/tmp/ffmpeg-temp" ]; then
    rm -f /tmp/ffmpeg-temp
fi