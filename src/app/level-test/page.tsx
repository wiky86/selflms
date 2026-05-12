"use client";

import { useState, useEffect } from "react";
import { getLevelTests } from "@/lib/db/levelTests";
import { LevelTest } from "@/types";
import { TestCard } from "@/components/cards/TestCard";
import { PageTitle, SectionTitle } from "@/components/common/Titles";

export default function LevelTestPage() {
  const [levelTests, setLevelTests] = useState<LevelTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getLevelTests();
      setLevelTests(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="space-y-10"><PageTitle>Level Test</PageTitle><div className="py-20 text-center text-secondary-500">데이터를 불러오는 중입니다...</div></div>;
  }

  const activeTests = levelTests.filter(t => t.status === "진행 중");
  const upcomingTests = levelTests.filter(t => t.status === "예정");
  const pastTests = levelTests.filter(t => t.status === "종료");

  return (
    <div className="space-y-10">
      <PageTitle>Level Test</PageTitle>
      
      <section>
        <SectionTitle>응시 가능한 테스트</SectionTitle>
        {activeTests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <p className="text-secondary-500 bg-secondary-50 p-4 rounded-lg text-sm">현재 응시 가능한 테스트가 없습니다.</p>
        )}
      </section>

      <section>
        <SectionTitle>예정된 테스트</SectionTitle>
        {upcomingTests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcomingTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <p className="text-secondary-500 bg-secondary-50 p-4 rounded-lg text-sm">예정된 테스트가 없습니다.</p>
        )}
      </section>

      <section>
        <SectionTitle>종료된 테스트</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pastTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </section>
    </div>
  );
}
