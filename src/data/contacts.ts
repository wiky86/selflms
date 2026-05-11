import { ContactInfo } from "@/types";

export const contacts: ContactInfo[] = [
  {
    id: "1",
    category: "수업 관련 질문",
    manager: "강사님 (김코딩)",
    channel: "디스코드 #qna 채널",
    availableTime: "평일 09:00 - 18:00",
    note: "질문 전 먼저 구글링 및 이전 질문을 검색해 보세요."
  },
  {
    id: "2",
    category: "출결 관련 문의",
    manager: "운영 매니저 (이운영)",
    channel: "카카오톡 채널 'KDT 운영사무국'",
    availableTime: "평일 09:00 - 18:00",
    note: "지각, 결석, 조퇴 등의 사유 발생 시 즉시 연락 바랍니다."
  },
  {
    id: "3",
    category: "과제/테스트 문의",
    manager: "보조 강사 (박조교)",
    channel: "디스코드 DM",
    availableTime: "평일 10:00 - 17:00",
    note: "과제 제출 오류, 테스트 접속 불가 등의 기술적 문제 포함."
  },
  {
    id: "4",
    category: "취업 지원 문의",
    manager: "취업 매니저 (최취업)",
    channel: "이메일 (job@example.com)",
    availableTime: "상시 (확인 후 순차 답변)",
    note: "이력서 첨삭 요청, 모의 면접 신청 등."
  },
  {
    id: "5",
    category: "스터디 문의",
    manager: "운영 매니저 (이운영)",
    channel: "디스코드 #study 채널",
    availableTime: "평일 09:00 - 18:00",
    note: "스터디 개설 승인 및 지원금 문의."
  },
  {
    id: "6",
    category: "시스템 오류 문의",
    manager: "기술 지원팀",
    channel: "웹사이트 우측 하단 챗봇",
    availableTime: "24시간 (AI 응답 후 담당자 연결)",
    note: "학습 플랫폼 버그 및 접속 장애 신고."
  }
];
