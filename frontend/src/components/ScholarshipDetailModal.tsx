import { DollarSign, Calendar, Award, Building, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

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

interface ScholarshipDetailModalProps {
  scholarship: Scholarship | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScholarshipDetailModal({ scholarship, isOpen, onClose }: ScholarshipDetailModalProps) {
  if (!scholarship) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{scholarship.name}</DialogTitle>
              <DialogDescription className="text-base">
                {scholarship.organization}
              </DialogDescription>
            </div>
            {scholarship.eligible && (
              <Badge className="bg-green-600 text-white">지원가능</Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">지원 금액</p>
                <p className="text-lg">{scholarship.amount}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">신청 마감일</p>
                <p className="text-lg">{scholarship.deadline}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">최소 평점</p>
                <p className="text-lg">{scholarship.minGpa.toFixed(1)} / 4.5</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Building className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">카테고리</p>
                <p className="text-lg">{scholarship.category}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">장학금 설명</h4>
            <p className="text-gray-600 leading-relaxed">
              {scholarship.name}은(는) {scholarship.organization}에서 제공하는 장학금으로, 
              우수한 학생들을 지원하기 위해 마련되었습니다. 
              최소 평점 {scholarship.minGpa.toFixed(1)} 이상의 학생들이 신청할 수 있으며, 
              선발된 학생들에게는 {scholarship.amount}의 장학금이 지급됩니다.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">지원 자격</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  평점 {scholarship.minGpa.toFixed(1)} 이상 (4.5 만점 기준)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  국내 대학 재학생 또는 신입생
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  가구 소득 기준 충족 (해당되는 경우)
                </span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">제출 서류</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-gray-600">• 장학금 신청서</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600">• 성적증명서</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600">• 재학증명서</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600">• 소득증명서 (해당되는 경우)</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 bg-black text-white hover:bg-gray-800 h-12"
              onClick={() => window.open('https://www.kosaf.go.kr', '_blank')}
            >
              신청하기
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={onClose}
            >
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
