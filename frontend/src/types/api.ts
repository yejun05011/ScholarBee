// API 타입 정의

// ===== 공통 응답 래퍼 타입 =====
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}

export interface Student {
  studentId: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Scholarship {
  scholarshipId: number;
  name: string;
  foundation: string;  // organization -> foundation (명세서 반영)
  amount: string;
  apply_start: string;  // 명세서 필드명 반영
  apply_end: string;    // deadline -> apply_end (명세서 반영)
  minGpa?: number;
  maxIncome?: number;   // 소득분위 상한
  category?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  applicationUrl?: string;
  requiredDocuments?: string[];  // 필요 서류 리스트
}

export interface Wishlist {
  wishlistId: number;
  studentId: number;
  scholarshipId: number;
  createdAt: string;
  scholarship?: Scholarship;
}

export interface Application {
  applicationId: number;
  studentId: number;
  scholarshipId: number;
  status: string;
  appliedAt: string;
  scholarship?: Scholarship;
}

// 학생 상세 정보 (성적, 소득분위 등)
export interface StudentDetail {
  studentId: number;
  gpa: number;           // 평점 (4.5 만점)
  grade: number;         // 학년 (1~4)
  semester?: number;     // 이수 학기
  department: string;    // 학과/전공
  doubleMajor?: string;  // 부전공/이중전공 (선택)
  isDoubleMajor?: boolean;  // 이중전공 여부
  isDisabled: boolean;   // 장애 여부
  incomeBracket: number; // 소득분위 (1~10)
  volunteers?: Volunteer[];  // 봉사활동
  certificates?: Certificate[];  // 자격증
  createdAt?: string;
  updatedAt?: string;
}

// 봉사활동
export interface Volunteer {
  name: string;         // 봉사활동명
  hours: number;        // 봉사시간
  date: string;         // 봉사일자
  organization: string; // 기관명
}

// 자격증
export interface Certificate {
  name: string;         // 자격증명
  issueDate: string;    // 발급일
  issuer: string;       // 발급기관
}

export interface Qualification {
  qualificationId: number;
  studentId: number;
  name: string;
  issueDate: string;
  issuer: string;
  createdAt?: string;
}

// ===== API 요청 타입 =====

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateStudentRequest {
  name?: string;
  major?: string;
  password?: string;
}

export interface CreateWishlistRequest {
  studentId: number;
  scholarshipId: number;
}

export interface CreateApplicationRequest {
  studentId: number;
  scholarshipId: number;
}

// 학생 상세 정보 등록/수정 요청
export interface CreateStudentDetailRequest {
  grade: number;
  department: string;
  isDisabled: boolean;
  incomeBracket: number;
  gpa?: number;
  semester?: number;
  doubleMajor?: string;
  isDoubleMajor?: boolean;
  volunteers?: Volunteer[];
  certificates?: Certificate[];
}

export interface UpdateStudentDetailRequest {
  grade?: number;
  department?: string;
  isDisabled?: boolean;
  incomeBracket?: number;
  gpa?: number;
  semester?: number;
  doubleMajor?: string;
  isDoubleMajor?: boolean;
  volunteers?: Volunteer[];
  certificates?: Certificate[];
}

export interface CreateQualificationRequest {
  studentId: number;
  name: string;
  issueDate: string;
  issuer: string;
}

// ===== API 응답 타입 =====

// 회원가입 응답: data: {studentId, email}
export interface SignUpResponse {
  studentId: number;
  email: string;
}

// 로그인 응답: data: {accessToken, expiresIn}
export interface LoginResponse {
  accessToken: string;
  expiresIn: number;  // 토큰 만료 시간(초)
}

// 찜하기 토글 응답
export interface WishlistToggleResponse {
  isWished: boolean;
}

export interface CreateWishlistResponse {
  wishlistId: number;
}

export interface CreateApplicationResponse {
  applicationId: number;
}

export interface CreateStudentDetailResponse {
  detailId: number;
}

export interface CreateQualificationResponse {
  qualificationId: number;
}

// ===== 검색 파라미터 =====

export interface ScholarshipSearchParams {
  keyword?: string;
  category?: string;
  amount?: string;
  minGpa?: number;
  maxIncome?: number;  // 소득분위 상한 (명세서 반영)
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}