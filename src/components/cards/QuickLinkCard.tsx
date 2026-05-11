import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuickLinkCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}

export function QuickLinkCard({ title, description, icon, href, external, className }: QuickLinkCardProps) {
  const content = (
    <div className={cn("group bg-white p-5 rounded-xl border border-secondary-100 hover:border-primary-300 hover:shadow-md transition-all h-full flex flex-col", className)}>
      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-sm text-secondary-500 mt-auto">{description}</p>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
