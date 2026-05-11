"use client";

import { useState } from "react";
import { resources } from "@/data/resources";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { PageTitle } from "@/components/common/Titles";
import { FilterTabs } from "@/components/common/FilterTabs";
import { EmptyState } from "@/components/common/EmptyState";

const WEEKS = ["전체", "1주차", "2주차", "3주차", "4주차"];
const TYPES = ["전체", "강의자료", "실습", "복습", "참고", "심화", "취업"];

export default function ResourcesPage() {
  const [activeWeek, setActiveWeek] = useState("전체");
  const [activeType, setActiveType] = useState("전체");

  const filteredResources = resources.filter(
    (resource) => 
      (activeWeek === "전체" || resource.week === activeWeek) &&
      (activeType === "전체" || resource.type === activeType)
  );

  return (
    <div className="space-y-6">
      <PageTitle>학습 자료실</PageTitle>
      
      <div className="space-y-4 bg-white p-4 rounded-xl border border-secondary-200">
        <div>
          <span className="text-sm font-bold text-secondary-700 mb-2 block">주차별</span>
          <FilterTabs tabs={WEEKS} activeTab={activeWeek} onChange={setActiveWeek} />
        </div>
        <div>
          <span className="text-sm font-bold text-secondary-700 mb-2 block">유형별</span>
          <FilterTabs tabs={TYPES} activeTab={activeType} onChange={setActiveType} />
        </div>
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState message="조건에 맞는 학습 자료가 없습니다." />
      )}
    </div>
  );
}
