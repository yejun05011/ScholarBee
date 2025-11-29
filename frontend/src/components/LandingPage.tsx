import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "figma:asset/22ff2dd2d57803df308a3f583b6dee64635bfd32.png";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-[1100px] w-full text-center">
        {/* Logo and Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <ImageWithFallback 
              src={logo} 
              alt="ScholarBee Logo" 
              className="w-48 h-48"
            />
          </div>
          
          <h1 className="text-7xl mb-4 tracking-tight">
            ScholarBee
          </h1>
          
          <p className="text-2xl text-gray-600">
            당신의 숨은 장학금을 한눈에!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center mt-12 max-w-3xl mx-auto">
          <Card 
            className="flex-1 p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-gray-300"
            onClick={() => onNavigate('login')}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 17L15 12L10 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl">로그인</h3>
              <p className="text-gray-500">
                이미 계정이 있으신가요?
              </p>
              <Button 
                className="w-full bg-black text-white hover:bg-gray-800 h-11"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('login');
                }}
              >
                로그인하기
              </Button>
            </div>
          </Card>

          <Card 
            className="flex-1 p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-gray-300"
            onClick={() => onNavigate('signup')}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-black flex items-center justify-center mx-auto">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="8.5"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 8V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 11H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl">회원가입</h3>
              <p className="text-gray-500">
                새로운 계정을 만들어보세요
              </p>
              <Button 
                variant="outline"
                className="w-full h-11"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('signup');
                }}
              >
                회원가입하기
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12H18L15 21L9 3L6 12H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4 className="mb-2">맞춤형 추천</h4>
            <p className="text-sm text-gray-500">
              성적 기반 장학금 매칭
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h4 className="mb-2">실시간 업데이트</h4>
            <p className="text-sm text-gray-500">
              최신 장학금 정보 제공
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4 className="mb-2">간편한 관리</h4>
            <p className="text-sm text-gray-500">
              한 곳에서 모든 정보 확인
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
