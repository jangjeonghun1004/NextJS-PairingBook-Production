"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// 카테고리 배열을 StoryHeader와 동일하게 정의
const categories = [
  "전체", "도서", "서평", "독서모임", "추천도서", "아침독서",
  "독서일기", "독서토론", "신간도서", "베스트셀러", "고전", "외국도서"
];

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  imageUrl: string;
  tags: string[];
  category: string;
}

// 더미 데이터 생성 함수
const generateDummyStories = (startIndex: number, count: number): Story[] => {
  // "전체"를 제외한 카테고리만 사용
  const availableCategories = categories.slice(1);
  
  return Array.from({ length: count }, (_, index) => {
    const categoryIndex = ((startIndex + index) * 17) % availableCategories.length;
    const category = availableCategories[categoryIndex];
    
    return {
      id: startIndex + index,
      title: `${category} 이야기 ${startIndex + index}`,
      content: `이것은 ${category}에 대한 ${startIndex + index}번째 이야기입니다. 책을 읽으면서 느낀 감상과 생각들을 기록합니다.`,
      author: `독서가${startIndex + index}`,
      date: new Date(2024, 0, 1 - index).toISOString().split('T')[0],
      likes: ((startIndex + index) * 13) % 200 + 1,
      comments: ((startIndex + index) * 7) % 50 + 1,
      imageUrl: "/images/empty-image.svg",
      tags: ["독서", category, `태그${startIndex + index}`],
      category: category
    };
  });
};

const MAX_PAGES = 5;

interface StoryListProps {
  selectedCategory: string;
}

export default function StoryList({ selectedCategory }: StoryListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // 초기 데이터 로드
  useEffect(() => {
    setStories(generateDummyStories(1, 6));
  }, []);

  useEffect(() => {
    const loadMoreStories = async () => {
      if (inView && !isLoading && hasMore) {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const nextPage = page + 1;
        
        if (nextPage > MAX_PAGES) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }

        const newStories = generateDummyStories(stories.length + 1, 6);
        setStories(prev => [...prev, ...newStories]);
        setPage(nextPage);
        setIsLoading(false);
      }
    };

    loadMoreStories();
  }, [inView, isLoading, page, stories.length, hasMore]);

  // 초기 로딩 상태
  if (stories.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // 카테고리에 따라 스토리 필터링
  const filteredStories = selectedCategory === "전체"
    ? stories
    : stories.filter(story => story.category === selectedCategory);

  // 필터링된 결과가 없을 때
  if (filteredStories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-lg text-gray-600">
          해당 카테고리의 독서 이야기가 아직 없습니다.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* 카드 헤더 */}
              <div className="flex items-center p-4 border-b">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/empty-image.svg"
                    alt={story.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-3">
                  <Link href={`/stories/${story.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                    {story.author}
                  </Link>
                  <p className="text-sm text-gray-500">{story.date}</p>
                </div>
              </div>

              {/* 카드 이미지 */}
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* 카드 컨텐츠 */}
              <div className="p-4">
                <Link href={`/stories/${story.id}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                  {story.title}
                </Link>
                <p className="mt-2 text-gray-600 line-clamp-3">{story.content}</p>
                
                {/* 태그 */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 좋아요 & 댓글 */}
                <div className="mt-4 flex items-center space-x-4 text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{story.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{story.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* 로딩 인디케이터 또는 종료 메시지 */}
      <div ref={ref} className="flex justify-center items-center py-8">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
            />
            <span className="text-gray-500">불러오는 중...</span>
          </div>
        ) : !hasMore ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-center"
          >
            <p className="text-lg font-medium">모든 독서 이야기를 불러왔습니다</p>
            <p className="text-sm mt-1">새로운 이야기가 올라오면 알려드릴게요!</p>
          </motion.div>
        ) : null}
      </div>
    </>
  );
} 