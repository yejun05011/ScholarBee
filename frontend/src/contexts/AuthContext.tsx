import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, studentApi } from '../services/api';
import type { Student } from '../types/api';
import { toast } from 'sonner@2.0.3';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: Student | null;
  studentId: number | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로드 시 토큰 확인
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedStudentId = localStorage.getItem('studentId');

      if (token && savedStudentId) {
        try {
          const user = await studentApi.getStudent(Number(savedStudentId));
          setCurrentUser(user);
          setStudentId(user.studentId);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('인증 초기화 실패:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('studentId');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      
      console.log('📥 로그인 응답 전체 구조:', JSON.stringify(response, null, 2));
      
      // 응답 데이터 검증 - 여러 형태 지원
      if (!response || typeof response !== 'object') {
        throw new Error('로그인 응답이 올바르지 않습니다');
      }
      
      // 토큰 추출 (여러 필드명 지원)
      const token = response.token || response.accessToken || response.jwt;
      if (!token) {
        console.error('❌ 토큰을 찾을 수 없습니다. 응답:', response);
        throw new Error('토큰을 받지 못했습니다');
      }
      
      // studentId 추출 (여러 형태 지원)
      // 1. response.student.studentId (중첩 구조)
      // 2. response.studentId (직접 필드)
      // 3. 기타 변형들
      let studentId = response.studentId || response.student_id || response.id || response.userId;
      
      // student 객체 안에 있는 경우 처리
      if (!studentId && response.student) {
        studentId = response.student.studentId || response.student.student_id || response.student.id;
      }
      
      if (!studentId) {
        console.error('❌ studentId를 찾을 수 없습니다. 응답:', response);
        console.error('사용 가능한 필드:', Object.keys(response));
        throw new Error('학생 ID를 받지 못했습니다. 백엔드 응답 구조를 확인해주세요.');
      }
      
      console.log('✅ 토큰:', token);
      console.log('✅ studentId:', studentId);
      
      // 토큰과 학생 ID 저장
      localStorage.setItem('authToken', token);
      localStorage.setItem('studentId', String(studentId));
      
      // 학생 정보 조회
      const user = await studentApi.getStudent(Number(studentId));
      
      setCurrentUser(user);
      setStudentId(Number(studentId));
      setIsAuthenticated(true);
      
      toast.success('로그인되었습니다');
    } catch (error: any) {
      console.error('❌ 로그인 에러:', error);
      toast.error(error.message || '로그인에 실패했습니다');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const signUpResponse = await authApi.signUp({ email, password, name });
      
      // 회원가입 후 자동 로그인
      await login(email, password);
      
      toast.success(`환영합니다, ${name}님!`);
    } catch (error: any) {
      toast.error(error.message || '회원가입에 실패했습니다');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('studentId');
    setCurrentUser(null);
    setStudentId(null);
    setIsAuthenticated(false);
    toast.success('로그아웃되었습니다');
  };

  const refreshUser = async () => {
    if (studentId) {
      try {
        const user = await studentApi.getStudent(studentId);
        setCurrentUser(user);
      } catch (error) {
        console.error('사용자 정보 새로고침 실패:', error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        studentId,
        login,
        signUp,
        logout,
        refreshUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}