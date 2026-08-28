"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiStar,
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
} from "react-icons/hi2";

const testimonials = [
  {
    quote:
      "Every meeting felt like a masterclass in tech, and every delivery like magic. We brought the dream, they brought the code — now our app is profitable and successful in both international and domestic markets.",
    name: "Rauff Ahmed",
    role: "Client",
    company: "Mobile App & Backend Development",
  },
  {
    quote:
      "I was blown away by their unique approach to digital branding. Their content isn't just attractive — it connects. Their human-first, AI-powered strategies helped our brand go from invisible to irresistible.",
    name: "Abdul Hameed's Furniture",
    role: "Client",
    company: "Digital Branding",
  },
  {
    quote:
      "Their approach was not just about coding — it was about understanding the heart of the brand and building technology that speaks to people, not just machines. Every line of code feels like a step toward business growth.",
    name: "New Gen Fashion",
    role: "Client",
    company: "E-Commerce & Brand Development",
  },
  {
    quote:
      "Unbelievable results achieved by TechMindsWithAhsan, helping our team scale through their services in a small period of time. High level of expertise, skills, and strategic analysis.",
    name: "Occasion Odyssey",
    role: "Client",
    company: "Events Management & Catering, Karachi",
  },
];

const YOUTUBE_VIDEO_ID = "uP23Eu2PPh0";
const YOUTUBE_VIDEO_URL = `https://www.youtube.com/shorts/${YOUTUBE_VIDEO_ID}`;
const MAXRES_THUMBNAIL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const HQ_THUMBNAIL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [thumbnailSrc, setThumbnailSrc] = useState(MAXRES_THUMBNAIL);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const sendYTCommand = useCallback(
    (command: string) => {
      videoRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: "" }),
        "https://www.youtube.com",
      );
    },
    [],
  );

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    if (videoMuted) {
      userInteractedRef.current = true;
      sendYTCommand("unMute");
      sendYTCommand("playVideo");
      setVideoMuted(false);
    } else {
      sendYTCommand("mute");
      setVideoMuted(true);
    }
  }, [videoMuted, sendYTCommand]);

  const loadVideo = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleThumbnailError = useCallback(() => {
    setThumbnailSrc((current) =>
      current === MAXRES_THUMBNAIL ? HQ_THUMBNAIL : current,
    );
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  const embedSrc = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : "https://tech-minds-with-ahsan-website.vercel.app"}&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1&rel=0&playsinline=1`;

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-[#F59E0B] font-semibold tracking-wider text-sm uppercase mb-3">
            Client Stories
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Trusted by Founders and Businesses
          </h2>
        </div>

        {/* Video Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-[#111111] border border-gray-800 rounded-3xl overflow-hidden">
            <div className="relative aspect-[9/16] sm:aspect-video max-h-[500px] mx-auto w-full max-w-[320px] sm:max-w-full">
              {videoLoaded ? (
                <iframe
                  ref={videoRef}
                  src={embedSrc}
                  title="Arif testimonial video"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; enablejsapi"
                />
              ) : (
                <button
                  onClick={loadVideo}
                  className="absolute inset-0 w-full h-full"
                  aria-label="Play testimonial video"
                >
                  <Image
                    src={thumbnailSrc}
                    alt="Arif testimonial video thumbnail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 320px, 100%"
                    priority
                    onError={handleThumbnailError}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                      <HiPlay className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </button>
              )}

              {/* Click-through: Watch on YouTube (top-left, always visible) */}
              <a
                href={YOUTUBE_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4 text-red-500 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white" />
                </svg>
                Watch on YouTube
              </a>

              {/* Play / Unmute overlay — only shown after iframe is mounted */}
              {videoLoaded && (
                <button
                  onClick={toggleMute}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group z-10"
                  aria-label={videoMuted ? "Unmute video" : "Mute video"}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      {videoMuted ? (
                        <HiPlay className="w-8 h-8 text-white ml-1" />
                      ) : (
                        <svg
                          className="w-8 h-8 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18.01,19.86 21,16.28 21,12C21,7.72 18.01,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16.02C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {videoMuted ? "Tap to unmute" : "Tap to mute"}
                    </span>
                  </div>
                </button>
              )}
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-400 text-sm md:text-base italic">
                Arif, Owner of Beta Book Publishing, shares his experience
                working with TechMindsWithAhsan on his website build.
              </p>
              <div className="mt-3">
                <h4 className="text-lg font-bold text-white">Arif</h4>
                <p className="text-[#0EA5E9]">Owner, Beta Book Publishing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Testimonials Slider */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="w-6 h-6 text-[#F59E0B]" />
                  ))}
                </div>

                <p className="text-xl md:text-3xl text-gray-300 italic mb-10 leading-relaxed font-light">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                <div>
                  <h4 className="text-lg font-bold text-white">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-[#0EA5E9]">
                    {testimonials[current].role},{" "}
                    {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors z-10"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors z-10"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className="p-2 -m-2 flex items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#0EA5E9]" : "w-2 h-2 bg-gray-700"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
