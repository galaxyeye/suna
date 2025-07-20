import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        // 基础样式 - 增强背景对比度
        'dark:bg-black/40 bg-white/80 backdrop-blur-sm',
        'flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base transition-all duration-200 outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',

        // 默认border - 高对比度
        'border-2',
        'dark:border-white/30 border-black/25',
        'dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]',

        // Hover状态 - 更显目的高亮
        'dark:hover:border-white/50 hover:border-black/40',
        'dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_0_10px_rgba(0,0,0,0.1)]',
        'hover:scale-[1.01]',

        // Focus状态 - 强烈的高亮效果
        'focus-visible:border-4',
        'dark:focus-visible:border-blue-400/80 focus-visible:border-blue-600/80',
        'dark:focus-visible:shadow-[0_0_0_2px_rgba(59,130,246,0.4),0_0_20px_rgba(59,130,246,0.2)] focus-visible:shadow-[0_0_0_2px_rgba(37,99,235,0.4),0_0_20px_rgba(37,99,235,0.2)]',
        'focus-visible:scale-[1.02]',

        // 错误状态 - 高对比度红色
        'aria-invalid:border-3',
        'dark:aria-invalid:border-red-400/80 aria-invalid:border-red-600/80',
        'dark:aria-invalid:shadow-[0_0_0_2px_rgba(248,113,113,0.4)] aria-invalid:shadow-[0_0_0_2px_rgba(220,38,38,0.4)]',

        className,
      )}
      {...props}
    />
  );
}

export { Input };
