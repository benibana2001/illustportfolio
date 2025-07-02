import { GalleryVideo } from '@/types/gallery';

export const galleryVideos: GalleryVideo[] = [
  {
    id: 'video-1',
    title: 'サンプル動画 1',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/800/600?random=1',
    width: 1280,
    height: 720,
    duration: 30,
    type: 'video',
    category: 'fanart'
  },
  {
    id: 'video-2',
    title: 'サンプル動画 2',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnailUrl: 'https://picsum.photos/800/600?random=2',
    width: 1280,
    height: 720,
    duration: 45,
    type: 'video',
    category: 'original'
  },
  {
    id: 'video-3',
    title: 'サンプル動画 3',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    thumbnailUrl: 'https://picsum.photos/800/600?random=3',
    width: 1280,
    height: 720,
    duration: 60,
    type: 'video',
    category: 'other'
  }
]; 