"use client";

import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef } from 'react';

const categories = [
  "전체", "도서", "서평", "독서모임", "추천도서", "아침독서",
  "독서일기", "독서토론", "신간도서", "베스트셀러", "고전", "외국도서"
];

interface StoryHeaderProps {
  selectedCategory: string;
  onCategoryChange: Dispatch<SetStateAction<string>>;
}

export default function StoryHeader({ selectedCategory, onCategoryChange }: StoryHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const targetScroll = containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          페어링 BOOK 독서글과 다양한 이야기를 나눠보세요
        </h1>
        <p className="text-gray-600">
          책을 통해 나누는 특별한 순간들
        </p>
      </motion.div>

      {/* 검색바 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="해시태그, 사용자 또는 내용 검색..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </motion.div>

      {/* 카테고리 메뉴 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="relative flex items-center">
          <button
            className="absolute left-0 z-10 bg-gradient-to-r from-white via-white to-transparent pl-2 pr-4 h-full flex items-center justify-center"
            onClick={() => scroll('left')}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div
            ref={containerRef}
            className="flex-1 overflow-x-auto scrollbar-hide mx-8"
          >
            <div className="flex items-center justify-center space-x-2 min-w-max px-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <button
            className="absolute right-0 z-10 bg-gradient-to-l from-white via-white to-transparent pr-2 pl-4 h-full flex items-center justify-center"
            onClick={() => scroll('right')}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
} 