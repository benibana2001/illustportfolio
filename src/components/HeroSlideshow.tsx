'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroSlideshowConfig, heroSlideshowImageIds } from '@/data/hero-slideshow';
import { galleryImages } from '@/data/gallery';


export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // スライドショーに表示する画像を取得
  const slideshowImages = galleryImages.filter(image =>
    heroSlideshowImageIds.includes(image.id)
  );

  // 自動再生
  useEffect(() => {
    if (!heroSlideshowConfig.autoplay || slideshowImages.length < 4) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      // トランジション開始後、少し遅らせて画像を切り替える
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % slideshowImages.length
        );
        setIsTransitioning(false);
      }, heroSlideshowConfig.transition.duration / 2);

    }, heroSlideshowConfig.autoplaySpeed);

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  // 画像が4枚未満の場合は表示しない
  if (slideshowImages.length < 4) {
    return null;
  }

  // 安全に画像を取得するヘルパー関数
  const getImageByIndex = (index: number) => {
    const safeIndex = index % slideshowImages.length;
    return slideshowImages[safeIndex];
  };

  // メイン画像のアニメーションパターンを決定
  const getMainImageAnimationClass = (index: number) => {
    const patterns = ['animate-zoom', 'animate-pan-up', 'animate-pan-down'];
    return patterns[index % patterns.length];
  };

  // 現在表示する4枚の画像を取得
  const mainImage = getImageByIndex(currentIndex);
  const sub1Image = getImageByIndex(currentIndex + 1);
  const sub2Image = getImageByIndex(currentIndex + 2);
  const sub3Image = getImageByIndex(currentIndex + 3);

  return (
    <>

      <div className={`w-full h-[28rem] md:h-[35rem] lg:h-[42rem] relative overflow-hidden bg-gray-900 slideshow-transition ${isTransitioning ? 'opacity-95' : 'opacity-100'
        }`}>
        <div className="flex h-full">
          {/* メイン画像エリア（左4/3） */}
          <Link href={`/gallery/${mainImage.id}`} className="w-3/4 relative overflow-hidden block group">
            <div className="absolute inset-0">
              <Image
                src={mainImage.imageUrl}
                alt={mainImage.title}
                fill
                className={`object-cover ${getMainImageAnimationClass(currentIndex)} group-hover:brightness-110 transition-all duration-300`}
                priority
                sizes="75vw"
              />
            </div>
            {/* オーバーレイとタイトル */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent group-hover:from-black/40 transition-all duration-300" />
            <div className={`absolute bottom-4 left-4 text-white slideshow-transition ${isTransitioning ? 'opacity-70 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
              <h2 className="text-lg md:text-xl lg:text-2xl mb-2 group-hover:text-blue-200 transition-colors duration-300">
                {mainImage.title}
              </h2>
            </div>
          </Link>

          {/* サブ画像エリア（右1/4を3分割） */}
          <div className="w-1/4 flex flex-col">
            {/* サブ1 */}
            <Link href={`/gallery/${sub1Image.id}`} className="flex-1 relative group overflow-hidden block">
              <div className="absolute inset-0">
                <Image
                  src={sub1Image.imageUrl}
                  alt={sub1Image.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  sizes="25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className={`absolute bottom-2 left-2 text-white slideshow-transition ${isTransitioning ? 'opacity-70' : 'opacity-100'
                }`}>
                <p className="text-xs font-medium truncate group-hover:text-blue-200 transition-colors">{sub1Image.title}</p>
              </div>
            </Link>

            {/* サブ2 */}
            <Link href={`/gallery/${sub2Image.id}`} className="flex-1 relative group overflow-hidden block">
              <div className="absolute inset-0">
                <Image
                  src={sub2Image.imageUrl}
                  alt={sub2Image.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  sizes="25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className={`absolute bottom-2 left-2 text-white slideshow-transition ${isTransitioning ? 'opacity-70' : 'opacity-100'
                }`}>
                <p className="text-xs font-medium truncate group-hover:text-blue-200 transition-colors">{sub2Image.title}</p>
              </div>
            </Link>

            {/* サブ3 */}
            <Link href={`/gallery/${sub3Image.id}`} className="flex-1 relative group overflow-hidden block">
              <div className="absolute inset-0">
                <Image
                  src={sub3Image.imageUrl}
                  alt={sub3Image.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  sizes="25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className={`absolute bottom-2 left-2 text-white slideshow-transition ${isTransitioning ? 'opacity-70' : 'opacity-100'
                }`}>
                <p className="text-xs font-medium truncate group-hover:text-blue-200 transition-colors">{sub3Image.title}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* インジケーター */}
        <div className={`absolute bottom-4 right-4 flex space-x-2 slideshow-transition ${isTransitioning ? 'opacity-70' : 'opacity-100'
          }`}>
          {slideshowImages.slice(0, Math.min(10, slideshowImages.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, heroSlideshowConfig.transition.duration / 2);
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`スライド ${index + 1}`}
            />
          ))}
        </div>

        {/* 一時停止/再生ボタン */}
        <button
          onClick={() => {
            // 設定を動的に変更する場合は別途実装が必要
          }}
          className={`absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all slideshow-transition ${isTransitioning ? 'opacity-70' : 'opacity-100'
            }`}
          aria-label="スライドショーの制御"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {heroSlideshowConfig.autoplay ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
        </button>
      </div>
    </>
  );
}
