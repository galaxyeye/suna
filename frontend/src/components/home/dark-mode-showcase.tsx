'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { EnhancedDarkGrid, GeometricBorder, GeometricCorner, MinimalistCard } from './ui/enhanced-dark-grid';
import { Button } from '@/components/ui/button';

export function DarkModeShowcase() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background patterns showcase */}
      <div className="absolute inset-0 dark:bg-tech-grid opacity-20"></div>
      <EnhancedDarkGrid 
        pattern="bold" 
        intensity={0.1} 
        animated={true}
        className="absolute inset-0"
      />

      <div className="relative z-10 p-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 dark:content-spotlight">
          <h1 className="text-6xl font-bold dark:text-stark">
            Pure Black & White
          </h1>
          <p className="text-xl dark:text-minimal max-w-2xl mx-auto">
            Extreme minimalism meets bold geometric design. 
            Every element serves a purpose. Every contrast tells a story.
          </p>
          <Button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="dark:btn-stark"
          >
            {isDark ? 'Switch to Light' : 'Experience Dark Mode'}
          </Button>
        </div>

        {/* Geometric patterns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pattern demonstrations */}
          <MinimalistCard variant="bold" className="h-64 p-6">
            <div className="h-full bg-minimal-dots dark:opacity-100 rounded-lg flex items-center justify-center">
              <span className="dark:text-white font-mono">Matrix Dots</span>
            </div>
          </MinimalistCard>

          <MinimalistCard variant="minimal" className="h-64 p-6">
            <div className="h-full bg-tech-grid dark:opacity-100 rounded-lg flex items-center justify-center">
              <span className="dark:text-white font-mono">Tech Grid</span>
            </div>
          </MinimalistCard>

          <MinimalistCard variant="default" className="h-64 p-6">
            <div className="h-full bg-brutalist dark:opacity-100 rounded-lg flex items-center justify-center">
              <span className="dark:text-white font-mono">Brutalist</span>
            </div>
          </MinimalistCard>

          <GeometricBorder>
            <MinimalistCard className="h-64 p-6">
              <div className="h-full flex flex-col justify-center items-center space-y-4">
                <div className="w-16 h-16 border-2 dark:border-white border-gray-400 rotate-45"></div>
                <span className="dark:text-white font-mono">Geometric Border</span>
              </div>
            </MinimalistCard>
          </GeometricBorder>

          <GeometricCorner>
            <MinimalistCard className="h-64 p-6">
              <div className="h-full flex flex-col justify-center items-center space-y-4">
                <div className="w-12 h-12 bg-white dark:bg-white rounded-full"></div>
                <span className="dark:text-white font-mono">Corner Accent</span>
              </div>
            </MinimalistCard>
          </GeometricCorner>

          <MinimalistCard className="h-64 p-6 dark:minimal-shadow">
            <div className="h-full flex flex-col justify-center items-center space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-4 h-4 bg-gray-400 dark:bg-white"
                    style={{ opacity: Math.random() * 0.8 + 0.2 }}
                  ></div>
                ))}
              </div>
              <span className="dark:text-white font-mono">Minimal Shadow</span>
            </div>
          </MinimalistCard>
        </div>

        {/* Typography showcase */}
        <div className="space-y-8 text-center">
          <h2 className="text-4xl dark:text-stark">Typography in Darkness</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl dark:text-white font-bold">Bold Statements</h3>
              <p className="dark:text-stark text-lg">
                Pure white on pure black creates the ultimate contrast.
              </p>
              <p className="dark:text-minimal">
                Subtle grays provide hierarchy without compromising the aesthetic.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl dark:text-white font-light">Minimal Elegance</h3>
              <p className="dark:text-white/80">
                Every typographic choice is deliberate and purposeful.
              </p>
              <p className="dark:text-white/60 text-sm font-mono uppercase tracking-wider">
                Less is infinitely more
              </p>
            </div>
          </div>
        </div>

        {/* Interactive elements */}
        <div className="space-y-8">
          <h2 className="text-4xl text-center dark:text-stark">Interactive Elements</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="dark:btn-minimal px-6 py-3">
              Minimal Button
            </button>
            <button className="dark:btn-stark px-6 py-3">
              Stark Button
            </button>
            <button className="dark:stark-border bg-transparent text-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-200">
              Custom Border
            </button>
          </div>
          
          <div className="max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Minimalist input"
              className="w-full p-4 rounded-lg dark:bg-black dark:border-white dark:text-white dark:placeholder-white/60 border-2 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>

        {/* Philosophical statement */}
        <div className="text-center space-y-6 py-16 dark:content-spotlight">
          <blockquote className="text-3xl dark:text-white font-light italic max-w-4xl mx-auto">
            "In the realm of pure black and white, every pixel serves a purpose. 
            This is not minimalism—this is digital brutalism refined."
          </blockquote>
          <cite className="dark:text-white/60 text-sm uppercase tracking-wider">
            — Design Philosophy
          </cite>
        </div>
      </div>
    </div>
  );
} 