import { Inbox } from "lucide-react";

export function EmptyState({ message = "데이터가 없습니다." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-secondary-500 bg-white rounded-xl border border-secondary-100">
      <Inbox className="w-12 h-12 mb-4 text-secondary-300" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
