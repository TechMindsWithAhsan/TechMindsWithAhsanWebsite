"use client";

import { useState } from "react";
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
    <div className="flex h-16 min-w-[210px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
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
  const items = [...brands, ...brands];

  return (
    <section
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
      <div className="brand-rail-track flex w-max gap-4 px-6 motion-reduce:animate-none">
        {items.map((brand, index) => (
          <BrandMark key={`${brand.name}-${index}`} brand={brand} />
        ))}
      </div>
    </section>
  );
}
