import { useState, useEffect } from "react";
import { User, Mail, GraduationCap, Heart, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useAuth } from "../contexts/AuthContext";
import { wishlistApi, applicationApi } from "../services/api";
import type { Wishlist, Application } from "../types/api";

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
  const { studentId } = useAuth();
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);

  useEffect(() => {
    if (studentId) {
      loadWishlist();
      loadApplications();
    }
  }, [studentId]);

  const loadWishlist = async () => {
    if (!studentId) return;
    
    setLoadingWishlist(true);
    try {
      const data = await wishlistApi.getWishlist(studentId);
      setWishlist(data);
    } catch (error) {
      console.error('찜 목록 불러오기 실패:', error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const loadApplications = async () => {
    if (!studentId) return;
    
    setLoadingApplications(true);
    try {
      const data = await applicationApi.getApplications(studentId);
      setApplications(data);
    } catch (error) {
      console.error('지원 내역 불러오기 실패:', error);
    } finally {
      setLoadingApplications(false);
    }
  };

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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                <h3 className="text-2xl">찜한 장학금</h3>
              </div>
              <Badge variant="outline">{wishlist.length}개</Badge>
            </div>
            
            {loadingWishlist ? (
              <p className="text-gray-500 text-center py-4">로딩 중...</p>
            ) : wishlist.length > 0 ? (
              <div className="space-y-3">
                {wishlist.slice(0, 3).map((item) => (
                  <div key={item.wishlistId} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{item.scholarship?.name || '장학금'}</p>
                    <p className="text-sm text-gray-500">{item.scholarship?.organization || ''}</p>
                  </div>
                ))}
                {wishlist.length > 3 && (
                  <p className="text-sm text-gray-500 text-center pt-2">
                    외 {wishlist.length - 3}개
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">찜한 장학금이 없습니다</p>
            )}
          </Card>

          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-500" />
                <h3 className="text-2xl">지원 내역</h3>
              </div>
              <Badge variant="outline">{applications.length}개</Badge>
            </div>
            
            {loadingApplications ? (
              <p className="text-gray-500 text-center py-4">로딩 중...</p>
            ) : applications.length > 0 ? (
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.applicationId} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{app.scholarship?.name || '장학금'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge>{app.status}</Badge>
                    </div>
                  </div>
                ))}
                {applications.length > 3 && (
                  <p className="text-sm text-gray-500 text-center pt-2">
                    외 {applications.length - 3}개
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">지원 내역이 없습니다</p>
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