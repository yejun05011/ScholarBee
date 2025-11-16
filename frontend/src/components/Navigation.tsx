import { Menu, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "figma:asset/22ff2dd2d57803df308a3f583b6dee64635bfd32.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, isLoggedIn, onLogout }: NavigationProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-[1300px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-3"
            onClick={() => onNavigate(isLoggedIn ? 'scholarships' : 'landing')}
          >
            <ImageWithFallback 
              src={logo} 
              alt="ScholarBee Logo" 
              className="h-10 w-10"
            />
            <h1 className="text-2xl">ScholarBee</h1>
          </div>

          <div className="flex items-center gap-8">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('scholarships')}
                  className={`transition-colors ${
                    currentPage === 'scholarships' ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  장학금 찾기
                </button>
                <button
                  onClick={() => onNavigate('my-grades')}
                  className={`transition-colors ${
                    currentPage === 'my-grades' ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  내 성적
                </button>
                <button
                  onClick={() => onNavigate('mypage')}
                  className={`transition-colors ${
                    currentPage === 'mypage' ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  마이페이지
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="text-gray-500 hover:text-black"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  로그인
                </button>
                <Button
                  onClick={() => onNavigate('signup')}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  회원가입
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
