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
  WishlistToggleResponse,
  Application,
  CreateApplicationRequest,
  CreateApplicationResponse,
  StudentDetail,
  CreateStudentDetailRequest,
  UpdateStudentDetailRequest,
  Qualification,
  CreateQualificationRequest,
  CreateQualificationResponse,
  ApiResponse,
} from '../types/api';

// API 베이스 URL
const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:8080';

console.log('🔷 백엔드 API 서버:', API_BASE_URL);

// API 에러 처리
class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

// HTTP 요청 헬퍼 - 새로운 응답 구조 {isSuccess, code, message, data} 처리
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

    console.log(`📤 API 요청 [${endpoint}]:`, options.body ? JSON.parse(options.body as string) : '');

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 204 No Content 처리
    if (response.status === 204) {
      console.log(`📡 API 응답 [${endpoint}]: 204 No Content`);
      return undefined as T;
    }

    // JSON 파싱 전 Content-Type 확인
    const contentType = response.headers.get('content-type');
    let responseData: ApiResponse<T> | any;
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      // JSON이 아닌 경우 텍스트로 처리
      const text = await response.text();
      console.warn('⚠️ 응답이 JSON이 아닙니다:', text);
      responseData = text ? { message: text } : {};
    }

    // API 응답 로깅
    console.log(`📡 API 응답 [${endpoint}]:`, responseData);

    // 에러 처리
    if (!response.ok) {
      const errorMessage = responseData.message || responseData.error || 'API 요청 실패';
      console.error(`❌ API 에러 [${endpoint}]:`, errorMessage);
      throw new ApiError(response.status, errorMessage, responseData);
    }

    // 새로운 응답 구조: {isSuccess, code, message, data}
    // data 필드가 있으면 data를 반환, 없으면 전체 응답 반환
    if (responseData && typeof responseData === 'object' && 'data' in responseData) {
      console.log(`✅ 데이터 추출 [${endpoint}]:`, responseData.data);
      return responseData.data as T;
    }

    console.log(`✅ 전체 응답 반환 [${endpoint}]:`, responseData);
    return responseData as T;
  } catch (error) {
    // 네트워크 에러 (백엔드 서버 미실행)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error(`❌ 네트워크 에러:`, error);
      throw new ApiError(
        0,
        `백엔드 서버에 연결할 수 없습니다.\n서버 주소: ${API_BASE_URL}\n서버가 실행 중인지 확인해주세요.`
      );
    }
    throw error;
  }
}

// ===== 인증 API =====

