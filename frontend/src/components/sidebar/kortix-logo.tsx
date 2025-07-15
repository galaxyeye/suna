'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface PlatonLogoProps {
  size?: number;
}
export function PlatonLogo({ size = 24 }: PlatonLogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mount, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Image
        src="/platon-logo.svg"
        alt="Platon AI Team"
        width={size}
        height={size}
        className={`${mounted && theme === 'dark' ? 'invert' : ''} flex-shrink-0`}
      />
  );
}
