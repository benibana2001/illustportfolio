import { GalleryImage } from '@/types/gallery';
import galleryData from './gallery.json';

// 既存のJSONデータにtypeプロパティを追加
export const galleryImages: GalleryImage[] = galleryData.map((item) => ({
  ...item,
  type: 'image' as const,
  category: item.category as 'fanart' | 'original' | 'other'
})); 