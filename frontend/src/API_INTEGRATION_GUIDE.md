# Scholar Bee API 통합 가이드

## 📋 개요

이 문서는 Scholar Bee 프론트엔드와 백엔드 API의 통합 가이드입니다.
실제 백엔드 서버와만 통신합니다.

## 🚀 빠른 시작

### 1. 환경 설정

백엔드 서버 주소를 설정하려면 프로젝트 루트에 `.env` 파일을 생성하세요:

```env
# 백엔드 API 서버 주소
VITE_API_URL=http://localhost:8080
```

### 2. 백엔드 서버 실행

```bash
# 백엔드 서버를 8080 포트에서 실행
cd backend
./gradlew bootRun
```

### 3. 프론트엔드 실행

```bash
# 프론트엔드 실행
npm run dev
```

브라우저 콘솔에 `🔷 백엔드 API 서버: http://localhost:8080` 메시지가 표시됩니다.

---

## 📡 API 명세서 (v1)

### 공통 응답 형식

모든 API는 다음과 같은 통일된 응답 구조를 사용합니다:

```json
{
  "isSuccess": true,
  "code": 200,
  "message": "성공 메시지",
  "data": { /* 실제 데이터 */ }
}
```

---

## 🔐 1. 인증 API

### 1.1 회원가입

**POST** `/api/v1/auth/signup`

**요청:**
```json
{
  "name": "김예준",
  "email": "dpwnsd0501@hufs.ac.kr",
  "password": "1234"
}
```

**응답:** (201 Created)
```json
{
  "isSuccess": true,
  "code": 201,
  "message": "회원가입이 완료되었습니다.",
  "data": {
    "studentId": 1,
    "email": "dpwnsd0501@hufs.ac.kr"
  }
}
```

**프론트엔드 사용:**
```typescript
import { authApi } from './services/api';

const response = await authApi.signUp({
  name: "김예준",
  email: "dpwnsd0501@hufs.ac.kr",
  password: "1234"
});
// response = { studentId: 1, email: "..." }
```

---

### 1.2 로그인

**POST** `/api/v1/auth/login`

**요청:**
```json
{
  "email": "dpwnsd0501@hufs.ac.kr",
  "password": "1234"
}
```

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "로그인 성공",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

**프론트엔드 사용:**
```typescript
const response = await authApi.login({
  email: "dpwnsd0501@hufs.ac.kr",
  password: "1234"
});
// response = { accessToken: "...", expiresIn: 3600 }

// 토큰은 자동으로 localStorage에 저장됩니다
// 이후 모든 API 요청에 Authorization 헤더로 포함됩니다
```

---

## 👤 2. 학생 API

### 2.1 마이페이지 조회

**GET** `/api/v1/students/me`

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "마이페이지 조회 성공",
  "data": {
    "studentId": 1,
    "name": "김예준",
    "email": "dpwnsd0501@hufs.ac.kr",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

**프론트엔드 사용:**
```typescript
const user = await studentApi.getMyProfile();
// user = { studentId: 1, name: "김예준", email: "..." }
```

---

### 2.2 내 정보 수정

**PATCH** `/api/v1/students/me/details`

**요청:**
```json
{
  "name": "김예준",
  "major": "정보통신공학과",
  "password": "newpassword123"
}
```

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "사용자 정보가 변경되었습니다.",
  "data": null
}
```

**프론트엔드 사용:**
```typescript
await studentApi.updateMyProfile({
  name: "김예준",
  major: "정보통신공학과"
});
```

---

## 📊 3. 입력 정보 API

### 3.1 확정 입력 (등록)

**POST** `/api/v1/students/me/details`

**요청:**
```json
{
  "grade": 2,
  "department": "정보통신공학과",
  "isDisabled": false,
  "incomeBracket": 4,
  "gpa": 3.8,
  "semester": 4,
  "doubleMajor": "경영학과",
  "isDoubleMajor": true,
  "volunteers": [
    {
      "name": "봉사활동1",
      "hours": 10,
      "date": "2024-01-01",
      "organization": "봉사기관"
    }
  ],
  "certificates": [
    {
      "name": "정보처리기사",
      "issueDate": "2024-01-01",
      "issuer": "한국산업인력공단"
    }
  ]
}
```

**응답:** (201 Created)
```json
{
  "isSuccess": true,
  "code": 201,
  "message": "사용자 정보가 등록되었습니다.",
  "data": null
}
```

**프론트엔드 사용:**
```typescript
await studentDetailApi.createMyDetails({
  grade: 2,
  department: "정보통신공학과",
  isDisabled: false,
  incomeBracket: 4,
  gpa: 3.8,
  volunteers: [...],
  certificates: [...]
});
```

---

### 3.2 입력 정보 조회

**GET** `/api/v1/students/me/details`

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "사용자 입력정보 조회 성공",
  "data": {
    "studentId": 2,
    "gpa": 3.875,
    "grade": 4,
    "semester": 7,
    "department": "정보통신공학과",
    "doubleMajor": "경영학과",
    "isDoubleMajor": true,
    "isDisabled": false,
    "incomeBracket": 4,
    "volunteers": [...],
    "certificates": [...]
  }
}
```

