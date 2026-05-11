import { Notice } from "@/types";

export const notices: Notice[] = [
  {
    id: "1",
    title: "2주차 Level Test 응시 안내",
    category: "테스트",
    date: "2024-05-15",
    isImportant: true,
    summary: "이번 주 금요일 오후 4시에 2주차 Level Test가 진행됩니다. 모든 훈련생은 반드시 참석하시기 바랍니다.",
    content: "이번 주 금요일 오후 4시에 2주차 Level Test가 진행됩니다. 1~2주차에 배운 Python 기초 및 조건문/반복문 내용이 포함됩니다. 결시할 경우 다음 주차 스터디 참여에 제한이 있을 수 있습니다.",
    link: {
      label: "Level Test 페이지로 이동",
      url: "/level-test"
    }
  },
  {
    id: "2",
    title: "Python 실습 자료 업로드 안내",
    category: "수업",
    date: "2024-05-14",
    isImportant: false,
    summary: "Python 기초 문법 실습 자료가 업로드되었습니다.",
    content: "오늘 수업에서 사용한 Python 기초 문법 실습 Colab 링크가 학습 자료실에 업로드되었습니다. 복습에 활용하시기 바랍니다.",
    link: {
      label: "학습 자료실로 이동",
      url: "/resources"
    }
  },
  {
    id: "3",
    title: "금요일 포트폴리오 1차 점검 안내",
    category: "과제",
    date: "2024-05-13",
    isImportant: true,
    summary: "금요일 오전 중으로 포트폴리오 1차 점검이 있을 예정입니다.",
    content: "그동안 진행한 미니 프로젝트 내용을 바탕으로 포트폴리오 초안을 작성하여 금요일 오전까지 제출해 주시기 바랍니다. 양식은 포트폴리오 가이드 페이지를 참고하세요.",
    link: {
      label: "포트폴리오 가이드 보기",
      url: "/portfolio"
    }
  },
  {
    id: "4",
    title: "취업 특강 신청 안내 (이력서 작성법)",
    category: "취업",
    date: "2024-05-12",
    isImportant: false,
    summary: "다음 주 수요일 이력서 작성법 특강 신청을 받습니다.",
    content: "다음 주 수요일 외부 강사를 초청하여 이력서 작성법 특강을 진행합니다. 참석을 희망하는 훈련생은 취업 정보 페이지의 링크를 통해 신청해 주세요.",
    link: {
      label: "취업 특강 신청하기",
      url: "https://docs.google.com/forms/d/e/example"
    }
  },
  {
    id: "5",
    title: "강의장 변경 안내 (3강의장 -> 5강의장)",
    category: "행사",
    date: "2024-05-11",
    isImportant: true,
    summary: "에어컨 공사로 인해 3일간 강의장이 변경됩니다.",
    content: "현재 사용 중인 3강의장 에어컨 교체 공사로 인해, 내일부터 3일간 5강의장에서 수업이 진행됩니다. 착오 없으시길 바랍니다."
  }
];
