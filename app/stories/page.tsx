"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import StoryList from '@/components/stories/StoryList';
import StoryHeader from '@/components/stories/StoryHeader';

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <StoryHeader 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <StoryList selectedCategory={selectedCategory} />
        </motion.div>
      </div>
    </div>
  );
} 