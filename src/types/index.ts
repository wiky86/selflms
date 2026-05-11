export type Notice = {
  id: string;
  title: string;
  category: "중요" | "수업" | "과제" | "테스트" | "취업" | "행사";
  date: string;
  isImportant: boolean;
  summary: string;
  content: string;
  link?: {
    label: string;
    url: string;
  };
};

export type LearningResource = {
  id: string;
  week: string;
  subject: string;
  type: "강의자료" | "실습" | "복습" | "참고" | "심화" | "취업";
  level: "기초" | "보통" | "심화";
  title: string;
  description: string;
  url: string;
};

export type LevelTest = {
  id: string;
  title: string;
  target: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: "예정" | "진행 중" | "종료";
  description: string;
  testUrl?: string;
  resultNotice: string;
};

export type StudyGroup = {
  id: string;
  title: string;
  topic: string;
  schedule: string;
  place: string;
  status: "모집 중" | "진행 중" | "종료";
  capacity: string;
  description: string;
  applyUrl?: string;
};

export type JobInfo = {
  id: string;
  type: "채용" | "인턴십" | "특강" | "설명회" | "공모전";
  title: string;
  company?: string;
  deadline: string;
  jobRole?: string;
  skills?: string[];
  comment: string;
  url: string;
};

export type ContactInfo = {
  id: string;
  category: string;
  manager: string;
  channel: string;
  availableTime: string;
  note: string;
};
