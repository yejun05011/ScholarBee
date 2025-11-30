# 환경 설정 가이드

## 📁 .env 파일 설정

Scholar Bee 프로젝트는 백엔드 API 서버 주소를 `.env` 파일로 설정합니다.

---

## 🚀 빠른 설정

### 1단계: .env 파일 생성

**프로젝트 루트 폴더**에 `.env` 파일을 만드세요.

```
scholar-bee-project/          ← 프로젝트 루트 폴더
├── .env                      ← 여기에 생성! (package.json과 같은 위치)
├── package.json
├── vite.config.ts
├── index.html
└── src/
    └── ...
```

### 2단계: 내용 작성

`.env` 파일에 다음 내용을 작성하세요:

```env
# 백엔드 API 서버 주소
VITE_API_URL=http://localhost:8080
```

### 3단계: 서버 재시작

```bash
# Ctrl+C로 현재 서버 중지 후
npm run dev
```

---

## 🔧 백엔드 서버 주소 변경

### 로컬 개발 (기본값)
```env
VITE_API_URL=http://localhost:8080
```

### 다른 포트 사용
```env
VITE_API_URL=http://localhost:3000
```

### IP 주소로 접속
```env
VITE_API_URL=http://192.168.0.100:8080
```

### 배포 서버
```env
VITE_API_URL=https://api.scholarbee.com
```

---

## ✅ 설정 확인

### 1. 브라우저 콘솔 확인

개발 서버 실행 후 브라우저(F12)에서 콘솔을 확인하세요:

```
✅ 성공: 🔷 백엔드 API 서버: http://localhost:8080
```

### 2. 백엔드 서버 실행 확인

백엔드 서버가 실행 중이어야 합니다:

```bash
# 백엔드 프로젝트 폴더에서
cd backend
./gradlew bootRun

# 또는
java -jar build/libs/scholar-bee-0.0.1-SNAPSHOT.jar
```

서버가 정상 실행되면:
```
Started ScholarBeeApplication in 3.456 seconds
Tomcat started on port(s): 8080 (http)
```

---

## ⚠️ 주의사항

### ❌ .env 파일이 없으면?

→ 기본값 `http://localhost:8080`이 사용됩니다.

### ❌ 백엔드 서버가 꺼져있으면?

→ 다음과 같은 에러가 표시됩니다:

```
❌ 백엔드 서버에 연결할 수 없습니다.
서버 주소: http://localhost:8080
서버가 실행 중인지 확인해주세요.
```

**해결 방법:** 백엔드 서버를 실행하세요!

### ❌ .env 파일 수정 후 변경사항이 적용 안되면?

→ **서버를 재시작**하세요! (Ctrl+C → `npm run dev`)

---

## 📂 파일 생성 방법

### Windows (메모장)
1. 메모장 열기
2. 내용 작성
3. "다른 이름으로 저장" → 파일명: `.env` → 저장

### Mac/Linux (터미널)
```bash
cd /path/to/scholar-bee-project
touch .env
echo "VITE_API_URL=http://localhost:8080" > .env
```

### VS Code
1. 좌측 파일 탐색기에서 루트 폴더 우클릭
2. "새 파일(New File)" 클릭
3. 파일명: `.env` 입력
4. 내용 작성 후 저장

---

## 🎯 .env 파일 예시

### 로컬 개발용
```env
# Scholar Bee 백엔드 API 서버
VITE_API_URL=http://localhost:8080
```

### 개발 서버용
```env
# 개발 서버 (팀원과 공유)
VITE_API_URL=http://192.168.0.100:8080
```

### 프로덕션용
```env
# 배포 서버
VITE_API_URL=https://api.scholarbee.com
```

---

## 🔐 보안 주의사항

`.env` 파일은 **절대 Git에 커밋하지 마세요!**

`.gitignore` 파일에 다음이 포함되어 있는지 확인:
```gitignore
# 환경 변수 파일
.env
.env.local
.env.production
```

---

## 🆘 문제 해결

### Q1. .env 파일이 어디에 있어야 하나요?
**A:** `package.json`과 같은 위치 (프로젝트 루트)

### Q2. .env 파일 수정 후 변경사항이 없어요
**A:** 서버 재시작 필수! (Ctrl+C → `npm run dev`)

### Q3. VITE_API_URL이 undefined로 나와요
**A:** 
- `.env` 파일이 루트 폴더에 있는지 확인
- 변수명이 `VITE_`로 시작하는지 확인
- 서버 재시작

### Q4. 백엔드 연결이 안돼요
**A:**
1. 백엔드 서버가 실행 중인지 확인
2. 포트 번호가 맞는지 확인 (8080)
3. 방화벽 설정 확인

---

Happy Coding! 🐝
