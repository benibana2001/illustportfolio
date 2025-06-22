import Image from "next/image";
import Slideshow from '@/components/Slideshow';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* スライドショー */}
      <div className="w-full">
        <Slideshow />
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">
          イラストポートフォリオ
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          ようこそ！私の作品をご覧ください。
        </p>
        
        {/* 特徴セクション */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">多様な作品</h3>
              <p className="text-gray-300">
                様々なテーマとスタイルの作品を展示しています。
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">高品質</h3>
              <p className="text-gray-300">
                細部までこだわった高品質な作品をお届けします。
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">オリジナル</h3>
              <p className="text-gray-300">
                独自の視点と創造性を活かしたオリジナル作品です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
