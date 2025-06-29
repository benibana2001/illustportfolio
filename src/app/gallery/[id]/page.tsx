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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/gallery" 
          className="text-blue-400 hover:text-blue-300 mb-8 inline-block transition-colors"
        >
          ← ギャラリーに戻る
        </Link>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{image.title}</h1>
          <div className="relative aspect-[3/4] w-full max-h-[80vh]">
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
} 