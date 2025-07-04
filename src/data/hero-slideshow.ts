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
    enabled: true,
  },
  // 画像切り替えトランジションの設定
  transition: {
    // トランジション継続時間（ミリ秒）
    duration: 1000,
    // イージング関数
    easing: "ease-in-out",
  },
};

// スライドショーに表示する画像のIDリスト（順番に表示される）
export const heroSlideshowImageIds = [
  "til-2025-04-17-01", //shimamura
  "til-2025-05-03-01", //shimamura-gold
  "til-2024-09-04-01", //shimamura-gold
  "til-2025-05-30-01", //tier
  "til-2025-06-27-01", //miko
  "til-2025-04-19-01", //miko-tomb
  "til-2024-10-26-01", //miko-haloween
];
