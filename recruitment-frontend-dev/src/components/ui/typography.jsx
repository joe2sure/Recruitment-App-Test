import { cn } from '@/lib/utils';

// H1 Component
export function H1({ children, className, ...props }) {
  return (
    <h1 className={cn('text-4xl lg:text-6xl font-bold', className)} {...props}>
      {children}
    </h1>
  );
}

// H2 Component
export function H2({ children, className, ...props }) {
  return (
    <h2 className={cn('text-3xl lg:text-4xl font-bold ', className)} {...props}>
      {children}
    </h2>
  );
}

// H3 Component
export function H3({ children, className, ...props }) {
  return (
    <h3 className={cn('text-xl lg:text-2xl font-bold ', className)} {...props}>
      {children}
    </h3>
  );
}

// Emphasis Component
export function Emphasis({ children, className, ...props }) {
  return (
    <p className={cn('text-emphasis font-bold ', className)} {...props}>
      {children}
    </p>
  );
}

// Button Text Component (for consistent button typography)
export function ButtonText({ children, className, ...props }) {
  return (
    <span className={cn('text-button font-medium ', className)} {...props}>
      {children}
    </span>
  );
}

// Body/Paragraph Component
export function Body({ children, className, ...props }) {
  return (
    <p className={cn('text-body font-normal ', className)} {...props}>
      {children}
    </p>
  );
}

// Faint Text Component
export function Faint({ children, className, ...props }) {
  return (
    <p
      className={cn('text-faint font-normal text-gray-500 ', className)}
      {...props}
    >
      {children}
    </p>
  );
}
