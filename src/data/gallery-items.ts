import { GalleryItem } from '@/types/gallery';
import { galleryImages } from './gallery';
import { galleryVideos } from './videos';

// 画像と動画を統合
export const galleryItems: GalleryItem[] = [
  ...galleryImages,
  ...galleryVideos
];

// 画像のみを取得
export const getImages = () => galleryItems.filter(item => item.type === 'image');

// 動画のみを取得
export const getVideos = () => galleryItems.filter(item => item.type === 'video');

// 特定のアイテムを取得
export const getItemById = (id: string): GalleryItem | undefined => {
  return galleryItems.find(item => item.id === id);
}; 