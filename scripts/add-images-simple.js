const fs = require('fs');
const path = require('path');

function addNewImagesSimple() {
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
    console.log(`Existing entries: ${existingData.length}`);
    
    // 新しく追加する画像のリスト（手動で定義）
    const newImages = [
      'til-2023-08-18-02', 'til-2023-08-21-02', 'til-2023-09-08-02', 'til-2023-10-11-03',
      'til-2023-11-07-01', 'til-2023-12-31-04', 'til-2024-02-17-01', 'til-2024-02-20-01',
      'til-2024-02-23-04', 'til-2024-03-19-01', 'til-2024-03-23-01', 'til-2024-04-14-02',
      'til-2024-04-28-01', 'til-2024-05-01-01', 'til-2024-05-04-02', 'til-2024-07-30-02',
      'til-2024-08-09-01', 'til-2024-08-12-02', 'til-2024-08-19-01', 'til-2024-08-21-01',
      'til-2024-08-28-01', 'til-2024-09-04-01', 'til-2024-09-12-01', 'til-2024-09-18-02',
      'til-2024-09-30-02', 'til-2024-10-26-01', 'til-2024-12-15-01', 'til-2025-01-13-01',
      'til-2025-04-10-02', 'til-2025-04-17-01', 'til-2025-04-19-01', 'til-2025-04-23-01',
      'til-2025-05-03-01'
    ];

    // 新しい画像のみをフィルタリング
    const newImageFiles = newImages.filter(id => !existingIds.has(id));
    console.log(`New images to add: ${newImageFiles.length}`);

    if (newImageFiles.length === 0) {
      console.log('No new images to add.');
      return;
    }

    // 新しい画像ファイルの情報を生成
    const newGalleryData = newImageFiles.map((id) => {
      // 年から推測してカテゴリを決定
      const yearMatch = id.match(/til-(\d{4})-/);
      let category = 'original'; // デフォルト
      
      if (yearMatch) {
        const year = parseInt(yearMatch[1]);
        // 2024年以降はfanartが多い傾向
        if (year >= 2024) {
          category = 'fanart';
        } else {
          category = 'original';
        }
      }

      // 基本的なタイトルを生成
      const title = id
        .replace(/^til-/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      return {
        id: id,
        title: title,
        description: "作品の説明をここに追加してください。",
        imageUrl: `/images/${id}.jpg`,
        width: 800,  // デフォルト値
        height: 600, // デフォルト値
        category: category
      };
    });

    // 既存データと新しいデータをマージ
    const mergedData = [...existingData, ...newGalleryData];

    // gallery.jsonを更新
    fs.writeFileSync(galleryPath, JSON.stringify(mergedData, null, 2));
    
    console.log(`\nSuccessfully added ${newGalleryData.length} new images to gallery.json`);
    console.log(`Total images: ${mergedData.length}`);
    
    // 新しく追加された画像の一覧を表示
    console.log('\nNewly added images:');
    newGalleryData.forEach(item => {
      console.log(`  - ${item.id} (${item.category})`);
    });
    
    console.log('\n⚠️  Note: Please manually edit titles and descriptions for the new images in gallery.json');
    console.log('💡 Tip: Default size is 800x600. Update actual dimensions if needed.');

  } catch (error) {
    console.error('Error adding new images:', error);
  }
}

// スクリプトが直接実行された場合のみ実行
if (require.main === module) {
  addNewImagesSimple();
}

module.exports = { addNewImagesSimple };