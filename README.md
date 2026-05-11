# KDT Learning Board

K-Digital Training 오프라인 훈련생을 위한 내부 학습 지원 MVP 웹사이트입니다.

## 주요 기능

- 공지사항 확인
- 학습 자료실
- Level Test 안내
- 그룹 스터디 안내
- 취업 정보 제공
- 포트폴리오 가이드
- 문의 안내

## 기술 스택

- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4)
- Vercel

## 실행 방법

```bash
npm install
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

## 데이터 수정 방법

`src/data` 폴더의 파일을 수정하면 각 페이지에 반영됩니다.
- `course.ts`: 과정 정보
- `notices.ts`: 공지사항
- `resources.ts`: 학습 자료
- `levelTests.ts`: 테스트 정보
- `studies.ts`: 스터디 모임
- `jobs.ts`: 취업 및 행사 정보
- `contacts.ts`: 문의처

## 배포 방법

Vercel에 GitHub Repository를 연결하여 배포합니다.
1. GitHub 저장소(https://github.com/wiky86/selflms.git)에 코드를 푸시합니다.
2. Vercel에서 Add New Project를 선택하고 해당 저장소를 연결합니다.
3. 배포(Deploy) 버튼을 클릭하면 자동으로 빌드 및 배포가 완료됩니다.

## 2단계 확장 시 고려할 포인트

현재 버전은 MVP 단계로 로그인과 데이터베이스 없이 정적 파일(`src/data/*.ts`)을 통해 데이터를 관리합니다. 향후 2단계 플랫폼 확장을 고려할 때 다음과 같은 아키텍처 변경을 제안합니다.

1. **데이터베이스 연결**: Supabase 또는 Firebase를 연동하여 `src/data` 하드코딩된 데이터를 DB로 마이그레이션합니다.
2. **인증 시스템**: NextAuth.js(Auth.js) 또는 Supabase Auth를 통해 훈련생 로그인 기능을 추가합니다.
3. **사용자별 맞춤 기능**: 로그인 후 개별 진도율, 성적표, 출석 관리 시스템을 구축합니다.
4. **관리자 페이지**: 어드민(Admin) 대시보드를 구축하여 데이터를 손쉽게 관리할 수 있도록 구성합니다.
