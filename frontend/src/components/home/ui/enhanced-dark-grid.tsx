'use client';

import { cn } from '@/lib/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface EnhancedDarkGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  intensity?: number; // 0-1, controls the boldness of the grid
  pattern?: 'dots' | 'lines' | 'cross' | 'bold' | 'diagonal';
  animated?: boolean;
  className?: string;
}

export const EnhancedDarkGrid: React.FC<EnhancedDarkGridProps> = ({
  squareSize = 2,
  gridGap = 20,
  intensity = 0.1,
  pattern = 'cross',
  animated = true,
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animateGrid = useCallback(() => {
    if (!animated || !isDark || !containerRef.current) return;

    const grid = containerRef.current;
    const currentTime = Date.now();
    
    // Subtle animation effect for dark mode
    const opacity = 0.5 + Math.sin(currentTime * 0.001) * 0.3;
    grid.style.opacity = opacity.toString();

    animationRef.current = requestAnimationFrame(animateGrid);
  }, [animated, isDark]);

  useEffect(() => {
    if (animated && isDark) {
      animationRef.current = requestAnimationFrame(animateGrid);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, isDark, animateGrid]);

  if (!mounted) return null;

  const getPatternClass = () => {
    if (!isDark) return '';
    
    switch (pattern) {
      case 'dots':
        return 'bg-minimal-dots';
      case 'lines':
        return 'bg-minimal-lines';
      case 'cross':
        return 'bg-minimal-cross';
      case 'bold':
        return 'bg-bold-grid';
      case 'diagonal':
        return 'bg-diagonal-lines';
      default:
        return 'bg-minimal-cross';
    }
  };

  const intensityStyle = isDark ? {
    filter: `opacity(${intensity})`,
  } : {};

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none',
        isDark && getPatternClass(),
        className
      )}
      style={intensityStyle}
      {...props}
    />
  );
};

// Geometric accent components for dark mode
export const GeometricBorder: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div className={cn(
      'relative',
      theme === 'dark' && 'geometric-border',
      className
    )}>
      {children}
    </div>
  );
};

export const GeometricCorner: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div className={cn(
      'relative',
      theme === 'dark' && 'geometric-corner',
      className
    )}>
      {children}
    </div>
  );
};

// Bold geometric shapes for dark mode
export const MinimalistCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bold' | 'minimal';
}> = ({ children, className, variant = 'default' }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={className}>{children}</div>;

  const darkModeClasses = theme === 'dark' ? {
    default: 'bg-card border-border',
    bold: 'bg-black border-white border-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]',
    minimal: 'bg-transparent border-white/20 border'
  } : {};

  return (
    <div className={cn(
      'rounded-lg transition-all duration-200',
      theme === 'dark' ? darkModeClasses[variant] : 'bg-card border border-border',
      className
    )}>
      {children}
    </div>
  );
}; 