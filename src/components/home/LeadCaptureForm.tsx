'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface LeadCaptureFormProps {
  source?: 'homepage' | 'blog' | 'footer';
}

export default function LeadCaptureForm({ source = 'homepage' }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, source }),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit your email.');
      }
      toast.success(result.message || 'Assessment request received.');
      setEmail('');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#0f172a]">
      <Toaster position="bottom-center" />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Get Your Free AI Readiness Assessment
          </h2>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Discover how AI automation can transform your business operations, reduce costs, and accelerate growth. Enter your email and receive a personalized assessment within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email address"
              required
              className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-bold rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center whitespace-nowrap"
            >
              {loading ? 'Submitting...' : 'Get My Free Assessment'}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}
          
          <p className="mt-6 text-sm text-gray-500">
            Join 500+ founders who have transformed their businesses
          </p>
        </div>
      </div>
    </section>
  );
}
