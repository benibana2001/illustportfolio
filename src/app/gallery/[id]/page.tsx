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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/gallery" 
          className="text-blue-400 hover:text-blue-300 mb-8 inline-block transition-colors"
        >
          ← ギャラリーに戻る
        </Link>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="relative aspect-[3/4] w-full max-h-[80vh]">
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h1 className="text-2xl font-semibold mb-4 text-gray-200">{image.title}</h1>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {image.description || 'この作品について詳しい説明はありません。'}
                </p>
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      カテゴリー: {image.category === 'fanart' ? 'ファンアート' : 'オリジナル'}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      サイズ: {image.width} × {image.height}
                    </span>
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