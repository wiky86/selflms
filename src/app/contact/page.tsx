"use client";

import { useState, useEffect } from "react";
import { getContacts } from "@/lib/db/contacts";
import { ContactInfo } from "@/types";
import { PageTitle } from "@/components/common/Titles";
import { PhoneCall, User, Clock, Info } from "lucide-react";

export default function ContactPage() {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getContacts();
      setContacts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="space-y-6"><PageTitle>문의 안내</PageTitle><div className="py-20 text-center text-secondary-500">데이터를 불러오는 중입니다...</div></div>;
  }

  return (
    <div className="space-y-6 pb-10">
      <PageTitle>문의 안내</PageTitle>
      
      <p className="text-secondary-600 mb-8 max-w-2xl">
        KDT 교육 운영과 관련된 모든 문의 채널을 안내해 드립니다. 
        원활하고 빠른 답변을 위해 각 문의 유형에 맞는 담당자와 채널을 확인 후 연락해 주시기 바랍니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white p-6 rounded-xl border border-secondary-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-secondary-900 mb-4 pb-3 border-b border-secondary-100 flex items-center">
              {contact.category}
            </h3>
            
            <div className="space-y-3 text-sm text-secondary-700">
              <div className="flex items-start">
                <User className="w-4 h-4 mr-2.5 text-secondary-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block mb-0.5">담당자</span>
                  {contact.manager}
                </div>
              </div>
              
              <div className="flex items-start">
                <PhoneCall className="w-4 h-4 mr-2.5 text-secondary-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block mb-0.5">연락 채널</span>
                  <span className="text-primary-600 font-medium">{contact.channel}</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-4 h-4 mr-2.5 text-secondary-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block mb-0.5">문의 가능 시간</span>
                  {contact.availableTime}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-secondary-100 text-xs text-secondary-500 flex items-start bg-secondary-50 p-3 rounded-lg">
              <Info className="w-3.5 h-3.5 mr-1.5 mt-0.5 shrink-0 text-secondary-400" />
              {contact.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
