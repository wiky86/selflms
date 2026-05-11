import { Notice } from "@/types";
import { Badge } from "../common/Badge";
import { CTAButton } from "../common/CTAButton";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NoticeCardProps {
  notice: Notice;
}

export function NoticeCard({ notice }: NoticeCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "중요": return "danger";
      case "테스트": return "warning";
      case "과제": return "primary";
      default: return "default";
    }
  };

  return (
    <div className={`bg-white rounded-xl p-5 border transition-shadow hover:shadow-md ${notice.isImportant ? 'border-primary-200 ring-1 ring-primary-50' : 'border-secondary-100'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2">
          {notice.isImportant && <Badge variant="danger">중요</Badge>}
          <Badge variant={getCategoryColor(notice.category)}>{notice.category}</Badge>
        </div>
        <div className="flex items-center text-xs text-secondary-500">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          {notice.date}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-secondary-900 mb-2">{notice.title}</h3>
      <p className="text-sm text-secondary-600 mb-4 line-clamp-2">{notice.summary}</p>
      
      {notice.link && (
        <div className="mt-4 pt-4 border-t border-secondary-100">
          <Link href={notice.link.url} className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
            {notice.link.label}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
