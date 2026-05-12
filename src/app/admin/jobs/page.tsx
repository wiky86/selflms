"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { getJobs, addJob, deleteJob } from "@/lib/db/jobs";
import { JobInfo } from "@/types";
import { Trash2, PlusCircle } from "lucide-react";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [type, setType] = useState<"채용" | "인턴십" | "특강" | "설명회" | "공모전">("채용");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const data = await getJobs();
    setJobs(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return alert("필수 항목을 입력하세요.");
    
    const skillArray = skills.split(",").map(s => s.trim()).filter(s => s);
    const newItem = { type, title, company, deadline, jobRole, skills: skillArray, comment, url };
    
    await addJob(newItem as any);
    
    setType("채용"); setTitle(""); setCompany(""); setDeadline(""); setJobRole("");
    setSkills(""); setComment(""); setUrl(""); setShowForm(false);
    
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteJob(id);
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle className="mb-0">취업 정보 관리</PageTitle>
        <CTAButton onClick={() => setShowForm(!showForm)} variant="primary" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> 새 취업 정보 등록
        </CTAButton>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm space-y-4">
          <SectionTitle>취업 정보 등록</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">분류</label>
              <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full border border-secondary-300 rounded-lg p-2">
                <option value="채용">채용</option>
                <option value="인턴십">인턴십</option>
                <option value="특강">특강</option>
                <option value="설명회">설명회</option>
                <option value="공모전">공모전</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">제목/공고명</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">기업명/기관명</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">마감일</label>
              <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: ~ 05. 20 (월) 또는 상시 채용" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">직무 (선택)</label>
              <input type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 백엔드 개발자" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">기술 스택 (콤마로 구분)</label>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: Java, Spring Boot" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700">상세 링크 URL</label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700">추천 코멘트</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2 h-16" placeholder="예: 우리 과정에서 배운 기술 스택과 일치하는 채용공고입니다." />
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
              <th className="p-4 font-medium">분류</th>
              <th className="p-4 font-medium">제목/기업</th>
              <th className="p-4 font-medium">마감일</th>
              <th className="p-4 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">데이터를 불러오는 중...</td></tr>
            ) : jobs.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">등록된 정보가 없습니다.</td></tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="p-4"><span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">{job.type}</span></td>
                  <td className="p-4">
                    <div className="font-medium text-secondary-900">{job.title}</div>
                    <div className="text-secondary-500 text-xs">{job.company}</div>
                  </td>
                  <td className="p-4 text-secondary-500">{job.deadline}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => job.id && handleDelete(job.id)} className="text-secondary-400 hover:text-danger-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
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
