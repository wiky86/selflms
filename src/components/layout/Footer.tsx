export function Footer() {
  return (
    <footer className="bg-secondary-50 border-t border-secondary-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center text-secondary-500 text-sm">
          <p className="font-bold text-secondary-700 mb-2">UBION K-Digital Training</p>
          <p className="mb-4">본 페이지는 KDT 오프라인 훈련생의 원활한 학습 지원을 위한 내부 전용 사이트입니다.</p>
          <p>&copy; {new Date().getFullYear()} UBION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
