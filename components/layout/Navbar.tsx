"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import StaticLogo from "./StaticLogo";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // 배경색 투명도 변환
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 23, 42, 0)", "rgba(255, 255, 255, 0.95)"]
  );

  // 블러 효과 변환
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  // 그림자 효과 변환
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 transparent", "0 4px 6px -1px rgba(0, 0, 0, 0.1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="fixed w-full z-50"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        boxShadow
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link 
                href="/" 
                className={`flex items-center space-x-2 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                <StaticLogo className="w-8 h-8" />
                <span className="text-xl font-bold">페어링 BOOK</span>
              </Link>
            </motion.div>
            <div className="hidden sm:flex items-center ml-10">
              {[
                { href: "/books", text: "독서 이야기" },
                { href: "/reviews", text: "독서 토론" },
                { href: "/community", text: "페어링 친구" }
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="mx-4"
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isScrolled
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="프로필"
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-white"
                    />
                  )}
                  <span className={`ml-2 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}>
                    {session.user?.name}
                  </span>
                </div>
                <form action="/api/auth/signout" method="post">
                  <button
                    type="submit"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isScrolled
                        ? "text-gray-900 hover:text-gray-700"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    로그아웃
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-900 hover:text-gray-700"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  로그인
                </Link>
                <Link
                  href="/register"
                  className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isScrolled
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  회원가입
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
} 