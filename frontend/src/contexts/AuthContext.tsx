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
      
      // 토큰과 학생 ID 저장
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('studentId', response.studentId.toString());
      
      // 학생 정보 조회
      const user = await studentApi.getStudent(response.studentId);
      
      setCurrentUser(user);
      setStudentId(response.studentId);
      setIsAuthenticated(true);
      
      toast.success('로그인되었습니다');
    } catch (error: any) {
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
