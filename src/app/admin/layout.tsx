import Link from "next/link";
import { PageTitle } from "@/components/common/Titles";
import { LayoutDashboard, FileText, UploadCloud, CheckSquare, Users, Briefcase } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl border border-secondary-200 p-4 sticky top-24">
          <PageTitle className="!text-xl mb-4 pb-4 border-b border-secondary-100">관리자 메뉴</PageTitle>
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-secondary-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <LayoutDashboard className="w-5 h-5" /> 대시보드
            </Link>
            <Link href="/admin/notices" className="flex items-center gap-3 px-3 py-2 text-secondary-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <FileText className="w-5 h-5" /> 공지사항 관리
            </Link>
            <Link href="/admin/resources" className="flex items-center gap-3 px-3 py-2 text-secondary-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <UploadCloud className="w-5 h-5" /> 학습 자료 관리
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-secondary-400 rounded-lg cursor-not-allowed">
              <CheckSquare className="w-5 h-5" /> 레벨 테스트 관리
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-secondary-400 rounded-lg cursor-not-allowed">
              <Users className="w-5 h-5" /> 스터디 관리
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-secondary-400 rounded-lg cursor-not-allowed">
              <Briefcase className="w-5 h-5" /> 취업 정보 관리
            </Link>
          </nav>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
