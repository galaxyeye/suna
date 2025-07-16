import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input/60 dark:border-input/80 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        // Enhanced focus and hover states for better visibility in both modes
        'dark:focus-visible:border-white/60 dark:focus-visible:ring-white/30',
        'focus-visible:border-black/80 focus-visible:ring-black/20',
        'dark:hover:border-white/40 hover:border-black/60',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
