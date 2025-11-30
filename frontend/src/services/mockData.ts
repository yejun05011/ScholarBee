// Mock 데이터
import type {
  Student,
  Scholarship,
  Wishlist,
  Application,
  StudentDetail,
  Qualification,
} from '../types/api';

// Mock 사용자 데이터 저장소
let mockUsers: Array<{
  id: number;
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
  birthDate?: string;
}> = [];

let mockStudentDetails: StudentDetail[] = [];
let mockWishlists: Wishlist[] = [];
let mockApplications: Application[] = [];
let mockQualifications: Qualification[] = [];

let nextUserId = 1;
let nextDetailId = 1;
let nextWishlistId = 1;
let nextApplicationId = 1;
let nextQualificationId = 1;

// Mock 장학금 데이터
export const mockScholarships: Scholarship[] = [
  {
    scholarshipId: 1,
    scholarshipName: "국가장학금 1유형",
    organization: "한국장학재단",
    applicationPeriod: "2025-03-01 ~ 2025-05-31",
    amount: "전액 ~ 350만원",
    selectionCount: 500000,
    minGpa: 2.0,
    eligibilityCriteria: "대한민국 국적, 소득 8분위 이하",
    category: "국가장학금"
  },
  {
    scholarshipId: 2,
    scholarshipName: "국가장학금 2유형",
    organization: "한국장학재단",
    applicationPeriod: "2025-03-01 ~ 2025-05-31",
    amount: "대학 자체 기준",
    selectionCount: 300000,
    minGpa: 3.0,
    eligibilityCriteria: "대한민국 국적, 소득 8분위 이하, 대학 자체 기준 충족",
    category: "국가장학금"
  },
  {
    scholarshipId: 3,
    scholarshipName: "국가우수장학금",
    organization: "한국장학재단",
    applicationPeriod: "2025-02-01 ~ 2025-03-15",
    amount: "등록금 전액 + 생활비",
    selectionCount: 5000,
    minGpa: 3.8,
    eligibilityCriteria: "우수 인재, 성적 우수자",
    category: "국가장학금"
  },
  {
    scholarshipId: 4,
    scholarshipName: "삼성 드림클래스 장학금",
    organization: "삼성전자",
    applicationPeriod: "2025-03-15 ~ 2025-04-30",
    amount: "연 500만원",
    selectionCount: 300,
    minGpa: 3.5,
    eligibilityCriteria: "기초생활수급자 또는 차상위계층, 성적 우수자",
    category: "기업장학금"
  },
  {
    scholarshipId: 5,
    scholarshipName: "현대자동차 정몽구 재단 장학금",
    organization: "정몽구 재단",
    applicationPeriod: "2025-04-01 ~ 2025-05-15",
    amount: "등록금 전액",
    selectionCount: 200,
    minGpa: 3.7,
    eligibilityCriteria: "이공계 전공, 성적 우수자",
    category: "기업장학금"
  },
  {
    scholarshipId: 6,
    scholarshipName: "LG 연암장학금",
    organization: "LG연암문화재단",
    applicationPeriod: "2025-02-15 ~ 2025-04-01",
    amount: "연 1000만원",
    selectionCount: 100,
    minGpa: 3.8,
    eligibilityCriteria: "이공계 전공, 가정형편 곤란, 성적 우수자",
    category: "기업장학금"
  },
  {
    scholarshipId: 7,
    scholarshipName: "SK 청년 JUMP 장학금",
    organization: "SK",
    applicationPeriod: "2025-03-01 ~ 2025-04-15",
    amount: "연 600만원",
    selectionCount: 150,
    minGpa: 3.3,
    eligibilityCriteria: "저소득층, 성적 우수자",
    category: "기업장학금"
  },
  {
    scholarshipId: 8,
    scholarshipName: "미래에셋 박현주재단 장학금",
    organization: "미래에셋박현주재단",
    applicationPeriod: "2025-04-01 ~ 2025-05-31",
    amount: "등록금 전액 + 생활비",
    selectionCount: 80,
    minGpa: 3.6,
    eligibilityCriteria: "경제/경영 전공 우대, 글로벌 인재",
    category: "기업장학금"
  },
  {
    scholarshipId: 9,
    scholarshipName: "서울대학교 우수장학금",
    organization: "서울대학교",
    applicationPeriod: "2025-02-01 ~ 2025-03-01",
    amount: "등록금 전액",
    selectionCount: 500,
    minGpa: 3.9,
    eligibilityCriteria: "서울대 재학생, 성적 우수자",
    category: "대학장학금"
  },
  {
    scholarshipId: 10,
    scholarshipName: "연세대학교 면학장학금",
    organization: "연세대학교",
    applicationPeriod: "2025-02-15 ~ 2025-03-15",
    amount: "등록금 50%",
    selectionCount: 800,
    minGpa: 3.5,
    eligibilityCriteria: "연세대 재학생, 가정형편 곤란",
    category: "대학장학금"
  },
  {
    scholarshipId: 11,
    scholarshipName: "고려대학교 성적우수장학금",
    organization: "고려대학교",
    applicationPeriod: "2025-02-01 ~ 2025-03-01",
    amount: "등록금 전액",
    selectionCount: 600,
    minGpa: 3.8,
    eligibilityCriteria: "고려대 재학생, 직전학기 성적 우수",
    category: "대학장학금"
  },
  {
    scholarshipId: 12,
    scholarshipName: "KAIST 우수학생 장학금",
    organization: "KAIST",
    applicationPeriod: "2025-01-15 ~ 2025-02-28",
    amount: "등록금 전액 + 생활비",
    selectionCount: 1000,
    minGpa: 3.7,
    eligibilityCriteria: "KAIST 재학생, 이공계",
    category: "대학장학금"
  },
  {
    scholarshipId: 13,
    scholarshipName: "포스코 청암재단 장학금",
    organization: "포스코 청암재단",
    applicationPeriod: "2025-03-01 ~ 2025-04-30",
    amount: "연 800만원",
    selectionCount: 120,
    minGpa: 3.7,
    eligibilityCriteria: "이공계 전공, 아시아 지역 학생 포함",
    category: "재단장학금"
  },
  {
    scholarshipId: 14,
    scholarshipName: "아산사회복지재단 장학금",
    organization: "아산사회복지재단",
    applicationPeriod: "2025-04-01 ~ 2025-05-15",
    amount: "등록금 전액",
    selectionCount: 200,
    minGpa: 3.0,
    eligibilityCriteria: "의료/사회복지 분야, 저소득층",
    category: "재단장학금"
  },
  {
    scholarshipId: 15,
    scholarshipName: "풀무원 녹색장학금",
    organization: "풀무원재단",
    applicationPeriod: "2025-03-15 ~ 2025-04-30",
    amount: "연 500만원",
    selectionCount: 100,
    minGpa: 3.4,
    eligibilityCriteria: "환경/농업 관련 전공, 사회공헌 활동",
    category: "재단장학금"
  }
];

