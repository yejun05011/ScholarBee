# Scholar Bee API 연동 가이드

## 개요

이 문서는 Scholar Bee 프론트엔드와 백엔드 API 연동에 대한 가이드입니다.

## 구조

### 1. 타입 정의 (`/types/api.ts`)
- 모든 API 요청/응답에 대한 TypeScript 타입 정의
- 백엔드 API 명세서와 일치하는 인터페이스 제공

### 2. API 서비스 레이어 (`/services/api.ts`)
- 모든 API 호출을 추상화한 함수들
- 인증 토큰 자동 처리
- 에러 핸들링 통합

### 3. 인증 컨텍스트 (`/contexts/AuthContext.tsx`)
- 사용자 인증 상태 관리
- 로그인/회원가입/로그아웃 기능
- 토큰 자동 저장 및 복원

## 설정 방법

### 1. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가:

```env
VITE_API_URL=http://localhost:8080
```

백엔드 서버 주소에 맞게 URL을 변경하세요.

**백엔드 서버가 없을 때**: Mock 모드로 개발 및 테스트 가능 (추후 구현 예정)

```env
VITE_API_URL=http://localhost:8080
VITE_USE_MOCK=true
```

### 2. API 서버 실행

백엔드 API 서버가 실행 중이어야 합니다. 기본 포트는 8080입니다.

## API 구현 상태

### ✅ 완료된 기능

1. **인증 (Auth)**
   - ✅ 회원가입 (`POST /api/auth/signup`)
   - ✅ 로그인 (`POST /api/auth/login`)
   - ✅ 자동 로그인 (토큰 기반)

2. **학생 정보 (Student)**
   - ✅ 학생 정보 조회 (`GET /api/students/{studentId}`)
   - ✅ 학생 정보 수정 (`PUT /api/students/{studentId}`)
   - ✅ 학생 계정 삭제 (`DELETE /api/students/{studentId}`)

3. **장학금 (Scholarship)**
   - ✅ 장학금 목록 조회 (`GET /api/scholarships`)
   - ✅ 장학금 상세 조회 (`GET /api/scholarships/{scholarshipId}`)
   - ✅ 장학금 검색 (`GET /api/scholarships/search`)

4. **학생 상세정보 (Student Detail)**
   - ✅ 상세정보 조회 (`GET /api/student-details/{studentId}`)
   - ✅ 상세정보 등록 (`POST /api/student-details`)
   - ✅ 상세정보 수정 (`PUT /api/student-details/{detailId}`)

5. **추천 장학금 (Recommendation)**
   - ✅ 맞춤 추천 조회 (`GET /api/recommendations/{studentId}`)

### 🔄 부분 구현 (준비됨, UI 연동 필요)

6. **찜 목록 (Wishlist)**
   - ✅ API 함수 준비됨
   - ⏳ UI 연동 필요

7. **지원 내역 (Application)**
   - ✅ API 함수 준비됨
   - ⏳ UI 연동 필요

8. **자격증 (Qualification)**
   - ✅ API 함수 준비됨
   - ⏳ UI 연동 필요

## 사용 예시

### 1. 인증 사용하기

```tsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { isAuthenticated, currentUser, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      // 로그인 성공
    } catch (error) {
      // 에러 처리
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>환영합니다, {currentUser?.name}님</p>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}
    </div>
  );
}
```

### 2. API 직접 호출하기

```tsx
import { scholarshipApi } from './services/api';

async function loadScholarships() {
  try {
    const scholarships = await scholarshipApi.getScholarships({
      page: 0,
      size: 20
    });
    console.log(scholarships);
  } catch (error) {
    console.error('장학금 목록 불러오기 실패:', error);
  }
}
```

### 3. 검색 기능 사용하기

```tsx
import { scholarshipApi } from './services/api';

async function searchScholarships(keyword: string) {
  try {
    const results = await scholarshipApi.searchScholarships({
      keyword,
      minGpa: 3.0
    });
    return results;
  } catch (error) {
    console.error('검색 실패:', error);
    return [];
  }
}
```

## 에러 처리

API 호출 시 다음과 같은 에러가 발생할 수 있습니다:

- **401 Unauthorized**: 인증 토큰이 없거나 만료됨 → 로그인 필요
- **403 Forbidden**: 권한 없음
- **404 Not Found**: 리소스를 찾을 수 없음
- **500 Internal Server Error**: 서버 오류

```tsx
import { ApiError } from './services/api';

try {
  await api.someFunction();
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      // 로그인 페이지로 이동
    } else {
      // 다른 에러 처리
    }
  }
}
```

## 토큰 관리

- 로그인 성공 시 토큰이 `localStorage`에 자동 저장됩니다
- 모든 API 요청 시 토큰이 자동으로 헤더에 포함됩니다
- 페이지 새로고침 시 토큰이 자동으로 복원됩니다
- 로그아웃 시 토큰이 자동으로 삭제됩니다

## 개발 시 주의사항

### 1. CORS 설정
백엔드에서 CORS를 허용해야 합니다:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

### 2. Mock 데이터
API 서버가 없는 경우, 현재 코드는 자동으로 Mock 데이터로 fallback됩니다.

### 3. 환경별 설정
- 개발: `http://localhost:8080`
- 프로덕션: 실제 서버 URL로 변경 필요

## 테스트

### API 연결 테스트

1. 백엔드 서버 실행 확인
2. 브라우저 개발자 도구 → Network 탭 열기
3. 로그인 시도
4. API 요청이 정상적으로 전송되는지 확인

### 디버깅

모든 API 호출은 콘솔에 로그가 출력됩니다:
```
장학금 목록 불러오기 실패: [에러 메시지]
```

## 추가 구현 필요 항목

1. **찜 목록 UI**
   - 장학금 상세 페이지에 찜 버튼 추가
   - 마이페이지에 찜 목록 표시

2. **지원 내역 UI**
   - 장학금 지원 기능 추가
   - 마이페이지에 지원 내역 표시

3. **자격증 관리 UI**
   - 자격증 추가/삭제 기능
   - 마이페이지에 자격증 목록 표시

## 문의

API 연동 관련 문제가 있으면 개발팀에 문의하세요.
- 개발자: Junseo, xxvl