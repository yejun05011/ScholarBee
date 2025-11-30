# Scholar Bee 🐝

대학생을 위한 장학금 추천 서비스

## 프로젝트 소개

Scholar Bee는 학생들이 본인의 성적과 조건에 맞는 장학금을 쉽게 찾을 수 있도록 도와주는 웹 애플리케이션입니다.
학점, 학년, 소득분위 등 개인 정보를 입력하면 지원 가능한 장학금을 자동으로 필터링해서 보여줍니다.

**개발자**: Junseo, xxvl

---

## 주요 기능

### 🔍 맞춤형 장학금 검색
- 내 성적에 맞는 장학금만 표시
- 키워드로 빠른 검색
- 마감일 기준 정렬

### 📊 성적 관리
- 학점, 학년, 이수학기 입력
- 소득분위, 봉사시간, 자격증 관리
- 4.0, 4.3, 4.5 만점 평점 모두 지원

### ❤️ 찜하기 & 지원
- 관심 있는 장학금 찜하기
- 원클릭 지원
- 지원 내역 확인

### 👤 마이페이지
- 프로필 관리
- 찜한 장학금 목록
- 지원 현황 확인

---

## 기술 스택

- React + TypeScript
- Tailwind CSS v4.0
- shadcn/ui
- JWT 인증

---

## 화면 구성

총 8개 페이지로 구성되어 있습니다.

1. **메인 랜딩페이지** - 서비스 소개
2. **회원가입/로그인** - 계정 관리
3. **장학금 목록** - 전체 장학금 조회
4. **장학금 상세 모달** - 상세 정보 및 찜하기
5. **성적 입력 모달** - 학점 정보 입력
6. **내 성적 페이지** - 입력한 성적 확인
7. **마이페이지** - 찜 목록, 지원 내역

---

## 시작하기

### 설치

```bash
npm install
```

### 환경 설정

프로젝트 루트에 `.env` 파일을 만들고 백엔드 서버 주소를 설정하세요.

```env
VITE_API_URL=http://localhost:8080
```

없으면 기본값 `http://localhost:8080`이 사용됩니다.

### 실행

```bash
npm run dev
```

브라우저에서 터미널에 표시된 주소로 접속하세요.

---

## 백엔드 연동

### API 명세

자세한 API 명세는 [`API_INTEGRATION_GUIDE.md`](./API_INTEGRATION_GUIDE.md)를 참고하세요.

### 주요 엔드포인트

#### 인증
- `POST /api/v1/auth/signup` - 회원가입
- `POST /api/v1/auth/login` - 로그인

#### 학생 정보
- `GET /api/v1/students/me` - 마이페이지 조회
- `PATCH /api/v1/students/me/details` - 내 정보 수정

#### 성적 정보
- `GET /api/v1/students/me/details` - 입력 정보 조회
- `POST /api/v1/students/me/details` - 입력 정보 등록

#### 장학금
- `GET /api/v1/scholarships` - 장학금 검색
- `GET /api/v1/scholarships/{id}` - 상세 조회

#### 찜
- `POST /api/v1/scholarships/{id}/wishlists` - 찜하기 토글
- `GET /api/v1/students/me/wishlists/scholarships` - 내 찜 목록

---

## 프로젝트 구조

```
/
├── App.tsx                          # 메인 앱
├── components/
│   ├── LandingPage.tsx             # 랜딩
│   ├── SignUpPage.tsx              # 회원가입
│   ├── LoginPage.tsx               # 로그인
│   ├── ScholarshipListPage.tsx     # 장학금 목록
│   ├── ScholarshipDetailModal.tsx  # 상세 모달
│   ├── GradeInputModal.tsx         # 성적 입력
│   ├── MyGradesPage.tsx            # 내 성적
│   ├── MyPage.tsx                  # 마이페이지
│   └── Navigation.tsx              # 네비게이션
├── contexts/
│   └── AuthContext.tsx             # 인증 관리
├── services/
│   └── api.ts                      # API 호출
├── types/
│   └── api.ts                      # 타입 정의
└── styles/
    └── globals.css                 # 전역 스타일
```

---

## 디자인

Apple 웹사이트에서 영감을 받아 깔끔하고 심플한 디자인으로 만들었습니다.
화이트 베이스, 간결한 아이콘, 직관적인 레이아웃이 특징입니다.

**최적화 해상도**: 1440x1024

---

## 개발 현황

- ✅ 전체 8개 페이지 구현 완료
- ✅ 백엔드 API 연동 완료
- ✅ JWT 인증 시스템
- ✅ 찜하기/지원하기 기능
- ✅ 성적 기반 장학금 필터링
- ✅ 반응형 디자인

---

## 라이선스

사용한 오픈소스 라이브러리는 [`attributions.md`](./attributions.md)를 참고하세요.

---

**© 2025 Scholar Bee**