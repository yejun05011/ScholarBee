import { useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGradeInputModalOpen, setIsGradeInputModalOpen] = useState(false);

  const handleSignUp = (email: string, password: string, name: string) => {
    // Mock signup - in production, this would call an API
    setUserData({ name, email });
    setIsLoggedIn(true);
    setCurrentPage('scholarships');
    toast.success(`환영합니다, ${name}님!`);
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - in production, this would call an API
    setUserData({ name: "홍길동", email });
    setIsLoggedIn(true);
    setCurrentPage('scholarships');
    toast.success("로그인 되었습니다");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setGradeData(null);
    setCurrentPage('landing');
    toast.success("로그아웃 되었습니다");
  };

  const handleSaveGrade = (data: GradeData) => {
    setGradeData(data);
    if (userData) {
      setUserData({
        ...userData,
        gpa: (data.gpa / data.maxGpa) * 4.5,
        major: data.major,
      });
    }
    toast.success("성적 정보가 저장되었습니다");
  };

  const handleOpenDetail = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailModalOpen(true);
  };

  const handleOpenGradeInput = () => {
    setIsGradeInputModalOpen(true);
  };

  const renderPage = () => {
    if (!isLoggedIn) {
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
          isLoggedIn={isLoggedIn}
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
