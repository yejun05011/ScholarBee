import { useState, useEffect } from "react";
import { Search, DollarSign, Calendar, Award } from "lucide-react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { scholarshipApi, recommendationApi } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import type { Scholarship as ApiScholarship } from "../types/api";

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

interface ScholarshipListPageProps {
  userGpa?: number;
  onOpenDetail: (scholarship: Scholarship) => void;
  onOpenGradeInput: () => void;
}

const mockScholarships: Scholarship[] = [
  {
    id: 1,
    name: "국가장학금 1유형",
    organization: "한국장학재단",
    amount: "최대 520만원",
    deadline: "2025-11-30",
    minGpa: 2.0,
    category: "국가장학금",
    eligible: true,
  },
  {
    id: 2,
    name: "우수인재 장학금",
    organization: "서울대학교",
    amount: "전액",
    deadline: "2025-12-15",
    minGpa: 3.8,
    category: "성적우수",
    eligible: false,
  },
  {
    id: 3,
    name: "저소득층 지원 장학금",
    organization: "교육부",
    amount: "300만원",
    deadline: "2025-11-20",
    minGpa: 2.5,
    category: "소득연계",
    eligible: true,
  },
  {
    id: 4,
    name: "공학도약 장학금",
    organization: "한국장학재단",
    amount: "450만원",
    deadline: "2025-12-01",
    minGpa: 3.0,
    category: "전공특화",
    eligible: true,
  },
  {
    id: 5,
    name: "글로벌 인재 장학금",
    organization: "고려대학교",
    amount: "600만원",
    deadline: "2025-11-25",
    minGpa: 3.5,
    category: "성적우수",
    eligible: false,
  },
  {
    id: 6,
    name: "봉사활동 장학금",
    organization: "연세대학교",
    amount: "200만원",
    deadline: "2025-12-10",
    minGpa: 2.8,
    category: "봉사/리더십",
    eligible: true,
  },
];

export function ScholarshipListPage({ userGpa, onOpenDetail, onOpenGradeInput }: ScholarshipListPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships);
  const [loading, setLoading] = useState(false);
  const { studentId } = useAuth();

  // 장학금 목록 불러오기
  useEffect(() => {
    loadScholarships();
  }, [studentId]);

  const loadScholarships = async () => {
    setLoading(true);
    try {
      // 추천 장학금 시도
      if (studentId && userGpa) {
        try {
          const recommendations = await recommendationApi.getRecommendations(studentId);
          if (recommendations.length > 0) {
            const mappedScholarships = recommendations.map(s => mapApiToLocal(s));
            setScholarships(mappedScholarships);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log('추천 장학금 없음, 전체 목록 불러오기');
        }
      }

      // 전체 장학금 목록 불러오기
      const allScholarships = await scholarshipApi.getScholarships({ page: 0, size: 100 });
      const mappedScholarships = allScholarships.map(s => mapApiToLocal(s));
      setScholarships(mappedScholarships);
    } catch (error) {
      console.error('장학금 목록 불러오기 실패:', error);
      // 에러 시 목업 데이터 사용
      setScholarships(mockScholarships);
    } finally {
      setLoading(false);
    }
  };

  const mapApiToLocal = (apiScholarship: ApiScholarship): Scholarship => {
    return {
      id: apiScholarship.scholarshipId,
      name: apiScholarship.name,
      organization: apiScholarship.organization,
      amount: apiScholarship.amount,
      deadline: apiScholarship.deadline,
      minGpa: apiScholarship.minGpa,
      category: apiScholarship.category,
      eligible: userGpa ? userGpa >= apiScholarship.minGpa : false,
    };
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadScholarships();
      return;
    }

    setLoading(true);
    try {
      const results = await scholarshipApi.searchScholarships({ keyword: searchTerm });
      const mappedScholarships = results.map(s => mapApiToLocal(s));
      setScholarships(mappedScholarships);
    } catch (error) {
      console.error('장학금 검색 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredScholarships = scholarships
    .map(scholarship => ({
      ...scholarship,
      eligible: userGpa ? userGpa >= scholarship.minGpa : false,
    }))
    .filter(scholarship =>
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.eligible && !b.eligible) return -1;
      if (!a.eligible && b.eligible) return 1;
      return 0;
    });

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-10 px-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl mb-3">장학금 찾기</h2>
          <p className="text-gray-500">내 성적에 맞는 장학금을 찾아보세요</p>
        </div>

        {!userGpa && (
          <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-2">성적을 입력하고 맞춤형 장학금을 확인하세요</h3>
                <p className="text-gray-600">
                  성적 정보를 입력하면 지원 가능한 장학금을 우선적으로 보여드립니다
                </p>
              </div>
              <Button
                onClick={onOpenGradeInput}
                className="bg-black text-white hover:bg-gray-800"
              >
                성적 입력하기
              </Button>
            </div>
          </Card>
        )}

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="장학금 이름 또는 기관으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 h-14"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredScholarships.map((scholarship) => (
                <Card
                  key={scholarship.id}
                  className={`p-6 cursor-pointer hover:shadow-lg transition-shadow ${
                    scholarship.eligible ? 'border-green-200 bg-green-50' : ''
                  }`}
                  onClick={() => onOpenDetail(scholarship)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl flex-1">{scholarship.name}</h3>
                    {scholarship.eligible && userGpa && (
                      <Badge className="bg-green-600 text-white">
                        지원가능
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{scholarship.organization}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{scholarship.amount}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>마감: {scholarship.deadline}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <Award className="h-4 w-4" />
                      <span>최소 평점: {scholarship.minGpa.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Badge variant="outline">{scholarship.category}</Badge>
                  </div>
                </Card>
              ))}
            </div>

            {filteredScholarships.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">검색 결과가 없습니다</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}