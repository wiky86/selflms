import { LearningResource } from "@/types";
import { Badge } from "../common/Badge";
import { CTAButton } from "../common/CTAButton";
import { FileText, ExternalLink } from "lucide-react";

export function ResourceCard({ resource }: { resource: LearningResource }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-secondary-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <Badge variant="outline">{resource.week}</Badge>
        <Badge variant="default">{resource.type}</Badge>
      </div>
      
      <div className="mb-1 text-xs font-semibold text-primary-600">{resource.subject}</div>
      <h3 className="text-lg font-bold text-secondary-900 mb-2 flex items-center gap-2">
        <FileText className="w-5 h-5 text-secondary-400 shrink-0" />
        <span className="line-clamp-1">{resource.title}</span>
      </h3>
      
      <p className="text-sm text-secondary-600 mb-4 line-clamp-2 min-h-[40px]">{resource.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-secondary-500">난이도: {resource.level}</span>
        <CTAButton href={resource.url} external variant="secondary" className="px-3 py-1.5 text-sm">
          자료 열기
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </CTAButton>
      </div>
    </div>
  );
}