// Mock API 함수들
export const mockApi = {
  // 회원가입
  signUp: async (email: string, password: string, name: string) => {
    await delay(300);
    
    // 이메일 중복 체크
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const newUser = {
      id: nextUserId++,
      email,
      password,
      name,
    };

    mockUsers.push(newUser);

    const token = `mock-token-${newUser.id}-${Date.now()}`;
    
    return {
      token,
      student: {
        studentId: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }
    };
  },

  // 로그인
  login: async (email: string, password: string) => {
    await delay(300);
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const token = `mock-token-${user.id}-${Date.now()}`;
    
    return {
      token,
      student: {
        studentId: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate,
      }
    };
  },

  // 학생 정보 조회
  getStudent: async (studentId: number) => {
    await delay(100);
    
    const user = mockUsers.find(u => u.id === studentId);
    
    if (!user) {
      throw new Error('학생 정보를 찾을 수 없습니다.');
    }

    return {
      studentId: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthDate: user.birthDate,
    };
  },

  // 학생 정보 수정
  updateStudent: async (studentId: number, data: any) => {
    await delay(200);
    
    const user = mockUsers.find(u => u.id === studentId);
    
    if (!user) {
      throw new Error('학생 정보를 찾을 수 없습니다.');
    }

    Object.assign(user, data);

    return {
      studentId: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthDate: user.birthDate,
    };
  },

  // 장학금 목록 조회
  getScholarships: async (params?: any) => {
    await delay(200);
    
    return mockScholarships;
  },

  // 장학금 상세 조회
  getScholarship: async (scholarshipId: number) => {
    await delay(100);
    
    const scholarship = mockScholarships.find(s => s.scholarshipId === scholarshipId);
    
    if (!scholarship) {
      throw new Error('장학금 정보를 찾을 수 없습니다.');
    }

    return scholarship;
  },

  // 장학금 검색
  searchScholarships: async (params: any) => {
    await delay(200);
    
    let results = [...mockScholarships];

    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();
      results = results.filter(s => 
        s.scholarshipName.toLowerCase().includes(keyword) ||
        s.organization.toLowerCase().includes(keyword)
      );
    }

    if (params.minGpa !== undefined) {
      results = results.filter(s => s.minGpa <= params.minGpa);
    }

    if (params.category) {
      results = results.filter(s => s.category === params.category);
    }

    return results;
  },

  // 학생 상세정보 조회
  getStudentDetails: async (studentId: number) => {
    await delay(100);
    
    return mockStudentDetails.filter(d => d.studentId === studentId);
  },

  // 학생 상세정보 등록
  createStudentDetail: async (data: any) => {
    await delay(200);
    
    const newDetail: StudentDetail = {
      detailId: nextDetailId++,
      studentId: data.studentId,
      major: data.major,
      grade: data.grade,
      semester: data.semester,
      gpa: data.gpa,
      maxGpa: data.maxGpa,
      region: data.region,
    };

    mockStudentDetails.push(newDetail);

    return newDetail;
  },

  // 학생 상세정보 수정
  updateStudentDetail: async (detailId: number, data: any) => {
    await delay(200);
    
    const detail = mockStudentDetails.find(d => d.detailId === detailId);
    
    if (!detail) {
      throw new Error('학생 상세정보를 찾을 수 없습니다.');
    }

    Object.assign(detail, data);

    return detail;
  },

  // 추천 장학금 조회
  getRecommendations: async (studentId: number) => {
    await delay(200);
    
    // 학생의 GPA 가져오기
    const studentDetails = mockStudentDetails.filter(d => d.studentId === studentId);
    
    if (studentDetails.length === 0) {
      return mockScholarships.slice(0, 5);
    }

    const latestDetail = studentDetails[studentDetails.length - 1];
    const normalizedGpa = (latestDetail.gpa / latestDetail.maxGpa) * 4.5;

    // GPA 기준으로 필터링 및 정렬
    return mockScholarships
      .filter(s => s.minGpa <= normalizedGpa)
      .sort((a, b) => b.minGpa - a.minGpa)
      .slice(0, 10);
  },

  // 찜 목록 조회
  getWishlists: async (studentId: number) => {
    await delay(100);
    
    const wishlists = mockWishlists.filter(w => w.studentId === studentId);
    
    // 장학금 정보와 함께 반환
    return wishlists.map(w => ({
      ...w,
      scholarship: mockScholarships.find(s => s.scholarshipId === w.scholarshipId)
    }));
  },

  // 찜 추가
  createWishlist: async (data: any) => {
    await delay(200);
    
    // 중복 체크
    const existing = mockWishlists.find(
      w => w.studentId === data.studentId && w.scholarshipId === data.scholarshipId
    );

    if (existing) {
      throw new Error('이미 찜한 장학금입니다.');
    }

    const newWishlist: Wishlist = {
      wishlistId: nextWishlistId++,
      studentId: data.studentId,
      scholarshipId: data.scholarshipId,
    };

    mockWishlists.push(newWishlist);

    return newWishlist;
  },

  // 찜 삭제
  deleteWishlist: async (wishlistId: number) => {
    await delay(200);
    
    const index = mockWishlists.findIndex(w => w.wishlistId === wishlistId);
    
    if (index === -1) {
      throw new Error('찜 목록을 찾을 수 없습니다.');
    }

    mockWishlists.splice(index, 1);
  },

  // 지원 내역 조회
  getApplications: async (studentId: number) => {
    await delay(100);
    
    const applications = mockApplications.filter(a => a.studentId === studentId);
    
    // 장학금 정보와 함께 반환
    return applications.map(a => ({
      ...a,
      scholarship: mockScholarships.find(s => s.scholarshipId === a.scholarshipId)
    }));
  },

  // 장학금 지원
  createApplication: async (data: any) => {
    await delay(200);
    
    // 중복 체크
    const existing = mockApplications.find(
      a => a.studentId === data.studentId && a.scholarshipId === data.scholarshipId
    );

    if (existing) {
      throw new Error('이미 지원한 장학금입니다.');
    }

    const newApplication: Application = {
      applicationId: nextApplicationId++,
      studentId: data.studentId,
      scholarshipId: data.scholarshipId,
      applicationDate: new Date().toISOString(),
      status: '제출 완료',
    };

    mockApplications.push(newApplication);

    return newApplication;
  },

  // 지원 취소
  deleteApplication: async (applicationId: number) => {
    await delay(200);
    
    const index = mockApplications.findIndex(a => a.applicationId === applicationId);
    
    if (index === -1) {
      throw new Error('지원 내역을 찾을 수 없습니다.');
    }

    mockApplications.splice(index, 1);
  },

  // 자격증 목록 조회
  getQualifications: async (studentId: number) => {
    await delay(100);
    
    return mockQualifications.filter(q => q.studentId === studentId);
  },

  // 자격증 등록
  createQualification: async (data: any) => {
    await delay(200);
    
    const newQualification: Qualification = {
      qualificationId: nextQualificationId++,
      studentId: data.studentId,
      qualificationName: data.qualificationName,
      issuingOrganization: data.issuingOrganization,
      acquisitionDate: data.acquisitionDate,
    };

    mockQualifications.push(newQualification);

    return newQualification;
  },

  // 자격증 삭제
  deleteQualification: async (qualificationId: number) => {
    await delay(200);
    
    const index = mockQualifications.findIndex(q => q.qualificationId === qualificationId);
    
    if (index === -1) {
      throw new Error('자격증 정보를 찾을 수 없습니다.');
    }

    mockQualifications.splice(index, 1);
  },
};

// 지연 헬퍼 함수
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
