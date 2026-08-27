"use client";

import { useState } from "react";

// Upper bound on how long a submission may take. Guards against a hung
// request leaving the submit button stuck on "Sending Message..." forever
// (e.g. a backend that is slow to respond or never resolves).
const SUBMIT_TIMEOUT_MS = 20000;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budgetRange: "",
    projectType: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError("");

    if (
      formData.name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) ||
      formData.message.trim().length < 20
    ) {
      setError(
        "Enter a valid name, email, and a message of at least 20 characters.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          budgetRange: "",
          projectType: "",
          message: "",
          website: "",
        });
      } else {
        const result = (await response.json()) as { error?: string };
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (submissionError) {
      console.error("Error submitting form:", submissionError);
      if (submissionError instanceof Error && submissionError.name === "TimeoutError") {
        setError(
          "The request timed out. Our server may be busy — please try again shortly.",
        );
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 shadow-xl">
      {success && (
        <div className="mb-6 p-4 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] rounded-lg">
          Thank you! Your message has been sent successfully. I will get back to
          you shortly.
        </div>
      )}
      {error && (
        <div
          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field for bot prevention */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Company / Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
            placeholder="Your Company"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="projectType"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all appearance-none"
            >
              <option value="">Select Project Type</option>
              <option value="AI Automation">AI Automation</option>
              <option value="Custom & Web Development">
                Custom & Web Development
              </option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="SaaS Product">SaaS Product</option>
              <option value="Growth Marketing">Growth Marketing</option>
              <option value="SEO">SEO</option>
              <option value="Consulting">Consulting</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="budgetRange"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Budget Range
            </label>
            <select
              id="budgetRange"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all appearance-none"
            >
              <option value="">Select Budget Range</option>
              <option value="Under $2,000">Under $2,000</option>
              <option value="$2,000 to $5,000">$2,000 to $5,000</option>
              <option value="$5,000 to $10,000">$5,000 to $10,000</option>
              <option value="$10,000 to $25,000">$10,000 to $25,000</option>
              <option value="$25,000+">$25,000+</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all resize-none"
            placeholder="Tell me about your project, goals, and timeline..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
            isSubmitting
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 shadow-lg shadow-[#0EA5E9]/20"
          }`}
        >
          {isSubmitting ? "Sending Message..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
