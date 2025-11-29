# ScholarBee 🐝

**장학금 맞춤형 추천 웹사이트**

사용자의 성적에 맞는 장학금을 제공하는 스마트 추천 서비스입니다.

---

## 📋 프로젝트 정보

- **프로젝트명**: ScholarBee
- **개발자**: Junseo (xxvl)
- **설명**: 학생들의 성적 정보를 기반으로 지원 가능한 장학금을 자동으로 필터링하고 추천하는 웹 애플리케이션

---

## 🎨 디자인 철학

Apple 웹사이트와 Figma 메인 웹사이트에서 영감을 받아, 화이트 베이스에 심플한 아이콘과 기본 글씨체를 사용한 깔끔하고 편안한 디자인을 구현했습니다.

---

## 🖥️ 화면 구성

총 **8개의 웹페이지**로 구성되어 있습니다:

1. **메인 랜딩페이지** - 서비스 소개 및 주요 기능 안내
2. **회원가입창** - 신규 사용자 등록
3. **로그인창** - 기존 사용자 인증
4. **장학금 목록 페이지** - 전체 장학금 조회 및 검색
5. **장학금 상세정보 모달창** - 개별 장학금 상세 정보
6. **성적 정보 입력 모달창** - 사용자 성적 데이터 입력
7. **내 성적 확인페이지** - 입력한 성적 정보 조회 및 관리
8. **마이페이지** - 사용자 프로필 및 맞춤 장학금 현황

---

## 🛠️ 기술 스택

- **Framework**: React
- **Language**: TypeScript, JavaScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Toast Notifications**: Sonner

---

## ✨ 주요 기능

### 1. 맞춤형 장학금 추천
- 사용자의 성적 정보를 기반으로 지원 가능한 장학금 자동 필터링
- 평점에 따른 장학금 우선순위 정렬
- 지원 가능 여부 실시간 표시

### 2. 성적 관리
- 대학교, 전공, 학년, 학기별 성적 정보 입력
- 다양한 평점 체계 지원 (4.0, 4.3, 4.5 만점)
- 평점 정규화를 통한 통일된 기준 적용

### 3. 장학금 검색
- 장학금명 또는 기관명으로 실시간 검색
- 카테고리별 장학금 분류
- 마감일, 지원 금액 등 상세 정보 제공

### 4. 반응형 디자인
- 1440x1024 해상도 최적화
- 다양한 화면 크기에 대응하는 레이아웃

---

## 🔌 API 명세

### 인증 (Authentication)
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인

### 학생 정보 (Students)
- `GET /api/students/{studentId}` - 학생 정보 조회
- `PUT /api/students/{studentId}` - 학생 정보 수정
- `DELETE /api/students/{studentId}` - 학생 계정 삭제

### 장학금 (Scholarships)
- `GET /api/scholarships` - 장학금 목록 조회
- `GET /api/scholarships/{scholarshipId}` - 장학금 상세 조회
- `GET /api/scholarships/search` - 장학금 검색

### 찜 목록 (Wishlist)
- `GET /api/wishlist/{studentId}` - 찜 목록 조회
- `POST /api/wishlist` - 찜 추가
- `DELETE /api/wishlist/{wishlistId}` - 찜 삭제

### 지원 내역 (Applications)
- `GET /api/applications/{studentId}` - 지원 내역 조회
- `POST /api/applications` - 장학금 지원
- `DELETE /api/applications/{applicationId}` - 지원 취소

### 학생 상세정보 (Student Details)
- `GET /api/student-details/{studentId}` - 상세정보 조회
- `POST /api/student-details` - 상세정보 등록
- `PUT /api/student-details/{detailId}` - 상세정보 수정

### 자격증 (Qualifications)
- `GET /api/qualifications/{studentId}` - 자격증 목록 조회
- `POST /api/qualifications` - 자격증 등록
- `DELETE /api/qualifications/{qualificationId}` - 자격증 삭제

### 추천 (Recommendations)
- `GET /api/recommendations/{studentId}` - 맞춤 추천 장학금 조회

---

## 📂 프로젝트 구조

```
/
├── App.tsx                          # 메인 애플리케이션
├── components/
│   ├── LandingPage.tsx             # 랜딩 페이지
│   ├── SignUpPage.tsx              # 회원가입 페이지
│   ├── LoginPage.tsx               # 로그인 페이지
│   ├── ScholarshipListPage.tsx     # 장학금 목록 페이지
│   ├── ScholarshipDetailModal.tsx  # 장학금 상세 모달
│   ├── GradeInputModal.tsx         # 성적 입력 모달
│   ├── MyGradesPage.tsx            # 내 성적 페이지
│   ├── MyPage.tsx                  # 마이페이지
│   ├── Navigation.tsx              # 네비게이션 바
│   └── ui/                         # shadcn/ui 컴포넌트
├── styles/
│   └── globals.css                 # 전역 스타일
└── README.md                       # 프로젝트 문서
```

---

## 🚀 시작하기

### 개발 환경 요구사항
- Node.js 16.x 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

---

## 📱 화면 해상도

- **최적화 해상도**: 1440x1024
- **반응형**: 모바일, 태블릿, 데스크톱 지원

---

## 🔐 현재 상태

- ✅ 프론트엔드 구현 완료
- ✅ 모든 8개 페이지 구현
- ✅ 1440x1024 해상도 최적화
- ✅ ScholarBee 로고 적용
- ⏳ 백엔드 API 연동 예정
- ⏳ 데이터베이스 구축 예정

---

## 📄 라이선스 및 저작권

본 프로젝트는 다음 오픈소스 컴포넌트를 사용합니다:

- [shadcn/ui](https://ui.shadcn.com/) - MIT License
- [Unsplash](https://unsplash.com) - Unsplash License

---

## 👨‍💻 개발자

**Junseo (xxvl)**

---

**© 2025 ScholarBee. All rights reserved.**
