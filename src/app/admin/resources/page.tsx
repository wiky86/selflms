"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { getResources, addResource, deleteResource } from "@/lib/db/resources";
import { Resource } from "@/types";
import { Trash2, PlusCircle } from "lucide-react";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState("1주차");
  const [type, setType] = useState("강의자료");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const data = await getResources();
    setResources(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !link) return alert("제목과 링크를 입력하세요.");
    
    const newResource = {
      title,
      description,
      week,
      type,
      link,
      date: new Date().toISOString().split("T")[0],
    };

    await addResource(newResource as any);
    
    // Reset form
    setTitle("");
    setDescription("");
    setWeek("1주차");
    setType("강의자료");
    setLink("");
    setShowForm(false);
    
    // Refresh list
    fetchResources();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteResource(id);
    fetchResources();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle className="mb-0">학습 자료 관리</PageTitle>
        <CTAButton onClick={() => setShowForm(!showForm)} variant="primary" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> 새 자료 등록
        </CTAButton>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm space-y-4">
          <SectionTitle>학습 자료 등록</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">해당 주차</label>
              <select 
                value={week} 
                onChange={(e) => setWeek(e.target.value)}
                className="w-full border border-secondary-300 rounded-lg p-2"
              >
                {["1주차", "2주차", "3주차", "4주차", "5주차", "6주차"].map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">자료 유형</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-secondary-300 rounded-lg p-2"
              >
                <option value="강의자료">강의자료</option>
                <option value="실습">실습</option>
                <option value="복습">복습</option>
                <option value="참고">참고</option>
                <option value="심화">심화</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">자료 제목</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg p-2"
              placeholder="예: 파이썬 기초 문법 요약본"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">자료 링크 (URL)</label>
            <input 
              type="url" 
              value={link} 
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg p-2"
              placeholder="https://..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">간단한 설명</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg p-2"
              placeholder="자료에 대한 간략한 설명을 입력하세요"
            />
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
              <th className="p-4 font-medium">분류</th>
              <th className="p-4 font-medium">제목</th>
              <th className="p-4 font-medium">등록일</th>
              <th className="p-4 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">데이터를 불러오는 중...</td></tr>
            ) : resources.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">등록된 자료가 없습니다.</td></tr>
            ) : (
              resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="p-4">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-bold mr-2">
                      {resource.week}
                    </span>
                    <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">
                      {resource.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-secondary-900">{resource.title}</td>
                  <td className="p-4 text-secondary-500">{resource.date}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => resource.id && handleDelete(resource.id)}
                      className="text-secondary-400 hover:text-danger-500 transition-colors p-2"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
