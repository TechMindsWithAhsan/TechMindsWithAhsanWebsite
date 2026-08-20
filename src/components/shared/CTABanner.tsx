import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#111111] to-[#0A0A0A] border-t border-gray-800 text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Let&apos;s discuss how we can leverage technology and digital strategy to accelerate your growth.
        </p>
        <Link href="/contact" className="inline-block px-8 py-4 bg-[#0EA5E9] text-white rounded-xl font-bold hover:bg-[#0284c7] transition-colors shadow-[0_0_20px_rgba(14,165,233,0.3)]">
          Start a Conversation
        </Link>
      </div>
    </section>
  );
}
