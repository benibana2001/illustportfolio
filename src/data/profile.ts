// プロフィール情報の一元管理
export const profileData = {
  // 基本情報
  name: "べにばな",
  avatar: "/images/avatar.png",

  // SNSリンク
  socialLinks: [
    {
      name: "X (Twitter)",
      url: "https://x.com/benibana2002",
      icon: "x",
      color: "hover:text-gray-300",
    },
    {
      name: "Pixiv",
      url: "https://www.pixiv.net/users/14819553",
      icon: "pixiv",
      color: "hover:text-blue-400",
    },
  ],

  // Web開発関連のリンク（Aboutページ専用）
  webDevLinks: [
    {
      name: "GitHub",
      url: "https://github.com/benibana2001", // 実際のGitHubアカウントに変更してください
      icon: "github",
      color: "hover:text-gray-300",
    },
    {
      name: "Blog",
      url: "https://beni.tokyo", // 実際のブログURLに変更してください
      icon: "blog",
      color: "hover:text-green-400",
    },
  ],

  // 紹介文（Home/Aboutページで使用）
  introduction: {
    // ホームページ用の簡潔な紹介
    home: [
      "個人でイラストを描いています。ファンアートが多いです。",
      "その他BlenderやLive2Dを使用した制作も行っています。",
    ],

    // Aboutページ用の詳細な紹介
    about: [
      "個人でイラストを描いています。ファンアートが多いです。",
      "その他BlenderやLive2Dを使用した制作も行っています。",
      "",
      "使用ツール： ClipStudioPaint, Blender, Live2D",
    ],

    // Web開発に関する紹介
    webDevelopment: ["イラスト制作と並行して、Web開発も行っております。"],
  },

  // アバター設定
  avatarSettings: {
    // ホームページでのアバターサイズ
    home: {
      mobile: "w-32 h-32",
      desktop: "md:w-40 md:h-40",
    },

    // Aboutページでのアバターサイズ
    about: {
      mobile: "w-32 h-32",
      desktop: "md:w-40 md:h-40",
    },
  },
};

export type ProfileData = typeof profileData;
