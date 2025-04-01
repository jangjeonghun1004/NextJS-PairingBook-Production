"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedLogo from '../layout/AnimatedLogo';
import { motion, AnimatePresence } from 'framer-motion';

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  star: string;
  rotation: number;
  moveX: number;
  moveY: number;
  duration: number;
  color: string;
}

const ParticleEffect = () => {
  const [particles, setParticles] = useState<StarParticle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stars = ['✦', '✧', '⋆', '✺'];
    const colors = [
      'rgba(255, 255, 255, 0.9)',  // bright white
      'rgba(255, 255, 255, 0.7)',  // white
      'rgba(255, 251, 235, 0.8)',  // warm white
      'rgba(199, 210, 254, 0.8)',  // indigo-200
      'rgba(224, 231, 255, 0.8)',  // indigo-100
    ];

    const generatedParticles = Array.from({ length: 50 }).map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 5,
      star: stars[Math.floor(Math.random() * stars.length)],
      rotation: Math.random() * 360,
      moveX: (Math.random() - 0.5) * 30,
      moveY: (Math.random() - 0.5) * 30,
      duration: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setParticles(generatedParticles);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute flex items-center justify-center"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: particle.size,
            color: particle.color
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
            rotate: [0, particle.rotation],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          {particle.star}
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedText = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  return (
    <span className="inline-block">
      <motion.span 
        className="inline-block"
        initial={{ y: 0, scale: 1, textShadow: "0 0 0px rgba(255,255,255,0)" }}
        animate={{ 
          y: [0, -8, 0],
          scale: [1, 1.1, 1],
          textShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 15px rgba(255,255,255,0.8)",
            "0 0 5px rgba(255,255,255,0.3)"
          ]
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.5, 1],
          ease: "easeInOut"
        }}
        onAnimationComplete={onAnimationComplete}
      >
        BOOK
      </motion.span>
    </span>
  );
};

const AnimatedSubtitle = ({ isVisible, onAnimationComplete }: { isVisible: boolean, onAnimationComplete: () => void }) => {
  const text = "책에서 시작된 운명적 만남";
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-center flex-wrap">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ 
              opacity: 0,
              x: -50,
              y: -20,
              rotate: Math.random() * 45
            }}
            animate={isVisible ? { 
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0
            } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.23, 1.64, 0.32, 1],
            }}
            onAnimationComplete={index === text.length - 1 ? onAnimationComplete : undefined}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default function HeroSection() {
  const [showContent, setShowContent] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleLogoAnimationComplete = () => {
    setShowLogo(false);
    setShowContent(true);
  };

  const handleBookAnimationComplete = () => {
    setShowSubtitle(true);
  };

  const handleSubtitleAnimationComplete = () => {
    setShowButtons(true);
  };

  return (
    <section className="h-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.5),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.7),transparent_30%,transparent_70%,rgba(15,23,42,0.7))]" />
        <ParticleEffect />
      </div>
      <div className="text-center px-4 relative z-10">
        <AnimatePresence mode="wait">
          {showLogo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex justify-center mb-8"
            >
              <div className="w-35 h-35">
                <AnimatedLogo onAnimationComplete={handleLogoAnimationComplete} />
              </div>
            </motion.div>
          )}
          {showContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ 
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.1
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl md:text-6xl">
                  페어링 <AnimatedText onAnimationComplete={handleBookAnimationComplete} />
                </h1>
                <div className="mt-3 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  <AnimatedSubtitle 
                    isVisible={showSubtitle} 
                    onAnimationComplete={handleSubtitleAnimationComplete}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={showButtons ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
              >
                <div className="rounded-md shadow">
                  <Link
                    href="/books"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-700 hover:bg-slate-600 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    시작 하기
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 