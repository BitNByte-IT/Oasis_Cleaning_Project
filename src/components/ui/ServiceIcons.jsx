import {
  Building2,
  Building,
  CalendarCheck2,
  HardHat,
  Home,
  Luggage,
  PackageOpen,
  Sparkles,
  SprayCan,
  ShieldCheck,
  Clock,
  Users,
} from 'lucide-react';

function HomeSparkle({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.4}>
      <path
        d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7H10v7H5a1 1 0 0 1-1-1v-9z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M18 4l.6 1.4L20 6l-1.4.6L18 8l-.6-1.4L16 6l1.4-.6L18 4z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M21 9l.4 1L22.4 10.4l-1 .4L21 12l-.4-1.2-1-.4 1-.4L21 9z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleStar({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.4}>
      <path d="M12 3l1.5 5L18 9.5l-4.5 1.5L12 16l-1.5-5L6 9.5 10.5 8 12 3z" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M18 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7L18 14z" stroke="currentColor" strokeLinejoin="round"/>
    </svg>
  );
}

export const serviceIcons = {
  'home-sparkle': HomeSparkle,
  spray: SprayCan,
  box: PackageOpen,
  luggage: Luggage,
  hardhat: HardHat,
  office: Building2,
  'calendar-check': CalendarCheck2,
  apartment: Building,
};

export const whyChooseIcons = {
  shield: ShieldCheck,
  'sparkle-plus': SparkleStar,
  clock: Clock,
  users: Users,
  'shield-check': ShieldCheck,
};

export { Sparkles, Home };
