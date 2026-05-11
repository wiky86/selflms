import { StudyGroup } from "@/types";

export const studies: StudyGroup[] = [
  {
    id: "1",
    title: "Python 복습 스터디",
    topic: "Python 기초 문법 및 알고리즘",
    schedule: "매주 화/목 18:00 - 20:00",
    place: "3강의장",
    status: "모집 중",
    capacity: "6명 (현재 3명)",
    description: "수업 시간에 배운 Python 기초를 복습하고 백준 알고리즘 문제를 함께 푸는 스터디입니다.",
    applyUrl: "https://forms.google.com/example"
  },
  {
    id: "2",
    title: "SQL 문제풀이 스터디",
    topic: "프로그래머스 SQL 고득점 Kit",
    schedule: "매주 수 18:00 - 20:00",
    place: "휴게실",
    status: "진행 중",
    capacity: "4명",
    description: "프로그래머스 SQL 문제를 풀고 쿼리를 리뷰하는 스터디입니다. 현재 정원 마감되었습니다.",
  },
  {
    id: "3",
    title: "포트폴리오 정리 스터디",
    topic: "프로젝트 회고 및 이력서 작성",
    schedule: "매주 금 17:00 - 19:00",
    place: "5강의장",
    status: "모집 중",
    capacity: "5명",
    description: "매주 진행한 프로젝트 내용을 정리하고 이력서 및 포트폴리오를 서로 피드백하는 모임입니다.",
    applyUrl: "https://forms.google.com/example"
  },
  {
    id: "4",
    title: "취업 면접 준비 스터디",
    topic: "모의 면접 및 CS 지식",
    schedule: "매주 월 18:00 - 20:00",
    place: "온라인 (Zoom)",
    status: "종료",
    capacity: "4명",
    description: "1기 선배들과 함께했던 취업 면접 대비 스터디입니다. (종료됨)",
  }
];
