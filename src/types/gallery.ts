export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  width: number;
  height: number;
  type: 'image';
  category: 'fanart' | 'original' | 'other';
}

export interface GalleryVideo {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  duration: number; // 秒
  type: 'video';
  category: 'fanart' | 'original' | 'other';
}

export interface GalleryAnimation {
  id: string;
  title: string;
  description?: string;
  imageUrl: string; // WebPアニメーション（サムネイル用）
  videoUrl: string; // MP4動画（詳細画面用）
  width: number;
  height: number;
  type: 'animation';
  category: 'fanart' | 'original' | 'other';
}

export type GalleryItem = GalleryImage | GalleryVideo | GalleryAnimation; 