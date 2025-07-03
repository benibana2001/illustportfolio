import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import { fileURLToPath } from 'url';

// ES modulesで__dirnameを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 画像ファイルの拡張子を定義
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// public/images ディレクトリを走査して画像情報を取得
function scanImagesDirectory() {
  const imagesDir = path.join(__dirname, '../public/images');
  const galleryPath = path.join(__dirname, '../src/data/gallery.json');
  
  try {
    // 画像ディレクトリの存在確認
    if (!fs.existsSync(imagesDir)) {
      console.error('Images directory not found:', imagesDir);
      return;
    }

    // ディレクトリ内のファイルを取得
    const files = fs.readdirSync(imagesDir);
    
    // 画像ファイルのみをフィルタリング
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext) && file !== 'avatar.png'; // avatar.pngは除外
    });

    console.log(`Found ${imageFiles.length} image files`);

    // 各画像ファイルの情報を取得
    const galleryData = imageFiles.map((file, index) => {
      const filePath = path.join(imagesDir, file);
      const fileName = path.parse(file).name;
      
      try {
        // 画像サイズを取得
        const dimensions = sizeOf(filePath);
        
        // カテゴリを推測（ファイル名に基づく）
        let category = 'other';
        if (fileName.includes('fanart') || fileName.includes('fan')) {
          category = 'fanart';
        } else if (fileName.includes('original') || fileName.includes('orig')) {
          category = 'original';
        } else {
          // 偶数・奇数でfanart/originalを交互に割り当て
          category = index % 2 === 0 ? 'fanart' : 'original';
        }

        // タイトルを生成（ファイル名から）
        const title = fileName
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        return {
          id: fileName,
          title: title,
          imageUrl: `/images/${file}`,
          width: dimensions.width,
          height: dimensions.height,
          category: category
        };
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        return null;
      }
    }).filter(item => item !== null);

    // gallery.jsonを更新
    fs.writeFileSync(galleryPath, JSON.stringify(galleryData, null, 2));
    
    console.log(`Updated gallery.json with ${galleryData.length} images`);
    console.log('Gallery data updated successfully!');
    
    // 更新されたデータの概要を表示
    const categoryCounts = galleryData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\nCategory distribution:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} images`);
    });

  } catch (error) {
    console.error('Error scanning images directory:', error);
  }
}

// スクリプトが直接実行された場合のみ実行
if (import.meta.url === `file://${process.argv[1]}`) {
  scanImagesDirectory();
}

export { scanImagesDirectory };