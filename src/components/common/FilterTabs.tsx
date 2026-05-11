import { cn } from "@/lib/utils";

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export function FilterTabs({ tabs, activeTab, onChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex overflow-x-auto hide-scrollbar gap-2 pb-2", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === tab
              ? "bg-primary-600 text-white"
              : "bg-white text-secondary-600 border border-secondary-200 hover:bg-secondary-50"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
