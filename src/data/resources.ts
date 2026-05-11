import { LearningResource } from "@/types";

export const resources: LearningResource[] = [
  {
    id: "1",
    week: "1주차",
    subject: "Python 기초",
    type: "강의자료",
    level: "기초",
    title: "Python 변수와 자료형 요약 PDF",
    description: "1주차에 다룬 Python의 기본 변수 선언과 문자열, 리스트 등 자료형에 대한 요약본입니다.",
    url: "#"
  },
  {
    id: "2",
    week: "1주차",
    subject: "Python 기초",
    type: "실습",
    level: "기초",
    title: "조건문/반복문 Colab 실습",
    description: "if문, for문, while문을 활용한 간단한 알고리즘 실습 노트북입니다.",
    url: "#"
  },
  {
    id: "3",
    week: "2주차",
    subject: "데이터 분석 기초",
    type: "실습",
    level: "보통",
    title: "Pandas 입문 실습 데이터셋",
    description: "타이타닉 생존자 데이터를 활용한 Pandas DataFrame 조작 실습 자료입니다.",
    url: "#"
  },
  {
    id: "4",
    week: "2주차",
    subject: "버전 관리",
    type: "참고",
    level: "기초",
    title: "GitHub 사용법 가이드",
    description: "Git 기본 명령어 및 GitHub 저장소 연동 방법에 대한 가이드입니다.",
    url: "#"
  },
  {
    id: "5",
    week: "3주차",
    subject: "데이터 분석 기초",
    type: "복습",
    level: "보통",
    title: "데이터 분석 프로젝트 예시",
    description: "공공 데이터를 활용한 미니 프로젝트 진행 예시 및 코드 스니펫입니다.",
    url: "#"
  },
  {
    id: "6",
    week: "3주차",
    subject: "SQL",
    type: "강의자료",
    level: "기초",
    title: "SQL 기본 문법 요약",
    description: "SELECT, WHERE, GROUP BY, JOIN 등 SQL 필수 문법을 요약한 자료입니다.",
    url: "#"
  },
  {
    id: "7",
    week: "4주차",
    subject: "취업 준비",
    type: "취업",
    level: "기초",
    title: "포트폴리오 README 작성법",
    description: "GitHub 저장소의 README.md 파일을 효과적으로 작성하는 팁 모음입니다.",
    url: "#"
  },
  {
    id: "8",
    week: "4주차",
    subject: "취업 준비",
    type: "취업",
    level: "보통",
    title: "면접 대비 질문 리스트",
    description: "데이터 분석 직무 기술 면접에서 자주 나오는 질문과 답변 가이드입니다.",
    url: "#"
  }
];
