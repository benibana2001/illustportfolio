import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">ページが見つかりません</h1>
        <div className="text-center">
          <Link href="/gallery" className="text-blue-400 hover:text-blue-300">
            ギャラリーに戻る
          </Link>
        </div>
      </div>
    </main>
  );
} 