**프론트엔드 사용:**
```typescript
const details = await studentDetailApi.getMyDetails();
// details = { studentId: 2, gpa: 3.875, grade: 4, ... }
```

---

## 🎓 4. 장학금 API

### 4.1 장학금 검색

**GET** `/api/v1/scholarships?keyword=국가&minGpa=3.0&maxIncome=8`

**쿼리 파라미터:**
- `keyword` (선택): 검색 키워드
- `minGpa` (선택): 최소 학점 (예: 3.0)
- `maxIncome` (선택): 소득분위 상한 (예: 8)
- `category` (선택): 장학금 카테고리

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "장학금 검색 성공",
  "data": [
    {
      "scholarshipId": 1,
      "name": "국가장학금",
      "foundation": "한국장학재단",
      "amount": "등록금 전액",
      "apply_start": "2024-12-25",
      "apply_end": "2025-01-25",
      "minGpa": 3.0,
      "maxIncome": 8,
      "category": "국가장학금",
      "description": "소득분위 8분위 이하 학생 지원",
      "requirements": "학점 3.0 이상",
      "requiredDocuments": ["성적증명서", "소득증빙서류"]
    }
  ]
}
```

**프론트엔드 사용:**
```typescript
const scholarships = await scholarshipApi.searchScholarships({
  keyword: "국가",
  minGpa: 3.0,
  maxIncome: 8
});
```

---

### 4.2 장학금 상세 조회

**GET** `/api/v1/scholarships/{scholarshipId}`

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "장학금 상세 조회 성공",
  "data": {
    "scholarshipId": 1,
    "name": "국가장학금",
    "foundation": "한국장학재단",
    "amount": "등록금 전액",
    "apply_start": "2024-12-25",
    "apply_end": "2025-01-25",
    "minGpa": 3.0,
    "maxIncome": 8,
    "category": "국가장학금",
    "description": "...",
    "requirements": "...",
    "requiredDocuments": ["성적증명서", "소득증빙서류"]
  }
}
```

**프론트엔드 사용:**
```typescript
const scholarship = await scholarshipApi.getScholarship(1);
```

---

### 4.3 장학금 삭제 (관리자용)

**DELETE** `/api/v1/scholarships/{scholarshipId}`

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "장학금이 성공적으로 삭제되었습니다.",
  "data": {
    "deletedScholarshipId": 1
  }
}
```

---

## ❤️ 5. 찜 API

### 5.1 장학금 찜하기 (토글)

**POST** `/api/v1/scholarships/{scholarshipId}/wishlists`

이 API는 **토글 방식**으로 작동합니다:
- 찜하지 않은 상태 → POST → 찜 등록
- 찜한 상태 → POST → 찜 취소

**응답 (찜 등록):** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "장학금을 찜했습니다.",
  "data": {
    "isWished": true
  }
}
```

