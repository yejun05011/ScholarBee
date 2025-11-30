// API 서비스 레이어
import type {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  Student,
  UpdateStudentRequest,
  Scholarship,
  ScholarshipSearchParams,
  PaginationParams,
  Wishlist,
  CreateWishlistRequest,
  CreateWishlistResponse,
  Application,
  CreateApplicationRequest,
  CreateApplicationResponse,
  StudentDetail,
  CreateStudentDetailRequest,
  CreateStudentDetailResponse,
  UpdateStudentDetailRequest,
  Qualification,
  CreateQualificationRequest,
  CreateQualificationResponse,
} from '../types/api';
import { mockApi } from './mockData';

// API 베이스 URL - 환경에 맞게 변경
const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:8080';

// Mock 모드 활성화 여부 (백엔드 서버가 없을 때 사용)
// .env 파일이 없거나 VITE_USE_MOCK이 설정되지 않은 경우 기본값은 true (개발 편의성)
const USE_MOCK = typeof import.meta !== 'undefined' 
  ? (import.meta.env?.VITE_USE_MOCK === 'true' || import.meta.env?.VITE_USE_MOCK === undefined)
  : true;

// Mock 모드 메시지 출력
if (USE_MOCK) {
  console.log('🔶 Mock 모드로 실행 중입니다. 실제 백엔드 서버는 사용하지 않습니다.');
  console.log('💡 실제 백엔드 서버를 사용하려면 .env 파일에 VITE_USE_MOCK=false를 설정하세요.');
} else {
  console.log('🔷 실제 백엔드 서버 모드로 실행 중입니다:', API_BASE_URL);
}

// API 에러 처리
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// HTTP 요청 헬퍼
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const token = localStorage.getItem('authToken');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 204 No Content 처리
    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.message || 'API 요청 실패');
    }

    return data;
  } catch (error) {
    // 네트워크 에러 (백엔드 서버 미실행)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new ApiError(
        0,
        '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.\n' +
        `서버 주소: ${API_BASE_URL}\n\n` +
        'Mock 데이터로 테스트하려면 .env 파일에 다음을 추가하세요:\n' +
        'VITE_USE_MOCK=true'
      );
    }
    throw error;
  }
}

// ===== 인증 API =====

export const authApi = {
  // 회원가입
  signUp: async (request: SignUpRequest): Promise<SignUpResponse> => {
    if (USE_MOCK) {
      return mockApi.signUp(request.email, request.password, request.name);
    }
    return fetchApi<SignUpResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 로그인
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    if (USE_MOCK) {
      return mockApi.login(request.email, request.password);
    }
    return fetchApi<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },
};

// ===== 학생 API =====

