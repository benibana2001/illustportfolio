import Image from "next/image";
import SocialLinks from '@/components/SocialLinks';
import { profileData } from '@/data/profile';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16">
      <div className="container mx-auto px-4 py-16">
        {/* アイコン */}
        <div className="flex justify-center mb-8">
          <div className={`relative ${profileData.avatarSettings.about.mobile} ${profileData.avatarSettings.about.desktop}`}>
            <Image
              src={profileData.avatar}
              alt="プロフィールアイコン"
              fill
              className="object-cover rounded-full border-4 border-white/20 shadow-lg"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center">
          {profileData.name}
        </h1>
        
        {/* SNSリンク */}
        <SocialLinks className="flex justify-center gap-4 mb-8" />
        
        {/* イラスト制作について */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-200">イラスト制作</h2>
          {profileData.introduction.about.map((text, index) => (
            <p key={index} className={`text-base text-center text-gray-300 ${
              text === "" ? "mb-4" : "mb-2"
            } ${text.startsWith("•") ? "text-left" : ""}`}>
              {text}
            </p>
          ))}
        </div>

        {/* Web開発について */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-200">Web開発</h2>
          <div className="mb-8">
            {profileData.introduction.webDevelopment.map((text, index) => (
              <p key={index} className={`text-base text-center text-gray-300 ${
                text === "" ? "mb-4" : "mb-2"
              } ${text.startsWith("•") ? "text-left" : ""}`}>
                {text}
              </p>
            ))}
          </div>
          
          {/* Web開発関連のリンク */}
          <SocialLinks 
            linkType="webdev"
            className="flex justify-center gap-4 mb-8" 
          />
        </div>
      </div>
    </main>
  );
} 