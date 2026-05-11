import { LevelTest } from "@/types";

export const levelTests: LevelTest[] = [
  {
    id: "1",
    title: "기초 역량 진단 테스트",
    target: "전체 훈련생",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    duration: "30분",
    status: "종료",
    description: "과정 시작 전, 수강생들의 전반적인 IT 및 수학적 기초 지식을 파악하기 위한 진단 테스트입니다.",
    resultNotice: "개별 이메일로 결과 발송 완료"
  },
  {
    id: "2",
    title: "Python 기초 이해도 테스트",
    target: "전체 훈련생",
    startDate: "2024-05-15 16:00",
    endDate: "2024-05-15 18:00",
    duration: "60분",
    status: "진행 중",
    description: "1~2주차에 학습한 Python 기본 문법, 자료구조, 제어문 등에 대한 이해도를 평가합니다.",
    testUrl: "https://forms.google.com/example-python-test",
    resultNotice: "다음 주 월요일 성적 게시판 공지"
  },
  {
    id: "3",
    title: "데이터 분석 기초 테스트",
    target: "전체 훈련생",
    startDate: "2024-05-29",
    endDate: "2024-05-29",
    duration: "90분",
    status: "예정",
    description: "Pandas, NumPy를 활용한 데이터 전처리 및 탐색적 데이터 분석(EDA) 능력을 평가합니다.",
    testUrl: "#",
    resultNotice: "응시 종료 후 즉시 확인 가능"
  }
];
