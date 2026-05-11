import Image from "next/image";
import Link from "next/link";
import { courseInfo } from "@/data/course";

export function Header() {
  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="UBION Logo" width={90} height={27} className="h-7 w-auto" />
          <div className="h-5 w-px bg-secondary-200 hidden sm:block"></div>
          <span className="font-bold text-secondary-900 hidden sm:block">KDT Learning Board</span>
        </Link>
        
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden md:inline-block text-secondary-600">{courseInfo.title}</span>
          <span className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-bold">
            {courseInfo.currentWeek}
          </span>
        </div>
      </div>
    </header>
  );
}
