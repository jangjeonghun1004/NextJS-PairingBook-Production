"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import StaticLogo from './StaticLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 홈페이지에서만 스크롤에 따른 스타일 변경
  const isTransparent = isHomePage && !isScrolled;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] // 부드러운 이징 함수 적용
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/85 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <StaticLogo className={`transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isTransparent ? 'text-white' : 'text-gray-900'
            }`} />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/stories" 
              className={`text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-600'
              }`}
            >
              독서 이야기
            </Link>
            <Link 
              href="/books" 
              className={`text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-600'
              }`}
            >
              도서 목록
            </Link>
            <Link 
              href="/community" 
              className={`text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-600'
              }`}
            >
              커뮤니티
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-600'
                }`}
              >
                프로필
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-600'
                  }`}
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 