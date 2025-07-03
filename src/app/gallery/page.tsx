'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { galleryItems } from '@/data/gallery-items';
import VideoThumbnail from '@/components/VideoThumbnail';

export default function Gallery() {
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

  // 画像を列ごとに分割
  const columnItems = Array.from({ length: columns }, (_, i) => {
    return galleryItems.filter((_, index) => index % columns === i);
  });

  // 動画クリックハンドラー
  const handleVideoClick = (videoId: string) => {
    window.open(`/gallery/video/${videoId}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {columnItems.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((item) => (
                <div key={item.id}>
                  {item.type === 'image' ? (
                    <Link href={`/gallery/${item.id}`}>
                      <div className="group relative overflow-hidden rounded-lg bg-gray-800">
                        <div className={`relative ${getAspectRatioClass(item.width, item.height)}`}>
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white text-lg font-medium">{item.title}</h3>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <VideoThumbnail
                      video={item}
                      onClick={() => handleVideoClick(item.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 