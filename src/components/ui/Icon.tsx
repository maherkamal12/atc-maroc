import {
  Activity,
  AirVent,
  ArrowDownToLine,
  BatteryCharging,
  Boxes,
  CircuitBoard,
  Columns3,
  CookingPot,
  Cpu,
  DoorOpen,
  Droplets,
  Fan,
  Flame,
  Gauge,
  GitBranch,
  Grid3x3,
  Layers,
  LayoutDashboard,
  LayoutPanelTop,
  Leaf,
  Lightbulb,
  MonitorSmartphone,
  Paintbrush,
  Refrigerator,
  Ruler,
  Search,
  Settings,
  ShowerHead,
  SlidersHorizontal,
  Sun,
  SunMedium,
  ThermometerSun,
  UtensilsCrossed,
  Waves,
  Wind,
  Wrench,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Explicit icon registry — keeps the bundle small (no barrel re-export)
 * while letting content files reference icons by name.
 */
const registry: Record<string, LucideIcon> = {
  Activity,
  AirVent,
  ArrowDownToLine,
  BatteryCharging,
  Boxes,
  CircuitBoard,
  Columns3,
  CookingPot,
  Cpu,
  DoorOpen,
  Droplets,
  Fan,
  Flame,
  Gauge,
  GitBranch,
  Grid3x3,
  Layers,
  LayoutDashboard,
  LayoutPanelTop,
  Leaf,
  Lightbulb,
  MonitorSmartphone,
  Paintbrush,
  Refrigerator,
  Ruler,
  Search,
  Settings,
  ShowerHead,
  SlidersHorizontal,
  Sun,
  SunMedium,
  ThermometerSun,
  UtensilsCrossed,
  Waves,
  Wind,
  Wrench,
  ShieldCheck,
  Zap,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.9,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Zap;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/** Tone → tailwind class bundles for service/category accents. */
export const tones = {
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    ring: 'ring-amber-200',
    solid: 'bg-amber-500',
    grad: 'from-amber-500 to-amber-600',
    soft: 'from-amber-50 to-white',
  },
  sky: {
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    ring: 'ring-sky-200',
    solid: 'bg-sky-500',
    grad: 'from-sky-500 to-sky-600',
    soft: 'from-sky-50 to-white',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    ring: 'ring-orange-200',
    solid: 'bg-orange-500',
    grad: 'from-orange-500 to-red-500',
    soft: 'from-orange-50 to-white',
  },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    ring: 'ring-violet-200',
    solid: 'bg-violet-500',
    grad: 'from-violet-500 to-indigo-600',
    soft: 'from-violet-50 to-white',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    ring: 'ring-emerald-200',
    solid: 'bg-emerald-500',
    grad: 'from-emerald-500 to-teal-600',
    soft: 'from-emerald-50 to-white',
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    ring: 'ring-rose-200',
    solid: 'bg-rose-500',
    grad: 'from-rose-500 to-pink-600',
    soft: 'from-rose-50 to-white',
  },
} as const;

export type Tone = keyof typeof tones;
