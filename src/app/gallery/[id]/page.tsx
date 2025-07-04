import Image from 'next/image';
import Link from 'next/link';
import { galleryImages } from '@/data/gallery';
import { notFound } from 'next/navigation';

// 静的パラメータを生成
export async function generateStaticParams() {
  return galleryImages.map((image) => ({
    id: image.id,
  }));
}

export default async function ImageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const image = galleryImages.find(img => img.id === id);

  if (!image) {
    notFound();
  }

  // 現在の画像のインデックスを取得
  const currentIndex = galleryImages.findIndex(img => img.id === id);
  
  // 前後の画像を取得
  const previousImage = currentIndex > 0 ? galleryImages[currentIndex - 1] : null;
  const nextImage = currentIndex < galleryImages.length - 1 ? galleryImages[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="relative aspect-[3/4] w-full max-h-[80vh]">
              {'videoUrl' in image ? (
                <video
                  src={(image as {videoUrl: string}).videoUrl}
                  controls
                  controlsList="nodownload"
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-contain rounded-lg"
                  poster={image.imageUrl}
                >
                  お使いのブラウザは動画再生に対応していません。
                </video>
              ) : (
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h1 className="text-2xl font-semibold mb-4 text-gray-200">{image.title}</h1>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {image.description || 'この作品について詳しい説明はありません。'}
                </p>
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      カテゴリー: 
                      <Link 
                        href={image.category === 'fanart' ? '/fanart' : '/original'}
                        className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                      >
                        {image.category === 'fanart' ? 'ファンアート' : 'オリジナル'}
                      </Link>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      サイズ: {image.width} × {image.height}
                    </span>
                  </div>
                  
                  {/* ページネーション */}
                  <div className="pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-between">
                      {/* 前の画像 */}
                      <div className="flex-1">
                        {previousImage ? (
                          <Link 
                            href={`/gallery/${previousImage.id}`}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                          >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <div className="text-left">
                              <div className="text-xs text-gray-400">前の作品</div>
                              <div className="text-sm font-medium truncate max-w-[120px]">{previousImage.title}</div>
                            </div>
                          </Link>
                        ) : (
                          <div className="opacity-50">
                            <div className="text-xs text-gray-500">前の作品</div>
                            <div className="text-sm text-gray-500">なし</div>
                          </div>
                        )}
                      </div>

                      {/* ギャラリーに戻る */}
                      <div className="flex-shrink-0 mx-4">
                        <Link 
                          href="/gallery" 
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                          ギャラリー
                        </Link>
                      </div>

                      {/* 次の画像 */}
                      <div className="flex-1 flex justify-end">
                        {nextImage ? (
                          <Link 
                            href={`/gallery/${nextImage.id}`}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                          >
                            <div className="text-right">
                              <div className="text-xs text-gray-400">次の作品</div>
                              <div className="text-sm font-medium truncate max-w-[120px]">{nextImage.title}</div>
                            </div>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ) : (
                          <div className="opacity-50 text-right">
                            <div className="text-xs text-gray-500">次の作品</div>
                            <div className="text-sm text-gray-500">なし</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 