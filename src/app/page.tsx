"use client";

import { useState, useEffect } from "react";
import { courseInfo } from "@/data/course";
import { levelTests } from "@/data/levelTests";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { QuickLinkCard } from "@/components/cards/QuickLinkCard";
import { SectionTitle } from "@/components/common/Titles";
import { FileText, CheckSquare, Users, Briefcase, BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";
import { CTAButton } from "@/components/common/CTAButton";
import { getNotices } from "@/lib/db/notices";
import { getLevelTests } from "@/lib/db/levelTests";
import { Notice, LevelTest } from "@/types";

export default function Home() {
  const [importantNotices, setImportantNotices] = useState<Notice[]>([]);
  const [upcomingTest, setUpcomingTest] = useState<LevelTest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [noticesData, testsData] = await Promise.all([
        getNotices(),
        getLevelTests()
      ]);
      setImportantNotices(noticesData.filter(n => n.isImportant).slice(0, 3));
      setUpcomingTest(testsData.find(t => t.status === "예정" || t.status === "진행 중") || null);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-10 text-white shadow-lg">
        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
          {courseInfo.currentWeek}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {courseInfo.title}
        </h1>
        <p className="text-primary-100 mb-8 max-w-2xl text-lg">
          {courseInfo.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <CTAButton href="/notices" variant="secondary">오늘의 공지 보기</CTAButton>
          <CTAButton href="/resources" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">학습 자료실</CTAButton>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Important Notices */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <SectionTitle className="mb-0 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-primary-500" />
                오늘의 중요 공지
              </SectionTitle>
              <Link href="/notices" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                전체 공지 보기 &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {importantNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <SectionTitle>빠른 링크</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <QuickLinkCard 
                href="https://forms.google.com/attendance" external
                title="출석 체크" description="매일 오전 9시 체크인"
                icon={<CheckSquare />}
              />
              <QuickLinkCard 
                href="/resources" 
                title="학습 자료실" description="강의 교안 및 실습 자료"
                icon={<FileText />}
              />
              <QuickLinkCard 
                href="/study" 
                title="스터디 신청" description="자율 스터디 모집 및 참여"
                icon={<Users />}
              />
              <QuickLinkCard 
                href="/level-test" 
                title="Level Test" description="주차별 진단 평가"
                icon={<CheckSquare />}
              />
              <QuickLinkCard 
                href="/jobs" 
                title="취업 정보" description="채용 공고 및 특강"
                icon={<Briefcase />}
              />
              <QuickLinkCard 
                href="/portfolio" 
                title="포트폴리오" description="작성 가이드 및 템플릿"
                icon={<BookOpen />}
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* This Week's Focus */}
          <section className="bg-white p-5 rounded-xl border border-secondary-200">
            <h3 className="font-bold text-secondary-900 mb-4 border-b border-secondary-100 pb-2">이번 주 학습 목표</h3>
            <ul className="space-y-3 text-sm text-secondary-700 list-disc list-inside">
              <li>Python 기초 문법 완벽 이해</li>
              <li>조건문과 반복문을 활용한 알고리즘 기초</li>
              <li>함수 정의 및 활용</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-secondary-100">
              <Link href="/resources" className="text-sm font-medium text-primary-600 hover:underline block text-center">
                추천 학습 자료 보기
              </Link>
            </div>
          </section>

          {/* Upcoming Deadlines */}
          <section className="bg-amber-50 p-5 rounded-xl border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5" /> 마감 임박
            </h3>
            {upcomingTest ? (
              <div className="bg-white p-3 rounded-lg text-sm border border-amber-100">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded mr-2">테스트</span>
                <span className="font-medium">{upcomingTest.title}</span>
                <div className="text-secondary-500 mt-1 text-xs">{upcomingTest.endDate} 마감</div>
              </div>
            ) : (
              <p className="text-sm text-amber-700 text-center py-2">현재 마감 임박 항목이 없습니다.</p>
            )}
            <div className="bg-white p-3 rounded-lg text-sm border border-amber-100 mt-3">
              <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded mr-2">과제</span>
              <span className="font-medium">포트폴리오 초안 제출</span>
              <div className="text-secondary-500 mt-1 text-xs">이번 주 금요일 18:00 마감</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
