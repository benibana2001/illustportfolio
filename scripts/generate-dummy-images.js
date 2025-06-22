const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// 画像を保存するディレクトリ
const outputDir = path.join(__dirname, '../public/images');

// ランダムな色を生成
function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 50%)`;
}

// ランダムな図形を描画
function drawRandomShape(ctx, width, height) {
  const shapes = ['circle', 'rectangle', 'triangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const color = getRandomColor();

  ctx.fillStyle = color;
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  switch (shape) {
    case 'circle':
      const radius = Math.min(width, height) * 0.3;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    case 'rectangle':
      const rectWidth = width * 0.6;
      const rectHeight = height * 0.4;
      ctx.fillRect((width - rectWidth) / 2, (height - rectHeight) / 2, rectWidth, rectHeight);
      ctx.strokeRect((width - rectWidth) / 2, (height - rectHeight) / 2, rectWidth, rectHeight);
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(width / 2, height * 0.2);
      ctx.lineTo(width * 0.2, height * 0.8);
      ctx.lineTo(width * 0.8, height * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
  }
}

// ダミー画像を生成
function generateDummyImage(index) {
  // ランダムなサイズを生成（800x600から1200x1600の範囲）
  const width = Math.floor(Math.random() * 400) + 800;
  const height = Math.floor(Math.random() * 1000) + 600;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景色を設定
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);

  // ランダムな図形を描画
  drawRandomShape(ctx, width, height);

  // 画像を保存
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(outputDir, `dummy-${index}.jpg`), buffer);

  return {
    id: `dummy-${index}`,
    title: `ダミー画像 ${index}`,
    imageUrl: `/images/dummy-${index}.jpg`,
    width,
    height
  };
}

// メイン処理
function main() {
  // 出力ディレクトリが存在しない場合は作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 26枚のダミー画像を生成
  const images = Array.from({ length: 26 }, (_, i) => generateDummyImage(i + 1));

  // 画像情報をJSONファイルとして保存
  fs.writeFileSync(
    path.join(__dirname, '../src/data/gallery.json'),
    JSON.stringify(images, null, 2)
  );

  console.log('26枚のダミー画像の生成が完了しました');
}

main(); 