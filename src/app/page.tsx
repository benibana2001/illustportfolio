import Image from "next/image";
import Link from 'next/link';
import Slideshow from '@/components/Slideshow';
import { featuredImageIds } from '@/data/featured';
import { galleryImages } from '@/data/gallery';

export default function Home() {
  // トップページに表示する画像を取得
  const featuredImages = galleryImages.filter(image => 
    featuredImageIds.includes(image.id)
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* スライドショー */}
      <div className="w-full">
        <Slideshow />
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-16">
        {/* アイコン */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/images/avatar.png"
              alt="プロフィールアイコン"
              fill
              className="object-cover rounded-full border-4 border-white/20 shadow-lg"
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">
          イラストポートフォリオ
        </h1>
        <p className="text-xl text-center text-gray-300 mb-16">
          ようこそ！私の作品をご覧ください。
        </p>

        {/* おすすめ作品セクション */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">おすすめ作品</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredImages.map((image) => (
              <Link href={`/gallery/${image.id}`} key={image.id}>
                <div className="group relative overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 hover:scale-105">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-lg font-medium">{image.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ギャラリーへのリンク */}
        <div className="text-center">
          <Link 
            href="/gallery" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            すべての作品を見る
          </Link>
        </div>
      </div>
    </main>
  );
}
