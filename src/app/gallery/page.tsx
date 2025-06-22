'use client';

import Image from 'next/image';
import Link from 'next/link';
import { galleryImages } from '@/data/gallery';
import { useState, useEffect } from 'react';

// クライアントコンポーネントとして分離
const GalleryGrid = () => {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth < 768 ? 2 : 3);
    };

    // 初期表示時に実行
    handleResize();

    // リサイズイベントのリスナーを設定
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 画像を列ごとに分割
  const columnImages = Array.from({ length: columns }, (_, i) => {
    return galleryImages.filter((_, index) => index % columns === i);
  });

  // 縦横比を計算してCSSクラスを生成
  const getAspectRatioClass = (width: number, height: number) => {
    const ratio = width / height;
    
    if (ratio >= 1.5) {
      return 'aspect-[3/2]'; // 横長
    } else if (ratio >= 1.2) {
      return 'aspect-[4/3]'; // やや横長
    } else if (ratio >= 0.8) {
      return 'aspect-square'; // 正方形
    } else if (ratio >= 0.6) {
      return 'aspect-[3/4]'; // やや縦長
    } else {
      return 'aspect-[2/3]'; // 縦長
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {columnImages.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {column.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg bg-gray-800">
              <Link href={`/gallery/${image.id}`} className="block">
                <div className={`relative ${getAspectRatioClass(image.width, image.height)}`}>
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-lg font-medium">{image.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// サーバーコンポーネント
export default function Gallery() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
        <GalleryGrid />
      </div>
    </main>
  );
} 