import Link from 'next/link';
import { profileData } from '@/data/profile';

// X (Twitter) アイコン
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Pixiv アイコン（水色の円に白文字のp）
const PixivIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#0096FA"/>
    <path d="M9 6h4c2.76 0 5 2.24 5 5s-2.24 5-5 5h-2v4h-2V6zm2 2v6h2c1.66 0 3-1.34 3-3s-1.34-3-3-3h-2z" fill="white"/>
  </svg>
);

// GitHub アイコン
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// ブログ アイコン（globe with meridians emoji風）
const BlogIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    {/* 緯線（横線） */}
    <path d="M2 12h20"/>
    <path d="M5 8h14"/>
    <path d="M5 16h14"/>
    {/* 経線（縦線） */}
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  linkType?: 'social' | 'webdev';
}

export default function SocialLinks({ 
  className = "flex justify-center gap-4 mb-8",
  iconSize = "w-6 h-6",
  linkType = 'social'
}: SocialLinksProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'x':
        return <XIcon className={iconSize} />;
      case 'pixiv':
        return <PixivIcon className={iconSize} />;
      case 'github':
        return <GitHubIcon className={iconSize} />;
      case 'blog':
        return <BlogIcon className={iconSize} />;
      default:
        return null;
    }
  };

  const links = linkType === 'social' ? profileData.socialLinks : profileData.webDevLinks;

  return (
    <div className={className}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-400 ${link.color} transition-colors duration-300 flex items-center justify-center p-2 rounded-lg hover:bg-white/10`}
          aria-label={link.name}
        >
          {getIcon(link.icon)}
        </Link>
      ))}
    </div>
  );
}