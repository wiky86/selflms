import { JobInfo } from "@/types";

export const jobs: JobInfo[] = [
  {
    id: "1",
    type: "인턴십",
    title: "데이터 분석 인턴 모집",
    company: "(주)데이터스타즈",
    deadline: "2024-05-30",
    jobRole: "데이터 분석가 (Intern)",
    skills: ["Python", "SQL", "Tableau"],
    comment: "우리 기관 수료생 우대 채용 건입니다. 적극 지원 권장합니다.",
    url: "https://example.com/job/1"
  },
  {
    id: "2",
    type: "채용",
    title: "AI 서비스 기획자 채용 (신입/경력)",
    company: "AI 랩스",
    deadline: "상시채용",
    jobRole: "서비스 기획자",
    skills: ["Figma", "GA", "데이터분석"],
    comment: "기획 직무에 관심 있는 훈련생분들에게 적합한 포지션입니다.",
    url: "https://example.com/job/2"
  },
  {
    id: "3",
    type: "특강",
    title: "합격하는 포트폴리오 작성 특강",
    deadline: "2024-05-20",
    comment: "외부 전문가 초청 특강으로, 수요일 18시에 진행됩니다. 사전 신청 필수.",
    url: "https://forms.google.com/example"
  },
  {
    id: "4",
    type: "설명회",
    title: "금융 데이터 기업 온사이트 설명회",
    company: "핀테크 이노베이션",
    deadline: "2024-05-25",
    comment: "기업 담당자가 직접 방문하여 설명회를 진행합니다.",
    url: "https://example.com/event"
  },
  {
    id: "5",
    type: "공모전",
    title: "2024 공공데이터 활용 아이디어 공모전",
    deadline: "2024-06-15",
    comment: "파이널 프로젝트 주제로 활용하기 좋은 공모전입니다.",
    url: "https://example.com/contest"
  }
];