**응답 (찜 취소):** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "장학금 찜을 취소했습니다.",
  "data": {
    "isWished": false
  }
}
```

**프론트엔드 사용:**
```typescript
const result = await wishlistApi.toggleWishlist(scholarshipId);
if (result.isWished) {
  console.log("찜 완료!");
} else {
  console.log("찜 취소됨");
}
```

---

### 5.2 찜한 장학금 목록 조회

**GET** `/api/v1/students/me/wishlists/scholarships`

**응답:** (200 OK)
```json
{
  "isSuccess": true,
  "code": 200,
  "message": "내가 찜한 장학금 목록 조회 성공",
  "data": [
    {
      "scholarshipId": 1,
      "name": "국가장학금",
      "foundation": "한국장학재단",
      "amount": "등록금 전액",
      "apply_start": "2024-12-25",
      "apply_end": "2025-01-25"
    }
  ]
}
```

**프론트엔드 사용:**
```typescript
const wishedScholarships = await wishlistApi.getMyWishlist();
```

---

## 🔧 API 에러 처리

### 에러 응답 형식

```json
{
  "isSuccess": false,
  "code": 400,
  "message": "에러 메시지",
  "data": null
}
```

### 프론트엔드 에러 처리

```typescript
try {
  const result = await authApi.login({ email, password });
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API 에러:', error.message);
    console.error('상태 코드:', error.status);
  }
}
```

---

## 🎯 주요 변경 사항

### ✅ Mock 모드 제거
- **이전**: Mock 데이터로 테스트 가능
- **현재**: 실제 백엔드 서버만 사용

### ✅ 응답 구조 통일
모든 API가 `{isSuccess, code, message, data}` 형식 사용

### ✅ 엔드포인트 변경
- 마이페이지: `/api/students/me` → `/api/v1/students/me`
- 찜 목록: `/api/wishlist/{studentId}` → `/api/v1/students/me/wishlists/scholarships`
- 입력 정보: `/api/student-details` → `/api/v1/students/me/details`

### ✅ 찜하기 토글 방식
- **이전**: 찜 추가 POST, 찜 삭제 DELETE
- **현재**: POST 한 번으로 토글 (추가/삭제 자동)

---

## 🛠️ 개발 팁

### 1. API 호출 로그 확인
브라우저 콘솔에서 모든 API 요청/응답을 확인할 수 있습니다:
```
📤 회원가입 요청: {name: "김예준", ...}
📡 API 응답 [/api/v1/auth/signup]: {isSuccess: true, ...}
```

### 2. 인증 토큰 자동 처리
로그인 후 모든 API 요청에 자동으로 Authorization 헤더가 추가됩니다:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. 백엔드 서버 연결 실패 시
```
❌ 백엔드 서버에 연결할 수 없습니다.
서버 주소: http://localhost:8080
서버가 실행 중인지 확인해주세요.
```

→ 백엔드 서버를 실행하세요!

---

## 📚 API 함수 목록

### 인증
- `authApi.signUp(request)` - 회원가입
- `authApi.login(request)` - 로그인

### 학생
- `studentApi.getMyProfile()` - 마이페이지 조회
- `studentApi.updateMyProfile(request)` - 내 정보 수정
- `studentApi.getStudent(studentId)` - 학생 정보 조회

### 입력 정보
- `studentDetailApi.getMyDetails()` - 내 입력 정보 조회
- `studentDetailApi.createMyDetails(request)` - 입력 정보 등록
- `studentDetailApi.updateMyDetails(request)` - 입력 정보 수정

### 장학금
- `scholarshipApi.searchScholarships(params)` - 장학금 검색
- `scholarshipApi.getScholarship(id)` - 장학금 상세 조회
- `scholarshipApi.getScholarships(params)` - 장학금 목록 조회

### 찜
- `wishlistApi.getMyWishlist()` - 내 찜 목록 조회
- `wishlistApi.toggleWishlist(scholarshipId)` - 찜하기 토글

### 지원
- `applicationApi.getApplications(studentId)` - 지원 내역 조회
- `applicationApi.applyScholarship(request)` - 장학금 지원
- `applicationApi.cancelApplication(id)` - 지원 취소

---

## 📞 문의

API 통합 중 문제가 발생하면:
1. 브라우저 콘솔 로그 확인
2. 네트워크 탭에서 API 요청/응답 확인
3. 백엔드 서버 로그 확인

Happy Coding! 🐝