"use client";

import { useState, useEffect } from "react";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { PageTitle } from "@/components/common/Titles";
import { FilterTabs } from "@/components/common/FilterTabs";
import { EmptyState } from "@/components/common/EmptyState";
import { getNotices } from "@/lib/db/notices";
import { Notice } from "@/types";

const CATEGORIES = ["전체", "중요", "수업", "과제", "테스트", "취업", "행사"];

export default function NoticesPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getNotices();
      setNotices(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredNotices = notices.filter(
    (notice) => activeCategory === "전체" || 
                (activeCategory === "중요" && notice.isImportant) ||
                notice.category === activeCategory
  );

  return (
    <div className="space-y-6">
      <PageTitle>공지사항</PageTitle>
      
      <FilterTabs 
        tabs={CATEGORIES} 
        activeTab={activeCategory} 
        onChange={setActiveCategory} 
      />

      {loading ? (
        <div className="py-20 text-center text-secondary-500 font-medium">데이터를 불러오는 중입니다...</div>
      ) : filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      ) : (
        <EmptyState message="해당 카테고리의 공지사항이 없습니다." />
      )}
    </div>
  );
}
