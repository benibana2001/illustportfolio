import { GalleryImage } from '@/types/gallery';
import galleryData from './gallery.json';

// 既存のJSONデータにtypeプロパティを追加
export const galleryImages: GalleryImage[] = galleryData.map((item: { id: string; title: string; imageUrl: string; width: number; height: number }) => ({
  ...item,
  type: 'image' as const
})); 