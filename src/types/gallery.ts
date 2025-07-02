export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  type: 'image';
  category: 'fanart' | 'original' | 'other';
}

export interface GalleryVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  duration: number; // 秒
  type: 'video';
  category: 'fanart' | 'original' | 'other';
}

export type GalleryItem = GalleryImage | GalleryVideo; 