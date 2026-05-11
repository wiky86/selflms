import { StudyGroup } from "@/types";
import { Badge } from "../common/Badge";
import { CTAButton } from "../common/CTAButton";
import { MapPin, Calendar, Users } from "lucide-react";

export function StudyCard({ study }: { study: StudyGroup }) {
  const isRecruiting = study.status === "모집 중";

  return (
    <div className="bg-white rounded-xl p-5 border border-secondary-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <Badge variant={isRecruiting ? "success" : "default"}>{study.status}</Badge>
        <div className="flex items-center text-xs text-secondary-500 bg-secondary-50 px-2 py-1 rounded-md">
          <Users className="w-3.5 h-3.5 mr-1" />
          {study.capacity}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-secondary-900 mb-1">{study.title}</h3>
      <div className="text-sm font-medium text-primary-600 mb-3">{study.topic}</div>
      <p className="text-sm text-secondary-600 mb-4 h-10 line-clamp-2">{study.description}</p>
      
      <div className="space-y-2 text-sm text-secondary-600 mb-5">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-secondary-400" />
          {study.schedule}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-secondary-400" />
          {study.place}
        </div>
      </div>
      
      {study.applyUrl && isRecruiting ? (
        <CTAButton href={study.applyUrl} external className="w-full">
          참여 신청하기
        </CTAButton>
      ) : (
        <button disabled className="w-full px-4 py-2 bg-secondary-100 text-secondary-400 rounded-lg font-medium text-sm cursor-not-allowed">
          신청 마감
        </button>
      )}
    </div>
  );
}
