import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVideos } from '@/data/gallery-items';

// 静的パラメータを生成
export async function generateStaticParams() {
  const videos = getVideos();
  return videos.map((video) => ({
    id: video.id,
  }));
}

export default async function VideoDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const videos = getVideos();
  const video = videos.find(v => v.id === id);

  if (!video) {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{video.title}</h1>
          <div className="relative aspect-video w-full bg-gray-800 rounded-lg overflow-hidden">
            <video
              src={video.videoUrl}
              controls
              className="w-full h-full"
              poster={video.thumbnailUrl}
            >
              お使いのブラウザは動画の再生に対応していません。
            </video>
          </div>
        </div>
      </div>
    </main>
  );
} 