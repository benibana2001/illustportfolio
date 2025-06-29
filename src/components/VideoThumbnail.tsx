'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryVideo } from '@/types/gallery';

interface VideoThumbnailProps {
  video: GalleryVideo;
  onClick: () => void;
}

export default function VideoThumbnail({ video, onClick }: VideoThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 時間をフォーマット
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-gray-800 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {/* 動画オーバーレイ */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        
        {/* 再生ボタン */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
            <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* 動画アイコン */}
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* タイトル */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white text-lg font-medium">{video.title}</h3>
      </div>
    </div>
  );
} 