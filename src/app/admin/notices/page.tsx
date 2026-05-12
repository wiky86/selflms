"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { getNotices, addNotice, deleteNotice } from "@/lib/db/notices";
import { Notice } from "@/types";
import { Trash2, PlusCircle } from "lucide-react";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("수업");
  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    const data = await getNotices();
    setNotices(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("제목과 내용을 입력하세요.");
    
    const newNotice = {
      title,
      content,
      category,
      isImportant,
      date: new Date().toISOString().split("T")[0],
    };

    await addNotice(newNotice as any);
    
    // Reset form
    setTitle("");
    setContent("");
    setCategory("수업");
    setIsImportant(false);
    setShowForm(false);
    
    // Refresh list
    fetchNotices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteNotice(id);
    fetchNotices();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle className="mb-0">공지사항 관리</PageTitle>
        <CTAButton onClick={() => setShowForm(!showForm)} variant="primary" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> 새 공지 작성
        </CTAButton>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm space-y-4">
          <SectionTitle>공지사항 작성</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">카테고리</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-secondary-300 rounded-lg p-2"
              >
                <option value="수업">수업</option>
                <option value="과제">과제</option>
                <option value="테스트">테스트</option>
                <option value="취업">취업</option>
                <option value="행사">행사</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isImportant} 
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-danger-600">중요 공지 (상단 고정 및 강조 표시)</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">제목</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg p-2"
              placeholder="공지사항 제목을 입력하세요"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">내용</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg p-2 h-32"
              placeholder="공지 내용을 입력하세요"
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
              <th className="p-4 font-medium">상태/카테고리</th>
              <th className="p-4 font-medium">제목</th>
              <th className="p-4 font-medium">등록일</th>
              <th className="p-4 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">데이터를 불러오는 중...</td></tr>
            ) : notices.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">등록된 공지사항이 없습니다.</td></tr>
            ) : (
              notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="p-4">
                    <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs mr-2">
                      {notice.category}
                    </span>
                    {notice.isImportant && (
                      <span className="bg-danger-100 text-danger-700 px-2 py-1 rounded text-xs font-bold">
                        중요
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-medium text-secondary-900">{notice.title}</td>
                  <td className="p-4 text-secondary-500">{notice.date}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => notice.id && handleDelete(notice.id)}
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
