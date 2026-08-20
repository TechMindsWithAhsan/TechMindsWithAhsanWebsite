import Image from "next/image";
import {
  BrainCircuit,
  Crosshair,
  Globe,
  PlaySquare,
  Smartphone,
} from "lucide-react";

export type ProjectVisualKind =
  | "quranri"
  | "medical"
  | "gearlab"
  | "mobile"
  | "web";

interface ProjectVisualProps {
  kind: ProjectVisualKind;
  compact?: boolean;
  image?: string;
}

const visuals = {
  quranri: {
    label: "EDUCTECH",
    detail: "Verified Islamic AI",
    Icon: BrainCircuit,
    color: "from-sky-500/40 to-cyan-950",
  },
  medical: {
    label: "Medical Imaging AI",
    detail: "DenseNet-121 analysis",
    Icon: Crosshair,
    color: "from-emerald-500/40 to-emerald-950",
  },
  gearlab: {
    label: "GearLab",
    detail: "US gear channel",
    Icon: PlaySquare,
    color: "from-amber-500/40 to-amber-950",
  },
  mobile: {
    label: "EDUCTECH Mobile Apps",
    detail: "iOS and Android builds",
    Icon: Smartphone,
    color: "from-fuchsia-500/40 to-indigo-950",
  },
  web: {
    label: "Beta Book Publishing",
    detail: "Publishing services platform",
    Icon: Globe,
    color: "from-rose-500/40 to-orange-950",
  },
} satisfies Record<
  ProjectVisualKind,
  { label: string; detail: string; Icon: typeof BrainCircuit; color: string }
>;

export default function ProjectVisual({
  kind,
  compact = false,
  image,
}: ProjectVisualProps) {
  const visual = visuals[kind];
  const Icon = visual.Icon;
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${visual.color} ${compact ? "h-36" : "h-48"} border-b border-white/10`}
      aria-label={`${visual.label} project preview`}
    >
      {image && kind === "mobile" && (
        <div className="absolute left-1/2 top-1/2 h-[92%] aspect-[9/19.5] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.25rem] border-4 border-zinc-800 bg-black shadow-2xl">
          <Image
            src={image}
            alt={`${visual.label} screenshot`}
            fill
            sizes="180px"
            className="object-contain"
          />
        </div>
      )}
      {image && kind !== "mobile" && (
        <Image
          src={image}
          alt={`${visual.label} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-90"
        />
      )}
      <div
        className={`absolute inset-0 ${image ? "bg-gradient-to-t from-black/30 to-transparent" : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"}`}
      />
      {!image && kind !== "web" && (
        <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/15 bg-black/30 p-4 backdrop-blur-sm">
          <Icon className="mb-3 h-7 w-7 text-white/90" aria-hidden="true" />
          <p className="text-sm font-bold text-white">{visual.label}</p>
          <p className="mt-1 text-xs text-white/60">{visual.detail}</p>
        </div>
      )}
      {!image && kind === "web" && (
        <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/15 bg-black/30 p-4 backdrop-blur-sm">
          <p className="text-sm font-bold text-white">{visual.label}</p>
          <p className="mt-1 text-xs text-white/60">{visual.detail}</p>
        </div>
      )}
    </div>
  );
}
