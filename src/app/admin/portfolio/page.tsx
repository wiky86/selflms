"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { getPortfolioLinks, addPortfolioLink, deletePortfolioLink } from "@/lib/db/portfolio";
import { PortfolioLink } from "@/types";
import { Trash2, PlusCircle } from "lucide-react";

export default function AdminPortfolioPage() {
  const [links, setLinks] = useState<PortfolioLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("LinkIcon");
  const [url, setUrl] = useState("");
  const [isExternal, setIsExternal] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    const data = await getPortfolioLinks();
    setLinks(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return alert("필수 항목을 입력하세요.");
    
    const newItem = { title, description, icon, url, isExternal };
    await addPortfolioLink(newItem as any);
    
    setTitle(""); setDescription(""); setIcon("LinkIcon"); setUrl(""); setIsExternal(true);
    setShowForm(false);
    
    fetchLinks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deletePortfolioLink(id);
    fetchLinks();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle className="mb-0">포트폴리오 가이드 관리</PageTitle>
        <CTAButton onClick={() => setShowForm(!showForm)} variant="primary" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> 새 링크 등록
        </CTAButton>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm space-y-4">
          <SectionTitle>템플릿 링크 등록</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">링크 제목</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required placeholder="예: Notion 포트폴리오" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">간단한 설명</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 가장 기본이 되는 양식" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">연결 URL</label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">아이콘 종류</label>
              <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2">
                <option value="LayoutTemplate">템플릿 (LayoutTemplate)</option>
                <option value="FileText">문서 (FileText)</option>
                <option value="GitBranch">깃허브 (GitBranch)</option>
                <option value="LinkIcon">링크 (LinkIcon)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 mt-8 cursor-pointer">
                <input type="checkbox" checked={isExternal} onChange={(e) => setIsExternal(e.target.checked)} className="w-4 h-4 text-primary-600 rounded" />
                <span className="text-sm font-medium text-secondary-700">새 탭에서 열기 (외부 링크)</span>
              </label>
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
              <th className="p-4 font-medium">제목</th>
              <th className="p-4 font-medium">설명</th>
              <th className="p-4 font-medium">아이콘</th>
              <th className="p-4 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">데이터를 불러오는 중...</td></tr>
            ) : links.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">등록된 링크가 없습니다.</td></tr>
            ) : (
              links.map((link) => (
                <tr key={link.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="p-4 font-medium text-secondary-900">{link.title}</td>
                  <td className="p-4 text-secondary-500">{link.description}</td>
                  <td className="p-4 text-secondary-500">{link.icon}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => link.id && handleDelete(link.id)} className="text-secondary-400 hover:text-danger-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
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
