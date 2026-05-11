import { JobInfo } from "@/types";
import { Badge } from "../common/Badge";
import { CTAButton } from "../common/CTAButton";
import { Calendar, Building2, Briefcase } from "lucide-react";

export function JobCard({ job }: { job: JobInfo }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-secondary-100 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <Badge variant="outline">{job.type}</Badge>
        <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
          마감: {job.deadline}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-secondary-900 mb-2 line-clamp-2">{job.title}</h3>
      
      <div className="space-y-2 mb-4 text-sm text-secondary-600">
        {job.company && (
          <div className="flex items-center">
            <Building2 className="w-4 h-4 mr-2 text-secondary-400" />
            {job.company}
          </div>
        )}
        {job.jobRole && (
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-secondary-400" />
            {job.jobRole}
          </div>
        )}
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.map((skill, index) => (
            <span key={index} className="px-2 py-0.5 bg-secondary-50 text-secondary-600 text-xs rounded">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="bg-primary-50 p-3 rounded-lg text-sm text-primary-800 mb-5 mt-auto">
        <span className="font-semibold block mb-1">운영진 코멘트:</span>
        {job.comment}
      </div>
      
      <CTAButton href={job.url} external variant="primary" className="w-full">
        상세 보기
      </CTAButton>
    </div>
  );
}
