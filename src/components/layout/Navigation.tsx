"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bell, FileText, CheckSquare, Users, Briefcase, BookOpen, MessageSquare, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "홈", href: "/", icon: Home },
  { label: "공지사항", href: "/notices", icon: Bell },
  { label: "학습 자료실", href: "/resources", icon: FileText },
  { label: "Level Test", href: "/level-test", icon: CheckSquare },
  { label: "그룹 스터디", href: "/study", icon: Users },
  { label: "취업 정보", href: "/jobs", icon: Briefcase },
  { label: "포트폴리오 가이드", href: "/portfolio", icon: BookOpen },
  { label: "문의 안내", href: "/contact", icon: MessageSquare },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-secondary-900/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={cn(
        "fixed md:sticky top-0 md:top-16 left-0 h-screen md:h-[calc(100vh-4rem)] w-64 bg-white border-r border-secondary-200 z-40 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4 md:p-6 overflow-y-auto h-full">
          <div className="md:hidden mb-6 flex items-center justify-between">
            <span className="font-bold text-lg text-secondary-900">메뉴</span>
            <button onClick={() => setIsOpen(false)} className="text-secondary-500">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
                    )}
                  >
                    <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-primary-600" : "text-secondary-400")} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
