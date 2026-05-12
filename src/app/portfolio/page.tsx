"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { QuickLinkCard } from "@/components/cards/QuickLinkCard";
import { CheckCircle2, FileText, LayoutTemplate, GitBranch, Link as LinkIcon } from "lucide-react";
import { getPortfolioLinks } from "@/lib/db/portfolio";
import { PortfolioLink } from "@/types";

export default function PortfolioPage() {
  const [links, setLinks] = useState<PortfolioLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPortfolioLinks();
      setLinks(data);
      setLoading(false);
    }
    load();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "LayoutTemplate": return <LayoutTemplate />;
      case "FileText": return <FileText />;
      case "GitBranch": return <GitBranch />;
      case "LinkIcon": return <LinkIcon />;
      default: return <LinkIcon />;
    }
  };

  return (
    <div className="space-y-10 pb-10">
      <PageTitle>포트폴리오 가이드</PageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-xl border border-secondary-200">
            <SectionTitle>1. 포트폴리오 기본 구성</SectionTitle>
            <ul className="space-y-3 text-secondary-700">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary-500 mr-2 shrink-0 mt-0.5" /> 자기소개 및 희망 직무 (명확한 방향성)</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary-500 mr-2 shrink-0 mt-0.5" /> 보유 기술 스택 (숙련도 및 사용 경험)</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary-500 mr-2 shrink-0 mt-0.5" /> 주요 프로젝트 경험 (2~3개 권장)</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary-500 mr-2 shrink-0 mt-0.5" /> GitHub 저장소 링크 및 배포된 서비스 링크</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary-500 mr-2 shrink-0 mt-0.5" /> 교육 수강 이력 및 자격증</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-xl border border-secondary-200">
            <SectionTitle>2. 프로젝트 정리 기준 (STAR 기법)</SectionTitle>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4 py-1">
                <strong className="text-secondary-900 block">Situation (상황)</strong>
                <span className="text-sm text-secondary-600">프로젝트를 시작하게 된 배경과 문제 정의</span>
              </div>
              <div className="border-l-4 border-primary-500 pl-4 py-1">
                <strong className="text-secondary-900 block">Task (과제)</strong>
                <span className="text-sm text-secondary-600">목표 달성을 위해 본인이 맡은 역할과 데이터/기술 스택</span>
              </div>
              <div className="border-l-4 border-primary-500 pl-4 py-1">
                <strong className="text-secondary-900 block">Action (행동)</strong>
                <span className="text-sm text-secondary-600">문제를 해결하기 위해 실제로 구현한 과정과 핵심 코드 리뷰</span>
              </div>
              <div className="border-l-4 border-primary-500 pl-4 py-1">
                <strong className="text-secondary-900 block">Result (결과)</strong>
                <span className="text-sm text-secondary-600">정량적 성과, 느낀 점, 트러블슈팅 경험 기록</span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-primary-50 p-6 rounded-xl border border-primary-100">
            <SectionTitle className="text-primary-900">3. 제출 전 체크리스트</SectionTitle>
            <div className="space-y-2 text-sm text-primary-800">
              <label className="flex items-start gap-2 cursor-pointer p-2 hover:bg-primary-100/50 rounded transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-primary-300 text-primary-600 focus:ring-primary-600" />
                <span>희망 직무가 명확히 적혀 있는가?</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer p-2 hover:bg-primary-100/50 rounded transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-primary-300 text-primary-600 focus:ring-primary-600" />
                <span>기술 스택이 프로젝트와 연결되어 있는가?</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer p-2 hover:bg-primary-100/50 rounded transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-primary-300 text-primary-600 focus:ring-primary-600" />
                <span>프로젝트별 본인 역할이 구체적인가?</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer p-2 hover:bg-primary-100/50 rounded transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-primary-300 text-primary-600 focus:ring-primary-600" />
                <span>GitHub 링크가 정상 접속되는가? (Private 해제)</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer p-2 hover:bg-primary-100/50 rounded transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-primary-300 text-primary-600 focus:ring-primary-600" />
                <span>README에 실행 방법이 포함되어 있는가?</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer p-2 hover:bg-primary-100/50 rounded transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-primary-300 text-primary-600 focus:ring-primary-600" />
                <span>문제 해결 과정과 회고가 포함되어 있는가?</span>
              </label>
            </div>
          </section>

          <section>
            <SectionTitle>4. 템플릿 링크</SectionTitle>
            {loading ? (
              <div className="text-center text-secondary-500 py-10">데이터를 불러오는 중입니다...</div>
            ) : links.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {links.map((link) => (
                  <QuickLinkCard 
                    key={link.id}
                    href={link.url} 
                    external={link.isExternal}
                    title={link.title} 
                    description={link.description}
                    icon={getIconComponent(link.icon)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-secondary-500 bg-secondary-50 p-4 rounded-lg text-sm">등록된 템플릿 링크가 없습니다.</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
