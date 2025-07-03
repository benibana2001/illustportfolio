'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="text-white font-bold text-xl">
            べにばな
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              ホーム
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/about' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/gallery' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
