import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { SignUpPage } from "./components/SignUpPage";
import { LoginPage } from "./components/LoginPage";
import { MyPage } from "./components/MyPage";
import { ScholarshipListPage } from "./components/ScholarshipListPage";
import { ScholarshipDetailModal } from "./components/ScholarshipDetailModal";
import { GradeInputModal, GradeData } from "./components/GradeInputModal";
import { MyGradesPage } from "./components/MyGradesPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { studentDetailApi } from "./services/api";
import type { Scholarship as ApiScholarship, StudentDetail } from "./types/api";

type Page = 'landing' | 'login' | 'signup' | 'scholarships' | 'mypage' | 'my-grades';

interface Scholarship {
  id: number;
  name: string;
  organization: string;
  amount: string;
  deadline: string;
  minGpa: number;
  category: string;
  eligible: boolean;
}

interface UserData {
  name: string;
  email: string;
  gpa?: number;
  major?: string;
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGradeInputModalOpen, setIsGradeInputModalOpen] = useState(false);
  const { isAuthenticated, currentUser, studentId, login, signUp, logout, isLoading } = useAuth();

  // 로그인 시 학생 상세정보 불러오기
  useEffect(() => {
    if (studentId && isAuthenticated) {
      loadStudentDetails();
    }
  }, [studentId, isAuthenticated]);

  const loadStudentDetails = async () => {
    if (!studentId) return;
    
    try {
      const details = await studentDetailApi.getStudentDetails(studentId);
      if (details && details.length > 0) {
        // 가장 최근 상세정보 사용
        const latestDetail = details[details.length - 1];
        setGradeData({
          university: latestDetail.region || "",
          major: latestDetail.major,
          year: latestDetail.grade.toString(),
          semester: latestDetail.semester,
          gpa: latestDetail.gpa,
          maxGpa: latestDetail.maxGpa,
        });
      }
    } catch (error) {
      console.error('학생 상세정보 불러오기 실패:', error);
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      await signUp(email, password, name);
      setCurrentPage('scholarships');
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      // ApiError인 경우 메시지 표시
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error('회원가입에 실패했습니다.');
      }
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setCurrentPage('scholarships');
    } catch (error: any) {
      console.error('로그인 실패:', error);
      // ApiError인 경우 메시지 표시
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error('로그인에 실패했습니다.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    setGradeData(null);
    setCurrentPage('landing');
  };

  const handleSaveGrade = async (data: GradeData) => {
    setGradeData(data);
    
    // API에 저장
    if (studentId) {
      try {
        const detailRequest = {
          studentId,
          semester: data.semester,
          gpa: data.gpa,
          maxGpa: data.maxGpa,
          income: 0, // 기본값
          region: data.university,
          major: data.major,
          grade: parseInt(data.year),
        };
        
        await studentDetailApi.createStudentDetail(detailRequest);
        toast.success("성적 정보가 저장되었습니다");
      } catch (error) {
        console.error('성적 정보 저장 실패:', error);
        toast.error("성적 정보 저장에 실패했습니다");
      }
    }
  };

  const handleOpenDetail = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailModalOpen(true);
  };

  const handleOpenGradeInput = () => {
    setIsGradeInputModalOpen(true);
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  const userData: UserData | null = currentUser ? {
    name: currentUser.name,
    email: currentUser.email,
    gpa: gradeData ? (gradeData.gpa / gradeData.maxGpa) * 4.5 : undefined,
    major: gradeData?.major,
  } : null;

  const renderPage = () => {
    if (!isAuthenticated) {
      if (currentPage === 'signup') {
        return <SignUpPage onNavigate={setCurrentPage} onSignUp={handleSignUp} />;
      }
      if (currentPage === 'login') {
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      }
      return <LandingPage onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'scholarships':
        return (
          <ScholarshipListPage
            userGpa={userData?.gpa}
            onOpenDetail={handleOpenDetail}
            onOpenGradeInput={handleOpenGradeInput}
          />
        );
      case 'mypage':
        return userData ? (
          <MyPage userData={userData} onNavigate={setCurrentPage} />
        ) : null;
      case 'my-grades':
        return (
          <MyGradesPage
            gradeData={gradeData}
            onOpenGradeInput={handleOpenGradeInput}
          />
        );
      default:
        return (
          <ScholarshipListPage
            userGpa={userData?.gpa}
            onOpenDetail={handleOpenDetail}
            onOpenGradeInput={handleOpenGradeInput}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white w-screen overflow-x-hidden">
      {currentPage !== 'landing' && (
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isLoggedIn={isAuthenticated}
          onLogout={handleLogout}
        />
      )}
      {renderPage()}
      
      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
      
      <GradeInputModal
        isOpen={isGradeInputModalOpen}
        onClose={() => setIsGradeInputModalOpen(false)}
        onSave={handleSaveGrade}
        initialData={gradeData || undefined}
      />
      
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}