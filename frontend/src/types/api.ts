// API 타입 정의

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
  organization: string;
  amount: string;
  deadline: string;
  minGpa: number;
  category: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  applicationUrl?: string;
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

export interface StudentDetail {
  detailId: number;
  studentId: number;
  semester: string;
  gpa: number;
  maxGpa: number;
  income: number;
  region: string;
  major: string;
  grade: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Qualification {
  qualificationId: number;
  studentId: number;
  name: string;
  issueDate: string;
  issuer: string;
  createdAt?: string;
}

// API 요청 타입
export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateStudentRequest {
  name?: string;
  email?: string;
}

export interface CreateWishlistRequest {
  studentId: number;
  scholarshipId: number;
}

export interface CreateApplicationRequest {
  studentId: number;
  scholarshipId: number;
}

export interface CreateStudentDetailRequest {
  studentId: number;
  semester: string;
  gpa: number;
  maxGpa: number;
  income: number;
  region: string;
  major: string;
  grade: number;
}

export interface UpdateStudentDetailRequest {
  semester?: string;
  gpa?: number;
  maxGpa?: number;
  income?: number;
  region?: string;
  major?: string;
  grade?: number;
}

export interface CreateQualificationRequest {
  studentId: number;
  name: string;
  issueDate: string;
  issuer: string;
}

// API 응답 타입
export interface SignUpResponse {
  studentId: number;
  message: string;
}

export interface LoginResponse {
  token: string;
  studentId: number;
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

// 검색 파라미터
export interface ScholarshipSearchParams {
  keyword?: string;
  category?: string;
  amount?: string;
  minGpa?: number;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}
