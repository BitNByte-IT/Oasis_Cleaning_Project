import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  /** width in pixels; height auto */
  size?: number;
  /** if true, do not wrap in a Link (useful inside footer when needed) */
  unlinked?: boolean;
}

/**
 * Brand logo. The supplied asset already contains the wordmark
 * ("OASIS / CLEANING / OF AUSTIN LLC") + the teardrop palm-tree mark,
 * so we render it as a single image to stay 1:1 with the design.
 */
export default function Logo({ className = '', size = 160, unlinked = false }: LogoProps) {
  const img = (
    <Image
      src="/images/logo.jpeg"
      alt="Oasis Cleaning of Austin LLC"
      width={size}
      height={size}
      priority
      className="h-auto w-auto object-contain"
      style={{ maxWidth: size }}
    />
  );

  if (unlinked) {
    return <div className={className}>{img}</div>;
  }

  return (
    <Link href="/" aria-label="Oasis Cleaning of Austin – Home" className={className}>
      {img}
    </Link>
  );
}
