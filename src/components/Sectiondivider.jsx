// SectionDivider — drop between any two sections for visual separation
// Usage: <SectionDivider />  or  <SectionDivider variant="dots" />
// Variants: "line" | "dots" | "gradient" | "wave" | "slash"

export default function SectionDivider({ variant = 'line' }) {

  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center py-10 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500">
        <div className="flex items-center gap-5">
          <span className="w-40 h-[3px] rounded-full bg-green-200 dark:bg-green-900" />
          <span className="w-5 h-5 rounded-full bg-green-200 dark:bg-green-900 shadow-lg shadow-green-200/50" />
          <span className="w-40 h-[3px] rounded-full bg-green-200 dark:bg-green-900" />
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className="py-8 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[3px] rounded-full bg-gradient-to-r from-transparent via-green-200 dark:via-green-900 to-transparent" />
        </div>
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className="bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden leading-none py-4">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0 30 C240 5 480 55 720 30 C960 5 1200 55 1440 30"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className="stroke-green-200 dark:stroke-green-900"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'slash') {
    return (
      <div className="flex items-center justify-center gap-6 py-10 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500">
        <div className="flex-1 h-[3px] rounded-full bg-green-200 dark:bg-green-900" />
        <span className="text-green-200 dark:text-green-900 text-4xl font-black select-none leading-none">/</span>
        <div className="flex-1 h-[3px] rounded-full bg-green-200 dark:bg-green-900" />
      </div>
    );
  }

  // Default: "line" — single uniform light green
  return (
    <div className="py-8 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[3px] rounded-full bg-green-200 dark:bg-green-900" />
      </div>
    </div>
  );
}