export default function Ornament({ className = '', width = 'md' }) {
  const widths = { sm: 'w-12', md: 'w-20', lg: 'w-32' };
  const line = `block h-px bg-brand-gold/70 ${widths[width]}`;

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={line} />
      <span className="block h-2 w-2 rotate-45 bg-brand-gold" aria-hidden />
      <span className={line} />
    </div>
  );
}
