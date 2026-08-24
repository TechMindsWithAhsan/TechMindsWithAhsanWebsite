"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const brands = [
  {
    name: "EDUCTECH",
    assets: ["/images/eductech-logo.png"],
    accent: "text-sky-300",
  },
  {
    name: "GearLab",
    assets: ["/images/gearlab-logo.png"],
    accent: "text-amber-300",
  },
  {
    name: "Medical Diagnosis",
    assets: [],
    accent: "text-emerald-300",
  },
  {
    name: "Beta Book Publishing",
    assets: ["/images/beta-book-publishing-logo.png"],
    accent: "text-rose-300",
  },
];

function BrandMark({ brand }: { brand: (typeof brands)[number] }) {
  const [assetIndex, setAssetIndex] = useState(0);
  const hasAsset = assetIndex < brand.assets.length;

  return (
    <div className="flex h-16 min-w-[210px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex-shrink-0">
      {hasAsset ? (
        <div className="relative h-9 w-28 shrink-0">
          <Image
            src={brand.assets[assetIndex]}
            alt={`${brand.name} logo`}
            fill
            sizes="112px"
            className="object-contain"
            onError={() => {
              if (assetIndex + 1 < brand.assets.length) {
                setAssetIndex((current) => current + 1);
              } else {
                setAssetIndex(brand.assets.length);
              }
            }}
          />
        </div>
      ) : (
        <span className={`text-sm font-bold tracking-[0.18em] ${brand.accent}`}>
          {brand.name}
        </span>
      )}
    </div>
  );
}

export default function BrandLogoRail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const singleCopyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [singleCopyWidth, setSingleCopyWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const offsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  // Check prefers-reduced-motion OS/browser setting
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Measure container and single copy width with ResizeObserver
  useEffect(() => {
    const containerEl = containerRef.current;
    const singleCopyEl = singleCopyRef.current;

    if (!containerEl || !singleCopyEl) return;

    const observer = new ResizeObserver(() => {
      const cWidth = containerEl.offsetWidth;
      const sWidth = singleCopyEl.offsetWidth;
      if (cWidth > 0) setContainerWidth(cWidth);
      if (sWidth > 0) setSingleCopyWidth(sWidth);
    });

    observer.observe(containerEl);
    observer.observe(singleCopyEl);

    setContainerWidth(containerEl.offsetWidth);
    setSingleCopyWidth(singleCopyEl.offsetWidth);

    return () => observer.disconnect();
  }, []);

  // IntersectionObserver to pause animation loop when off-screen
  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(containerEl);
    return () => observer.disconnect();
  }, []);

  // Animation loop with requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion || singleCopyWidth <= 0) return;

    let animId: number;
    const speed = 35; // pixels per second

    const step = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Only advance position if visible, active, and not hovered
      if (!isHovered && isIntersecting && deltaTime < 0.2) {
        offsetRef.current += speed * deltaTime;
        if (offsetRef.current >= singleCopyWidth) {
          offsetRef.current %= singleCopyWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      lastTimeRef.current = null;
    };
  }, [singleCopyWidth, isHovered, isIntersecting, prefersReducedMotion]);

  // Calculate needed duplicate copies to comfortably exceed 2x container width
  const copyCount =
    singleCopyWidth > 0 && containerWidth > 0
      ? Math.max(2, Math.ceil((containerWidth * 2) / singleCopyWidth) + 1)
      : 3;

  if (prefersReducedMotion) {
    return (
      <section
        ref={containerRef}
        className="overflow-hidden border-y border-white/10 bg-[#0D0D0D] py-6"
        aria-label="Brands and products built by TechMindsWithAhsan"
      >
        <div className="container mx-auto mb-4 flex items-center justify-between px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Trusted product work
          </p>
          <span className="hidden text-xs text-zinc-600 sm:block">
            Selected client brands
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {brands.map((brand, index) => (
            <BrandMark key={`${brand.name}-${index}`} brand={brand} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="overflow-hidden border-y border-white/10 bg-[#0D0D0D] py-6"
      aria-label="Brands and products built by TechMindsWithAhsan"
    >
      <div className="container mx-auto mb-4 flex items-center justify-between px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Trusted product work
        </p>
        <span className="hidden text-xs text-zinc-600 sm:block">
          Selected client brands
        </span>
      </div>
      <div
        className="overflow-hidden px-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {/* First copy wrapper used for ResizeObserver measurement */}
          <div ref={singleCopyRef} className="flex gap-4 pr-4">
            {brands.map((brand, index) => (
              <BrandMark key={`brand-0-${brand.name}-${index}`} brand={brand} />
            ))}
          </div>

          {/* Subsequent duplicate copies */}
          {Array.from({ length: copyCount - 1 }).map((_, copyIndex) => (
            <div key={`copy-${copyIndex + 1}`} className="flex gap-4 pr-4">
              {brands.map((brand, index) => (
                <BrandMark
                  key={`brand-${copyIndex + 1}-${brand.name}-${index}`}
                  brand={brand}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
