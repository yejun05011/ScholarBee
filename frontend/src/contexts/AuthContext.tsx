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
      console.log('🔐 로그인 시작...');
      const response = await authApi.login({ email, password });
      
      console.log('📥 로그인 응답:', response);
      
      // 새로운 API 명세: {accessToken, expiresIn}
      if (!response || !response.accessToken) {
        console.error('❌ 응답 구조 오류:', response);
        throw new Error('로그인 응답이 올바르지 않습니다');
      }
      
      const token = response.accessToken;
      console.log('✅ 토큰 받음:', token.substring(0, 20) + '...');
      
      // 토큰 저장
      localStorage.setItem('authToken', token);
      
      console.log('👤 사용자 정보 조회 중...');
      // 마이페이지 조회로 studentId 가져오기
      const user = await studentApi.getMyProfile();
      
      console.log('✅ 사용자 정보:', user);
      
      if (!user || !user.studentId) {
        console.error('❌ 사용자 정보 오류:', user);
        throw new Error('사용자 정보를 가져올 수 없습니다');
      }
      
      // 학생 ID 저장
      localStorage.setItem('studentId', String(user.studentId));
      
      setCurrentUser(user);
      setStudentId(user.studentId);
      setIsAuthenticated(true);
      
      console.log('🎉 로그인 완료!');
      toast.success('로그인되었습니다');
    } catch (error: any) {
      console.error('❌ 로그인 에러:', error);
      
      // 토큰 정리
      localStorage.removeItem('authToken');
      localStorage.removeItem('studentId');
      setIsAuthenticated(false);
      
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