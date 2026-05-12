"use client";

import { useState } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { AlertCircle, Database } from "lucide-react";

import { notices as mockNotices } from "@/data/notices";
import { resources as mockResources } from "@/data/resources";
import { addNotice } from "@/lib/db/notices";
import { addResource } from "@/lib/db/resources";

export default function AdminDashboardPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  const handleSeedData = async () => {
    if (!confirm("주의: 로컬에 하드코딩된 mock 데이터를 Firebase에 복사합니다. 계속하시겠습니까?")) return;
    
    setIsSeeding(true);
    setSeedMessage("데이터 마이그레이션 중...");
    
    try {
      let noticeCount = 0;
      for (const notice of mockNotices) {
        const { id, ...data } = notice;
        await addNotice(data as any);
        noticeCount++;
      }

      let resourceCount = 0;
      for (const resource of mockResources) {
        const { id, ...data } = resource;
        await addResource(data as any);
        resourceCount++;
      }

      setSeedMessage(`완료! 공지 ${noticeCount}개, 자료 ${resourceCount}개가 Firestore에 추가되었습니다.`);
    } catch (error) {
      console.error("Seed error:", error);
      setSeedMessage("에러가 발생했습니다. 콘솔을 확인하세요.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle>대시보드</PageTitle>

      <section className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
        <SectionTitle>Firebase 데이터 관리</SectionTitle>
        <p className="text-secondary-600 mb-6 text-sm">
          현재 Firebase Firestore 데이터베이스가 연결되어 있습니다. 초기 설정 시 아래 버튼을 눌러
          기존 소스코드(`src/data`)에 있는 더미 데이터를 Firestore로 마이그레이션 할 수 있습니다.
        </p>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
          <h4 className="font-bold text-amber-900 mb-2 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            초기 데이터 마이그레이션
          </h4>
          <p className="text-amber-800 text-sm mb-4">
            이 버튼을 누르면 `src/data/notices.ts`와 `resources.ts`의 데이터가 Firestore에 새 문서로 삽입됩니다.
            여러 번 누르면 중복해서 데이터가 들어갈 수 있으니 주의하세요.
          </p>
          <CTAButton onClick={handleSeedData} variant="primary" className="w-auto flex items-center justify-center gap-2" disabled={isSeeding}>
            <Database className="w-4 h-4" />
            {isSeeding ? "처리 중..." : "Mock 데이터 Firestore로 복사하기"}
          </CTAButton>
          
          {seedMessage && (
            <p className="mt-3 text-sm font-bold text-primary-600">{seedMessage}</p>
          )}
        </div>
      </section>
    </div>
  );
}
