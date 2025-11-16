import { GraduationCap, Edit, Plus } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { GradeData } from "./GradeInputModal";

interface MyGradesPageProps {
  gradeData: GradeData | null;
  onOpenGradeInput: () => void;
}

export function MyGradesPage({ gradeData, onOpenGradeInput }: MyGradesPageProps) {
  const normalizedGpa = gradeData
    ? (gradeData.gpa / gradeData.maxGpa) * 4.5
    : 0;

  const getGradeLevel = (gpa: number) => {
    if (gpa >= 4.0) return { level: "우수", color: "text-green-600" };
    if (gpa >= 3.5) return { level: "양호", color: "text-blue-600" };
    if (gpa >= 3.0) return { level: "보통", color: "text-yellow-600" };
    return { level: "노력 필요", color: "text-red-600" };
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-10 px-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl mb-3">내 성적</h2>
            <p className="text-gray-500">성적 정보를 관리하고 확인하세요</p>
          </div>
          {gradeData && (
            <Button
              onClick={onOpenGradeInput}
              variant="outline"
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              수정
            </Button>
          )}
        </div>

        {gradeData ? (
          <div className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl">{gradeData.university}</h3>
                  <p className="text-gray-500">{gradeData.major}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">학년 · 학기</p>
                  <p className="text-lg">{gradeData.year}학년 {gradeData.semester}학기</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-2">현재 평점</p>
                  <p className="text-4xl">
                    {gradeData.gpa.toFixed(2)}
                    <span className="text-xl text-gray-500 ml-2">/ {gradeData.maxGpa}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-2">성적 수준</p>
                  <p className={`text-2xl ${getGradeLevel(normalizedGpa).color}`}>
                    {getGradeLevel(normalizedGpa).level}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">평점 진행률</span>
                  <span className="text-sm text-gray-500">
                    {((gradeData.gpa / gradeData.maxGpa) * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress value={(gradeData.gpa / gradeData.maxGpa) * 100} />
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl mb-6">지원 가능한 장학금</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p>평점 {gradeData.gpa.toFixed(1)} 기준</p>
                    <p className="text-sm text-gray-500">내 성적으로 지원 가능한 장학금</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl">
                      {normalizedGpa >= 3.8 ? "15+" : normalizedGpa >= 3.0 ? "8+" : "4+"}
                    </p>
                    <p className="text-sm text-gray-500">개</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl text-green-600">
                      {normalizedGpa >= 3.8 ? 5 : normalizedGpa >= 3.0 ? 3 : 2}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">성적우수</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl text-blue-600">
                      {normalizedGpa >= 3.0 ? 4 : 2}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">국가장학금</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl text-purple-600">
                      {normalizedGpa >= 3.5 ? 3 : 1}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">전공특화</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl mb-4">성적 향상 팁</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-600">
                    현재 평점을 0.5 올리면 {normalizedGpa >= 3.5 ? "더 많은" : "상위권"} 장학금에 지원할 수 있습니다
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-600">
                    주요 전공 과목 성적 관리에 집중해보세요
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-600">
                    학습 계획을 세우고 꾸준히 실천하는 것이 중요합니다
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl mb-3">등록된 성적 정보가 없습니다</h3>
              <p className="text-gray-500 mb-8">
                성적 정보를 입력하고 맞춤형 장학금을 추천받아보세요
              </p>
              <Button
                onClick={onOpenGradeInput}
                className="bg-black text-white hover:bg-gray-800 gap-2 h-12 px-8"
              >
                <Plus className="h-5 w-5" />
                성적 입력하기
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
