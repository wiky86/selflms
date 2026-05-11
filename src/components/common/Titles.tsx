import { cn } from "@/lib/utils";

export function PageTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={cn("text-2xl md:text-3xl font-bold text-secondary-900 mb-6", className)}>
      {children}
    </h1>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-xl font-bold text-secondary-900 mb-4", className)}>
      {children}
    </h2>
  );
}
