import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { FiChevronDown } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact | TechMindsWithAhsan",
  alternates: { canonical: "/contact" },
  description:
    "Get in touch with Ahsan Hayat for AI Automation, Custom & Web Development, and Growth Strategy.",
  openGraph: {
    title: "Contact | TechMindsWithAhsan",
    description:
      "Start a conversation with Ahsan Hayat about AI automation, software development, or digital growth.",
    url: "https://techmindswithahsan.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#F59E0B] font-semibold tracking-wider text-sm uppercase">
            Get In Touch
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let Us Build Something Extraordinary Together
          </h1>
          <p className="mt-6 text-gray-400 text-lg">
            Whether you have a project in mind, need strategic advice, or want
            to explore how AI can transform your business, I am here to help.
            Fill out the form below or reach out directly.
          </p>
        </div>

        {/* Main Content: Two Columns */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 mb-24">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Everything you need to know about working together.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group bg-[#111111] rounded-2xl border border-gray-800 p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-white text-lg">
                What is your typical project timeline?
                <FiChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Most projects range from 2 to 8 weeks depending on complexity.
                MVPs and smaller applications typically take 2 to 4 weeks, while
                enterprise AI systems and complex SaaS platforms may require 6
                to 8 weeks or more. I provide a detailed timeline during our
                initial strategy call.
              </p>
            </details>

            <details className="group bg-[#111111] rounded-2xl border border-gray-800 p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-white text-lg">
                Do you work with international clients?
                <FiChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Absolutely. I serve clients across the USA, Pakistan, GCC, and
                globally. Communication is seamless through video calls,
                WhatsApp, and project management tools. Many of my most
                successful partnerships are with US-based startups and
                enterprises.
              </p>
            </details>

            <details className="group bg-[#111111] rounded-2xl border border-gray-800 p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-white text-lg">
                How do we get started?
                <FiChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Simply fill out the contact form or send me a message on
                WhatsApp. I will schedule a free 30-minute strategy call where
                we discuss your goals, challenges, and how I can help. From
                there, I provide a detailed proposal and roadmap.
              </p>
            </details>

            <details className="group bg-[#111111] rounded-2xl border border-gray-800 p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-white text-lg">
                What makes your approach different?
                <FiChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">
                I combine deep technical expertise in AI and full-stack
                engineering with a growth-driven business mindset. You work
                directly with me, the architect and engineer, not through layers
                of account managers. This means faster communication, better
                technical decisions, and solutions truly aligned with your
                business goals.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
