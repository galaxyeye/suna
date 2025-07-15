import { Navbar } from '@/components/home/sections/navbar';
import { EnhancedDarkGrid } from '@/components/home/ui/enhanced-dark-grid';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full relative">
      {/* Enhanced geometric background for dark mode */}
      <EnhancedDarkGrid 
        pattern="cross" 
        intensity={0.15} 
        animated={true}
        className="fixed inset-0 z-0"
      />
      
      {/* Bold vertical accent lines */}
      <div className="block w-px h-full border-l border-border fixed top-0 left-6 z-10 dark:border-white/20 dark:shadow-[1px_0_10px_rgba(255,255,255,0.1)] light:border-black/20 light:shadow-[1px_0_10px_rgba(0,0,0,0.1)]"></div>
      <div className="block w-px h-full border-r border-border fixed top-0 right-6 z-10 dark:border-white/20 dark:shadow-[-1px_0_10px_rgba(255,255,255,0.1)] light:border-black/20 light:shadow-[-1px_0_10px_rgba(0,0,0,0.1)]"></div>
      
      {/* Additional geometric accent lines */}
      <div className="w-px h-full border-l fixed top-0 left-12 z-5 dark:border-white/10 light:border-black/10"></div>
      <div className="w-px h-full border-r fixed top-0 right-12 z-5 dark:border-white/10 light:border-black/10"></div>
      
      <Navbar />
      {children}
    </div>
  );
}
