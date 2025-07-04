// HOMEページのメインスライドショー設定
export const heroSlideshowConfig = {
  // 自動切り替え間隔（ミリ秒）
  autoplaySpeed: 4000,
  // 自動再生を有効にするか
  autoplay: true,
  // 画像パンアニメーションの設定
  panAnimation: {
    // パンアニメーションの継続時間（ミリ秒）
    duration: 8000,
    // パンアニメーションを有効にするか
    enabled: true
  },
  // 画像切り替えトランジションの設定
  transition: {
    // トランジション継続時間（ミリ秒）
    duration: 1000,
    // イージング関数
    easing: 'ease-in-out'
  }
};

// スライドショーに表示する画像のIDリスト（順番に表示される）
export const heroSlideshowImageIds = [
  'til-2025-05-03-01',
  'til-2025-04-02-01',
  'til-2025-05-27-01',
  'til-2025-05-29-03',
  'til-2025-05-30-01',
  'til-2025-06-27-01'
];
