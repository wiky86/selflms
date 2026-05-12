"use client";

import { useState, useEffect } from "react";
import { PageTitle, SectionTitle } from "@/components/common/Titles";
import { CTAButton } from "@/components/common/CTAButton";
import { getContacts, addContact, deleteContact } from "@/lib/db/contacts";
import { ContactInfo } from "@/types";
import { Trash2, PlusCircle } from "lucide-react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [category, setCategory] = useState("행정 및 출결 문의");
  const [manager, setManager] = useState("");
  const [channel, setChannel] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const data = await getContacts();
    setContacts(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manager || !channel) return alert("필수 항목을 입력하세요.");
    
    const newItem = { category, manager, channel, availableTime, note };
    await addContact(newItem as any);
    
    setCategory("행정 및 출결 문의"); setManager(""); setChannel(""); setAvailableTime(""); setNote("");
    setShowForm(false);
    
    fetchContacts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteContact(id);
    fetchContacts();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle className="mb-0">문의 안내 관리</PageTitle>
        <CTAButton onClick={() => setShowForm(!showForm)} variant="primary" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> 새 문의처 등록
        </CTAButton>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm space-y-4">
          <SectionTitle>문의처 등록</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">카테고리</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">담당자</label>
              <input type="text" value={manager} onChange={(e) => setManager(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required placeholder="예: 김매니저" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">연락 채널</label>
              <input type="text" value={channel} onChange={(e) => setChannel(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" required placeholder="예: 이메일, 슬랙" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">답변 가능 시간</label>
              <input type="text" value={availableTime} onChange={(e) => setAvailableTime(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 평일 09:00 - 18:00" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700">참고 사항</label>
              <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="w-full border border-secondary-300 rounded-lg p-2" placeholder="예: 메일 제목 양식: [출결문의] 이름" />
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
              <th className="p-4 font-medium">카테고리</th>
              <th className="p-4 font-medium">담당자</th>
              <th className="p-4 font-medium">연락 채널</th>
              <th className="p-4 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">데이터를 불러오는 중...</td></tr>
            ) : contacts.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-secondary-500">등록된 문의처가 없습니다.</td></tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="p-4"><span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">{contact.category}</span></td>
                  <td className="p-4 font-medium text-secondary-900">{contact.manager}</td>
                  <td className="p-4 text-secondary-500">{contact.channel}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => contact.id && handleDelete(contact.id)} className="text-secondary-400 hover:text-danger-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
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
