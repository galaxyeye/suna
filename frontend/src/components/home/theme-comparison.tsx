'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { EnhancedDarkGrid, GeometricBorder, GeometricCorner, MinimalistCard } from './ui/enhanced-dark-grid';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Palette } from 'lucide-react';

export function ThemeComparison() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated background grid */}
      <EnhancedDarkGrid 
        pattern="cross"
        intensity={0.1}
        animated={true}
        className="fixed inset-0"
      />

      <div className="relative z-10 p-8 space-y-16">
        {/* Header with theme toggle */}
        <div className="text-center space-y-6 content-spotlight">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full stark-border">
              <Sun className="w-5 h-5 text-current" />
              <button 
                onClick={() => setTheme('light')}
                className={`px-3 py-1 rounded-full transition-all ${!isDark ? 'btn-stark' : 'btn-minimal'}`}
              >
                Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 rounded-full transition-all ${isDark ? 'btn-stark' : 'btn-minimal'}`}
              >
                Dark
              </button>
              <Moon className="w-5 h-5 text-current" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-stark">
            {isDark ? 'Dark Minimalism' : 'Light Minimalism'}
          </h1>
          <p className="text-xl text-minimal max-w-3xl mx-auto">
            Two sides of the same design philosophy. {isDark ? 'Pure white on pure black' : 'Pure black on pure white'}. 
            Geometric precision meets artistic expression in perfect harmony.
          </p>
        </div>

        {/* Visual Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-stark">Design Philosophy</h2>
            <div className="space-y-4 text-minimal">
              <p className="text-lg">
                <strong className="text-stark">Absolute Contrast:</strong> {isDark ? 'White elements pierce through pure black space' : 'Black elements anchor within pure white space'}, creating visual tension that guides attention.
              </p>
              <p className="text-lg">
                <strong className="text-stark">Geometric Boldness:</strong> Every line, every shape has purpose. No decoration for decoration's sake.
              </p>
              <p className="text-lg">
                <strong className="text-stark">Content Supremacy:</strong> The design serves the content, never competing with it.
              </p>
            </div>
          </div>

          <MinimalistCard variant="bold" className="p-8">
            <div className="space-y-6">
              <Palette className="w-12 h-12 text-stark" />
              <h3 className="text-2xl font-bold text-stark">
                {isDark ? 'Dark Mode' : 'Light Mode'} Principles
              </h3>
              <ul className="space-y-3 text-minimal">
                <li>• {isDark ? 'Background: Pure Black (0, 0, 0)' : 'Background: Pure White (255, 255, 255)'}</li>
                <li>• {isDark ? 'Text: Pure White (255, 255, 255)' : 'Text: Pure Black (0, 0, 0)'}</li>
                <li>• Geometric patterns at 2-10% opacity</li>
                <li>• No intermediate grays in primary elements</li>
                <li>• Sharp, confident borders and shadows</li>
              </ul>
            </div>
          </MinimalistCard>
        </div>

        {/* Pattern Showcase */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-center text-stark">Geometric Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Matrix Dots', pattern: 'bg-matrix-dots' },
              { name: 'Tech Grid', pattern: 'bg-tech-grid' },
              { name: 'Brutalist', pattern: 'bg-brutalist' },
              { name: 'Bauhaus', pattern: 'bg-bauhaus' },
              { name: 'Zen Circles', pattern: 'bg-zen-circles' },
              { name: 'Diagonal Lines', pattern: 'bg-diagonal-lines' }
            ].map((item, index) => (
              <MinimalistCard key={index} variant="minimal" className="h-48 p-4">
                <div className={`h-full rounded-lg ${item.pattern} opacity-100 flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-stark font-mono bg-background px-3 py-1 rounded stark-border">
                    {item.name}
                  </span>
                </div>
              </MinimalistCard>
            ))}
          </div>
        </div>

        {/* Interactive Elements Showcase */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-center text-stark">Interactive Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-stark">Button Styles</h3>
              <div className="space-y-4">
                <button className="btn-minimal px-8 py-4 text-lg">
                  Minimal Button
                </button>
                <button className="btn-stark px-8 py-4 text-lg">
                  Stark Button
                </button>
                <button className="stark-border bg-transparent px-8 py-4 text-lg hover:bg-current hover:text-background transition-all">
                  Custom Border
                </button>
              </div>
            </div>

            {/* Form Elements */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-stark">Form Elements</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Minimalist input"
                  className="w-full p-4 rounded-lg stark-border bg-background text-current placeholder-current/60 focus:outline-none focus:ring-2 focus:ring-current/50"
                />
                <textarea 
                  placeholder="Minimalist textarea"
                  rows={3}
                  className="w-full p-4 rounded-lg stark-border bg-background text-current placeholder-current/60 focus:outline-none focus:ring-2 focus:ring-current/50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-center text-stark">Typography System</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold text-stark">H1 Heading</h1>
                <p className="text-minimal">Primary headline with stark contrast</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-semibold text-stark">H2 Heading</h2>
                <p className="text-minimal">Section headers with strong presence</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-medium text-stark">H3 Heading</h3>
                <p className="text-minimal">Subsection clarity</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg text-stark">
                  Stark body text for emphasis and important information.
                </p>
                <p className="text-base text-minimal">
                  Minimal text for regular content, maintaining readability while reducing visual weight.
                </p>
                <p className="text-sm text-current/60 font-mono uppercase tracking-wider">
                  UTILITY TEXT FOR LABELS AND METADATA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Geometric Accents */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-center text-stark">Geometric Accents</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GeometricBorder>
              <MinimalistCard className="h-64 p-8">
                <div className="h-full flex flex-col justify-center items-center space-y-4">
                  <div className="w-20 h-20 border-2 border-current rotate-45"></div>
                  <h3 className="text-xl font-bold text-stark">Geometric Border</h3>
                  <p className="text-center text-minimal">Subtle frame enhancement</p>
                </div>
              </MinimalistCard>
            </GeometricBorder>

            <GeometricCorner>
              <MinimalistCard className="h-64 p-8">
                <div className="h-full flex flex-col justify-center items-center space-y-4">
                  <div className="w-16 h-16 bg-current rounded-full"></div>
                  <h3 className="text-xl font-bold text-stark">Corner Accent</h3>
                  <p className="text-center text-minimal">Directional emphasis</p>
                </div>
              </MinimalistCard>
            </GeometricCorner>
          </div>
        </div>

        {/* Final Statement */}
        <div className="text-center space-y-8 py-16 content-spotlight">
          <blockquote className="text-4xl font-light italic text-stark max-w-4xl mx-auto">
            "In the tension between {isDark ? 'black and white' : 'white and black'}, 
            we find not emptiness, but infinite possibility."
          </blockquote>
          <cite className="text-current/60 text-sm uppercase tracking-wider">
            — Minimalist Design Manifesto
          </cite>
          
          <div className="pt-8">
            <Button 
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="btn-stark text-lg px-8 py-4"
            >
              Experience {isDark ? 'Light' : 'Dark'} Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
