"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { getLevelTests, addLevelTest, deleteLevelTest } from "@/lib/db/levelTests";
import { LevelTest } from "@/types";
import { Trash2, PlusCircle } from "lucide-react";

export default function AdminLevelTestsPage() {
  const [tests, setTests] = useState<LevelTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState<"예정" | "진행 중" | "종료">("예정");
  const [description, setDescription] = useState("");
  const [testUrl, setTestUrl] = useState("");
  const [resultNotice, setResultNotice] = useState("");

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    const data = await getLevelTests();
    setTests(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target) return alert("필수 항목을 입력하세요.");
    
    const newItem = {
      title, target, startDate, endDate, duration, status, description, testUrl, resultNotice
    };

    await addLevelTest(newItem as any);
    
    // Reset form
    setTitle(""); setTarget(""); setStartDate(""); setEndDate(""); setDuration("");
    setStatus("예정"); setDescription(""); setTestUrl(""); setResultNotice("");
    setShowForm(false);
    
    fetchTests();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteLevelTest(id);
    fetchTests();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle className="mb-0">레벨 테스트 관리</PageTitle>
        <CTAButton onClick={() => setShowForm(!showForm)} variant="primary" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> 새 테스트 등록
        </CTAButton>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm space-y-4">
          <SectionTitle>레벨 테스트 등록</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">테스트명</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">대상 주차</label>
              <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 1~2주차 과정" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">시작 일시</label>
              <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 2024. 04. 19 (금) 14:00" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">종료 일시</label>
              <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 2024. 04. 20 (토) 18:00" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">제한 시간</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 60분" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">상태</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full border border-secondary-300 rounded-lg p-2">
                <option value="예정">예정</option>
                <option value="진행 중">진행 중</option>
                <option value="종료">종료</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">응시 링크 URL</label>
              <input type="url" value={testUrl} onChange={(e) => setTestUrl(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">결과 안내 텍스트</label>
              <input type="text" value={resultNotice} onChange={(e) => setResultNotice(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 종료 후 3일 내 발표" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">설명</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2 h-20" />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <CTAButton type="button" onClick={() => setShowForm(false)} variant="outline">취소</CTAButton>
            <CTAButton type="submit" variant="primary">등록하기</CTAButton>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary-50 text-secondary-600 border-b border-secondary-200">
            <tr>
              <th className="p-4 font-medium">상태</th>
              <th className="p-4 font-medium">테스트명</th>
              <th className="p-4 font-medium">대상</th>
              <th className="p-4 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">데이터를 불러오는 중...</td></tr>
            ) : tests.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">등록된 테스트가 없습니다.</td></tr>
            ) : (
              tests.map((test) => (
                <tr key={test.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="p-4"><span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">{test.status}</span></td>
                  <td className="p-4 font-medium text-secondary-900">{test.title}</td>
                  <td className="p-4 text-secondary-500">{test.target}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => test.id && handleDelete(test.id)} className="text-secondary-400 hover:text-danger-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
