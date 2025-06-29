const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// アイコンを保存するディレクトリ
const outputDir = path.join(__dirname, '../public/images');

// ランダムな色を生成
function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 50%)`;
}

// シンプルなアイコンを描画
function drawAvatar(ctx, size) {
  // 背景色
  const bgColor = getRandomColor();
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // 円形の顔
  const faceColor = '#FFD700'; // 金色
  ctx.fillStyle = faceColor;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
  ctx.fill();

  // 目
  ctx.fillStyle = '#000';
  const eyeSize = size * 0.08;
  const eyeY = size * 0.4;
  
  // 左目
  ctx.beginPath();
  ctx.arc(size * 0.4, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();
  
  // 右目
  ctx.beginPath();
  ctx.arc(size * 0.6, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fill();

  // 口
  ctx.strokeStyle = '#000';
  ctx.lineWidth = size * 0.02;
  ctx.beginPath();
  ctx.arc(size / 2, size * 0.6, size * 0.15, 0, Math.PI);
  ctx.stroke();

  // 髪の毛
  ctx.fillStyle = '#8B4513'; // 茶色
  ctx.beginPath();
  ctx.arc(size / 2, size * 0.25, size * 0.4, Math.PI, 2 * Math.PI);
  ctx.fill();
}

// メイン処理
function main() {
  // 出力ディレクトリが存在しない場合は作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // アイコンサイズ
  const size = 200;

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // アイコンを描画
  drawAvatar(ctx, size);

  // 画像を保存
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, 'avatar.png'), buffer);

  console.log('アバターアイコンの生成が完了しました');
}

main(); 