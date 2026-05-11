import { LevelTest } from "@/types";
import { Badge } from "../common/Badge";
import { CTAButton } from "../common/CTAButton";
import { Clock, Info } from "lucide-react";

export function TestCard({ test }: { test: LevelTest }) {
  const isAvailable = test.status === "진행 중";

  return (
    <div className={`bg-white rounded-xl p-5 border ${isAvailable ? 'border-amber-200 ring-1 ring-amber-50 shadow-sm' : 'border-secondary-100'}`}>
      <div className="flex justify-between items-start mb-3">
        <Badge variant={isAvailable ? "warning" : "default"}>{test.status}</Badge>
        <span className="text-xs text-secondary-500 bg-secondary-50 px-2 py-1 rounded-md">대상: {test.target}</span>
      </div>
      
      <h3 className="text-xl font-bold text-secondary-900 mb-2">{test.title}</h3>
      <p className="text-sm text-secondary-600 mb-4">{test.description}</p>
      
      <div className="bg-secondary-50 rounded-lg p-3 mb-4 space-y-2 text-sm text-secondary-700">
        <div className="flex justify-between">
          <span className="font-medium">응시 기간</span>
          <span>{test.startDate} ~ {test.endDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">예상 소요 시간</span>
          <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-secondary-400"/> {test.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-secondary-100 pt-4 mt-2">
        <div className="flex items-center text-xs text-secondary-500">
          <Info className="w-3.5 h-3.5 mr-1" />
          결과: {test.resultNotice}
        </div>
        {test.testUrl && isAvailable && (
          <CTAButton href={test.testUrl} external variant="primary" className="py-2">
            응시하기
          </CTAButton>
        )}
      </div>
    </div>
  );
}