export const authApi = {
  // 회원가입 - POST /api/v1/auth/signup
  signUp: async (request: SignUpRequest): Promise<SignUpResponse> => {
    console.log('📤 회원가입 요청:', request);
    return fetchApi<SignUpResponse>('/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 로그인 - POST /api/v1/auth/login
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    console.log('📤 로그인 요청:', request);
    return fetchApi<LoginResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },
};

// ===== 학생 API =====

export const studentApi = {
  // 마이페이지 조회 - GET /api/v1/students/me
  getMyProfile: async (): Promise<Student> => {
    return fetchApi<Student>('/api/v1/students/me');
  },

  // 학생 정보 조회 (ID로)
  getStudent: async (studentId: number): Promise<Student> => {
    return fetchApi<Student>(`/api/v1/students/${studentId}`);
  },

  // 내 정보 수정 - PATCH /api/v1/students/me/details
  updateMyProfile: async (request: UpdateStudentRequest): Promise<void> => {
    return fetchApi<void>('/api/v1/students/me/details', {
      method: 'PATCH',
      body: JSON.stringify(request),
    });
  },

  // 학생 계정 삭제
  deleteStudent: async (studentId: number): Promise<void> => {
    return fetchApi<void>(`/api/v1/students/${studentId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 장학금 API =====

export const scholarshipApi = {
  // 장학금 검색 - GET /api/v1/scholarships?keyword=...&minGpa=...&maxIncome=...
  searchScholarships: async (params?: ScholarshipSearchParams): Promise<Scholarship[]> => {
    const queryParams = new URLSearchParams();
    if (params?.keyword) queryParams.append('keyword', params.keyword);
    if (params?.minGpa !== undefined) queryParams.append('minGpa', params.minGpa.toString());
    if (params?.maxIncome !== undefined) queryParams.append('maxIncome', params.maxIncome.toString());
    if (params?.category) queryParams.append('category', params.category);
    
    const queryString = queryParams.toString();
    return fetchApi<Scholarship[]>(
      `/api/v1/scholarships${queryString ? `?${queryString}` : ''}`
    );
  },

  // 장학금 상세 조회 - GET /api/v1/scholarships/{scholarshipId}
  getScholarship: async (scholarshipId: number): Promise<Scholarship> => {
    return fetchApi<Scholarship>(`/api/v1/scholarships/${scholarshipId}`);
  },

  // 장학금 목록 조회 (페이지네이션)
  getScholarships: async (params?: PaginationParams): Promise<Scholarship[]> => {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return fetchApi<Scholarship[]>(
      `/api/v1/scholarships${queryString ? `?${queryString}` : ''}`
    );
  },

  // 장학금 삭제 - DELETE /api/v1/scholarships/{scholarshipId}
  deleteScholarship: async (scholarshipId: number): Promise<{ deletedScholarshipId: number }> => {
    return fetchApi<{ deletedScholarshipId: number }>(`/api/v1/scholarships/${scholarshipId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 찜 목록 API =====

export const wishlistApi = {
  // 찜한 장학금 목록 조회 - GET /api/v1/students/me/wishlists/scholarships
  getMyWishlist: async (): Promise<Scholarship[]> => {
    return fetchApi<Scholarship[]>('/api/v1/students/me/wishlists/scholarships');
  },

  // 장학금 찜하기 (토글) - POST /api/v1/scholarships/{scholarshipId}/wishlists
  toggleWishlist: async (scholarshipId: number): Promise<WishlistToggleResponse> => {
    return fetchApi<WishlistToggleResponse>(`/api/v1/scholarships/${scholarshipId}/wishlists`, {
      method: 'POST',
    });
  },
};

// ===== 지원 내역 API =====

export const applicationApi = {
  // 지원 내역 조회
  getApplications: async (studentId: number): Promise<Application[]> => {
    return fetchApi<Application[]>(`/api/v1/applications/${studentId}`);
  },

  // 장학금 지원
  applyScholarship: async (
    request: CreateApplicationRequest
  ): Promise<CreateApplicationResponse> => {
    return fetchApi<CreateApplicationResponse>('/api/v1/applications', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 지원 취소
  cancelApplication: async (applicationId: number): Promise<void> => {
    return fetchApi<void>(`/api/v1/applications/${applicationId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 학생 상세정보 API =====

export const studentDetailApi = {
  // 입력 정보 조회 - GET /api/v1/students/me/details
  getMyDetails: async (): Promise<StudentDetail> => {
    return fetchApi<StudentDetail>('/api/v1/students/me/details');
  },

  // 학생 상세정보 조회 (ID로)
  getStudentDetails: async (studentId: number): Promise<StudentDetail> => {
    return fetchApi<StudentDetail>(`/api/v1/students/${studentId}/details`);
  },

  // 확정 입력 (등록) - POST /api/v1/students/me/details
  createMyDetails: async (request: CreateStudentDetailRequest): Promise<void> => {
    return fetchApi<void>('/api/v1/students/me/details', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 학생 상세정보 수정 - PATCH /api/v1/students/me/details
  updateMyDetails: async (request: UpdateStudentDetailRequest): Promise<void> => {
    return fetchApi<void>('/api/v1/students/me/details', {
      method: 'PATCH',
      body: JSON.stringify(request),
    });
  },
};

// ===== 자격증 API =====

export const qualificationApi = {
  // 자격증 목록 조회
  getQualifications: async (studentId: number): Promise<Qualification[]> => {
    return fetchApi<Qualification[]>(`/api/v1/qualifications/${studentId}`);
  },

  // 자격증 등록
  createQualification: async (
    request: CreateQualificationRequest
  ): Promise<CreateQualificationResponse> => {
    return fetchApi<CreateQualificationResponse>('/api/v1/qualifications', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // 자격증 삭제
  deleteQualification: async (qualificationId: number): Promise<void> => {
    return fetchApi<void>(`/api/v1/qualifications/${qualificationId}`, {
      method: 'DELETE',
    });
  },
};

// ===== 추천 장학금 API =====

export const recommendationApi = {
  // 추천 장학금 조회
  getRecommendations: async (studentId: number): Promise<Scholarship[]> => {
    return fetchApi<Scholarship[]>(`/api/v1/recommendations/${studentId}`);
  },
};

// API 에러 익스포트
export { ApiError };