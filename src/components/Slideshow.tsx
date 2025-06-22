'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { slideshowImageIds, slideshowConfig } from '@/data/slideshow';
import { galleryImages } from '@/data/gallery';

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(slideshowConfig.autoplay);

  // スライドショーに表示する画像を取得
  const slideshowImages = galleryImages.filter(image => 
    slideshowImageIds.includes(image.id)
  );

  // 自動再生
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1
      );
    }, slideshowConfig.autoplaySpeed);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slideshowImages.length]);

  // 前のスライド
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slideshowImages.length - 1 : prevIndex - 1
    );
  };

  // 次のスライド
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 特定のスライドに移動
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 自動再生の切り替え
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (slideshowImages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
      {/* スライド */}
      <div className="relative w-full h-full">
        {slideshowImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-black/30" />
            {/* タイトル */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                {image.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* 前のボタン */}
      {slideshowConfig.showArrows && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          aria-label="前のスライド"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* 次のボタン */}
      {slideshowConfig.showArrows && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          aria-label="次のスライド"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* ドット */}
      {slideshowConfig.showDots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slideshowImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`スライド ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* 自動再生切り替えボタン */}
      <button
        onClick={toggleAutoplay}
        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        aria-label={isAutoPlaying ? '自動再生を停止' : '自動再生を開始'}
      >
        {isAutoPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
} 