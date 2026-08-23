import Link from 'next/link';

export default function AssessmentCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#0f172a]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Get Your Free AI Readiness Assessment
          </h2>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Discover how AI automation can transform your business operations, reduce costs, and accelerate growth. Book a free strategy call to get your personalized assessment.
          </p>

          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-bold rounded-lg transition-colors shadow-lg shadow-sky-900/50"
          >
            Book a Free Strategy Call
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            Join 500+ founders who have transformed their businesses
          </p>
        </div>
      </div>
    </section>
  );
}
