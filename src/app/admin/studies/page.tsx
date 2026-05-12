"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { getStudies, addStudy, deleteStudy } from "@/lib/db/studies";
import { StudyGroup } from "@/types";
import { Trash2, PlusCircle } from "lucide-react";

export default function AdminStudiesPage() {
  const [studies, setStudies] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [schedule, setSchedule] = useState("");
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState<"모집 중" | "진행 중" | "종료">("모집 중");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [applyUrl, setApplyUrl] = useState("");

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    setLoading(true);
    const data = await getStudies();
    setStudies(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !topic) return alert("필수 항목을 입력하세요.");
    
    const newItem = { title, topic, schedule, place, status, capacity, description, applyUrl };
    await addStudy(newItem as any);
    
    setTitle(""); setTopic(""); setSchedule(""); setPlace(""); setStatus("모집 중");
    setCapacity(""); setDescription(""); setApplyUrl(""); setShowForm(false);
    
    fetchStudies();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteStudy(id);
    fetchStudies();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle className="mb-0">스터디 관리</PageTitle>
        <CTAButton onClick={() => setShowForm(!showForm)} variant="primary" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> 새 스터디 등록
        </CTAButton>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm space-y-4">
          <SectionTitle>스터디 등록</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">스터디명</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">주제 카테고리</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 자격증, 알고리즘" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">일정</label>
              <input type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 매주 화/목 18:30" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">장소/방식</label>
              <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 3강의장, 온라인" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">모집 인원</label>
              <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 4~6명" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">상태</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full border border-secondary-300 rounded-lg p-2">
                <option value="모집 중">모집 중</option>
                <option value="진행 중">진행 중</option>
                <option value="종료">종료</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700">신청 폼 링크 (선택)</label>
              <input type="url" value={applyUrl} onChange={(e) => setApplyUrl(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700">설명</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2 h-20" />
            </div>
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
              <th className="p-4 font-medium">상태/분류</th>
              <th className="p-4 font-medium">스터디명</th>
              <th className="p-4 font-medium">일정</th>
              <th className="p-4 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">데이터를 불러오는 중...</td></tr>
            ) : studies.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">등록된 스터디가 없습니다.</td></tr>
            ) : (
              studies.map((study) => (
                <tr key={study.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="p-4">
                    <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs mr-2">{study.status}</span>
                    <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">{study.topic}</span>
                  </td>
                  <td className="p-4 font-medium text-secondary-900">{study.title}</td>
                  <td className="p-4 text-secondary-500">{study.schedule}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => study.id && handleDelete(study.id)} className="text-secondary-400 hover:text-danger-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
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