export const studentApi = {
  // 학생 정보 조회
  getStudent: async (studentId: number): Promise<Student> => {
    if (USE_MOCK) {
      return mockApi.getStudent(studentId);
    }
    return fetchApi<Student>(`/api/students/${studentId}`);
  },

  // 학생 정보 수정
  updateStudent: async (
    studentId: number,
    request: UpdateStudentRequest
  ): Promise<Student> => {
    if (USE_MOCK) {
      return mockApi.updateStudent(studentId, request);
    }
    return fetchApi<Student>(`/api/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  },

  // 학생 계정 삭제
  deleteStudent: async (studentId: number): Promise<void> => {
    return fetchApi<void>(`/api/students/${studentId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 장학금 API =====

export const scholarshipApi = {
  // 장학금 목록 조회
  getScholarships: async (params?: PaginationParams): Promise<Scholarship[]> => {
    if (USE_MOCK) {
      return mockApi.getScholarships(params);
    }
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return fetchApi<Scholarship[]>(
      `/api/scholarships${queryString ? `?${queryString}` : ''}`
    );
  },

  // 장학금 상세 조회
  getScholarship: async (scholarshipId: number): Promise<Scholarship> => {
    if (USE_MOCK) {
      return mockApi.getScholarship(scholarshipId);
    }
    return fetchApi<Scholarship>(`/api/scholarships/${scholarshipId}`);
  },

  // 장학금 검색
  searchScholarships: async (
    params: ScholarshipSearchParams
  ): Promise<Scholarship[]> => {
    if (USE_MOCK) {
      return mockApi.searchScholarships(params);
    }
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return fetchApi<Scholarship[]>(
      `/api/scholarships/search?${queryString}`
    );
  },
};

// ===== 찜 목록 API =====

export const wishlistApi = {
  // 찜 목록 조회
  getWishlist: async (studentId: number): Promise<Wishlist[]> => {
    if (USE_MOCK) {
      return mockApi.getWishlists(studentId);
    }
    return fetchApi<Wishlist[]>(`/api/wishlist/${studentId}`);
  },

  // 찜 추가
  addWishlist: async (
    request: CreateWishlistRequest
  ): Promise<CreateWishlistResponse> => {
    if (USE_MOCK) {
      return mockApi.createWishlist(request);
    }
    return fetchApi<CreateWishlistResponse>('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 찜 삭제
  deleteWishlist: async (wishlistId: number): Promise<void> => {
    if (USE_MOCK) {
      return mockApi.deleteWishlist(wishlistId);
    }
    return fetchApi<void>(`/api/wishlist/${wishlistId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 지원 내역 API =====

export const applicationApi = {
  // 지원 내역 조회
  getApplications: async (studentId: number): Promise<Application[]> => {
    if (USE_MOCK) {
      return mockApi.getApplications(studentId);
    }
    return fetchApi<Application[]>(`/api/applications/${studentId}`);
  },

  // 장학금 지원
  applyScholarship: async (
    request: CreateApplicationRequest
  ): Promise<CreateApplicationResponse> => {
    if (USE_MOCK) {
      return mockApi.createApplication(request);
    }
    return fetchApi<CreateApplicationResponse>('/api/applications', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 지원 취소
  cancelApplication: async (applicationId: number): Promise<void> => {
    if (USE_MOCK) {
      return mockApi.deleteApplication(applicationId);
    }
    return fetchApi<void>(`/api/applications/${applicationId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 학생 상세정보 API =====

export const studentDetailApi = {
  // 학생 상세정보 조회
  getStudentDetails: async (studentId: number): Promise<StudentDetail[]> => {
    if (USE_MOCK) {
      return mockApi.getStudentDetails(studentId);
    }
    return fetchApi<StudentDetail[]>(`/api/student-details/${studentId}`);
  },

  // 학생 상세정보 등록
  createStudentDetail: async (
    request: CreateStudentDetailRequest
  ): Promise<CreateStudentDetailResponse> => {
    if (USE_MOCK) {
      return mockApi.createStudentDetail(request);
    }
    return fetchApi<CreateStudentDetailResponse>('/api/student-details', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 학생 상세정보 수정
  updateStudentDetail: async (
    detailId: number,
    request: UpdateStudentDetailRequest
  ): Promise<StudentDetail> => {
    if (USE_MOCK) {
      return mockApi.updateStudentDetail(detailId, request);
    }
    return fetchApi<StudentDetail>(`/api/student-details/${detailId}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  },
};

// ===== 자격증 API =====

export const qualificationApi = {
  // 자격증 목록 조회
  getQualifications: async (studentId: number): Promise<Qualification[]> => {
    if (USE_MOCK) {
      return mockApi.getQualifications(studentId);
    }
    return fetchApi<Qualification[]>(`/api/qualifications/${studentId}`);
  },

  // 자격증 등록
  createQualification: async (
    request: CreateQualificationRequest
  ): Promise<CreateQualificationResponse> => {
    if (USE_MOCK) {
      return mockApi.createQualification(request);
    }
    return fetchApi<CreateQualificationResponse>('/api/qualifications', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 자격증 삭제
  deleteQualification: async (qualificationId: number): Promise<void> => {
    if (USE_MOCK) {
      return mockApi.deleteQualification(qualificationId);
    }
    return fetchApi<void>(`/api/qualifications/${qualificationId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 추천 장학금 API =====

export const recommendationApi = {
  // 추천 장학금 조회
  getRecommendations: async (studentId: number): Promise<Scholarship[]> => {
    if (USE_MOCK) {
      return mockApi.getRecommendations(studentId);
    }
    return fetchApi<Scholarship[]>(`/api/recommendations/${studentId}`);
  },
};

// API 에러 익스포트
export { ApiError };