const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

// 画像ファイルの拡張子を定義
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function addNewImages() {
  const imagesDir = path.join(__dirname, '../public/images');
  const galleryPath = path.join(__dirname, '../src/data/gallery.json');
  
  try {
    // 既存のgallery.jsonを読み込み
    let existingData = [];
    if (fs.existsSync(galleryPath)) {
      const galleryContent = fs.readFileSync(galleryPath, 'utf8');
      existingData = JSON.parse(galleryContent);
    }
    
    // 既存の画像IDのセットを作成
    const existingIds = new Set(existingData.map(item => item.id));
    
    // 画像ディレクトリの存在確認
    if (!fs.existsSync(imagesDir)) {
      console.error('Images directory not found:', imagesDir);
      return;
    }

    // ディレクトリ内のファイルを取得
    const files = fs.readdirSync(imagesDir);
    
    // 画像ファイルのみをフィルタリング（Zone.Identifierファイルを除外）
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext) && 
             file !== 'avatar.png' && 
             !file.includes(':Zone.Identifier');
    });

    console.log(`Found ${imageFiles.length} total image files`);
    console.log(`Existing entries: ${existingData.length}`);

    // 新しい画像ファイルのみを処理
    const newImageFiles = imageFiles.filter(file => {
      const fileName = path.parse(file).name;
      return !existingIds.has(fileName);
    });

    console.log(`New images to add: ${newImageFiles.length}`);

    if (newImageFiles.length === 0) {
      console.log('No new images to add.');
      return;
    }

    // 新しい画像ファイルの情報を取得
    const newGalleryData = newImageFiles.map((file) => {
      const filePath = path.join(imagesDir, file);
      const fileName = path.parse(file).name;
      
      try {
        // 画像サイズを取得
        const dimensions = imageSize(filePath);
        
        // カテゴリを推測（ファイル名や日付に基づく）
        let category = 'original'; // デフォルト
        
        // 日付から推測（2024年以降はfanartが多い傾向）
        const dateMatch = fileName.match(/til-(\d{4})-/);
        if (dateMatch) {
          const year = parseInt(dateMatch[1]);
          if (year >= 2024) {
            category = 'fanart';
          }
        }

        // 基本的なタイトルを生成（後で手動編集を推奨）
        const title = fileName
          .replace(/^til-/, '')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        return {
          id: fileName,
          title: title,
          description: "作品の説明をここに追加してください。", // プレースホルダー
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

    // 既存データと新しいデータをマージ
    const mergedData = [...existingData, ...newGalleryData];

    // gallery.jsonを更新
    fs.writeFileSync(galleryPath, JSON.stringify(mergedData, null, 2));
    
    console.log(`\nSuccessfully added ${newGalleryData.length} new images to gallery.json`);
    console.log(`Total images: ${mergedData.length}`);
    
    // 新しく追加された画像の一覧を表示
    if (newGalleryData.length > 0) {
      console.log('\nNewly added images:');
      newGalleryData.forEach(item => {
        console.log(`  - ${item.id} (${item.category})`);
      });
      
      console.log('\n⚠️  Note: Please manually edit titles and descriptions for the new images in gallery.json');
    }

  } catch (error) {
    console.error('Error adding new images:', error);
  }
}

// スクリプトが直接実行された場合のみ実行
if (require.main === module) {
  addNewImages();
}

module.exports = { addNewImages };