import { studies } from "@/data/studies";
import { StudyCard } from "@/components/cards/StudyCard";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { PlusCircle, UploadCloud, Info } from "lucide-react";

export default function StudyPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageTitle className="mb-0">그룹 스터디</PageTitle>
        <div className="flex gap-2">
          <CTAButton href="https://forms.google.com/study-apply" external variant="outline" className="text-sm">
            <PlusCircle className="w-4 h-4 mr-2" /> 스터디 개설
          </CTAButton>
          <CTAButton href="https://forms.google.com/study-verify" external variant="primary" className="text-sm">
            <UploadCloud className="w-4 h-4 mr-2" /> 활동 인증
          </CTAButton>
        </div>
      </div>
      
      <div className="bg-primary-50 p-5 rounded-xl border border-primary-100 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
        <div className="text-sm text-primary-900 space-y-2">
          <p className="font-bold">스터디 운영 가이드 및 우수 스터디 혜택</p>
          <ul className="list-disc list-inside space-y-1">
            <li>최소 3인 이상 구성 시 스터디 개설이 가능합니다.</li>
            <li>매주 1회 이상 오프라인 또는 온라인 모임을 진행하고 인증 사진을 제출해야 합니다.</li>
            <li>우수 스터디로 선정된 팀에게는 매월 도서 지원금 및 커피 쿠폰을 제공합니다.</li>
          </ul>
        </div>
      </div>

      <section>
        <SectionTitle>운영 중인 스터디</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      </section>
    </div>
  );
}
