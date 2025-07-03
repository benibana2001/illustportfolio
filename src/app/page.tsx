import Image from "next/image";
import Link from 'next/link';
import HeroSlideshow from '@/components/HeroSlideshow';
import { galleryImages } from '@/data/gallery';

export default function Home() {
  // FanArt作品を取得（最大6件）
  const fanartImages = galleryImages.filter(image =>
    image.category === 'fanart'
  ).slice(0, 6);

  // Original作品を取得（最大6件）
  const originalImages = galleryImages.filter(image =>
    image.category === 'original'
  ).slice(0, 6);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* ヒーロースライドショー */}
      <HeroSlideshow />

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

        <h1 className="text-2xl font-bold mb-8 text-center">
          べにばな
        </h1>
        <p className="text-base text-center text-gray-300 mb-2">
          個人でイラストを描いています。ファンアートが多いです。
        </p>
        <p className="text-base text-center text-gray-300 mb-16">
          その他BlenderやLive2Dを使用した制作も行っています。
        </p>


        {/* FanArtセクション */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">FanArt</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {fanartImages.map((image) => (
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
          <div className="text-center">
            <Link
              href="/fanart"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              ファンアート一覧を見る
            </Link>
          </div>
        </div>

        {/* Originalセクション */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Original</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {originalImages.map((image) => (
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
          <div className="text-center">
            <Link
              href="/original"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              オリジナル一覧を見る
            </Link>
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
