import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | TechMindsWithAhsan',
  description: 'The requested TechMindsWithAhsan page could not be found.',
  openGraph: {
    title: 'Page Not Found | TechMindsWithAhsan',
    description: 'The requested TechMindsWithAhsan page could not be found.',
    url: 'https://techmindswithahsan.com/404',
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-[#0EA5E9] tracking-tighter mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Page Not Found</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 transition-colors shadow-lg shadow-[#0EA5E9]/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
