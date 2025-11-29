import { User, Mail, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface MyPageProps {
  userData: {
    name: string;
    email: string;
    gpa?: number;
    major?: string;
  };
  onNavigate: (page: string) => void;
}

export function MyPage({ userData, onNavigate }: MyPageProps) {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-10 px-8">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-4xl mb-8">마이페이지</h2>

        <div className="grid gap-6">
          <Card className="p-8">
            <h3 className="text-2xl mb-6">프로필 정보</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">이름</p>
                  <p className="text-lg">{userData.name}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">이메일</p>
                  <p className="text-lg">{userData.email}</p>
                </div>
              </div>

              {userData.major && (
                <>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">전공</p>
                      <p className="text-lg">{userData.major}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl mb-6">학업 정보</h3>
            {userData.gpa ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">평점</p>
                  <p className="text-3xl">{userData.gpa.toFixed(2)} / 4.5</p>
                </div>
                <Button
                  onClick={() => onNavigate('my-grades')}
                  variant="outline"
                  className="w-full"
                >
                  성적 상세보기
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">등록된 성적 정보가 없습니다</p>
                <Button
                  onClick={() => onNavigate('my-grades')}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  성적 입력하기
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl mb-6">맞춤 장학금</h3>
            <p className="text-gray-500 mb-4">
              현재 내 성적에 맞는 장학금을 확인해보세요
            </p>
            <Button
              onClick={() => onNavigate('scholarships')}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              장학금 둘러보기
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
