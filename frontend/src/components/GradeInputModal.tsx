import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface GradeInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gradeData: GradeData) => void;
  initialData?: GradeData;
}

export interface GradeData {
  university: string;
  major: string;
  year: string;
  semester: string;
  gpa: number;
  maxGpa: number;
}

export function GradeInputModal({ isOpen, onClose, onSave, initialData }: GradeInputModalProps) {
  const [formData, setFormData] = useState<GradeData>(
    initialData || {
      university: "",
      major: "",
      year: "1",
      semester: "1",
      gpa: 0,
      maxGpa: 4.5,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.gpa > formData.maxGpa) {
      alert(`평점은 ${formData.maxGpa}를 초과할 수 없습니다.`);
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">성적 정보 입력</DialogTitle>
          <DialogDescription>
            정확한 장학금 추천을 위해 성적 정보를 입력해주세요
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="university">대학교</Label>
            <Input
              id="university"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              required
              placeholder="예: 서울대학교"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="major">전공</Label>
            <Input
              id="major"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              required
              placeholder="예: 컴퓨터공학과"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">학년</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => setFormData({ ...formData, year: value })}
              >
                <SelectTrigger id="year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1학년</SelectItem>
                  <SelectItem value="2">2학년</SelectItem>
                  <SelectItem value="3">3학년</SelectItem>
                  <SelectItem value="4">4학년</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">학기</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => setFormData({ ...formData, semester: value })}
              >
                <SelectTrigger id="semester">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1학기</SelectItem>
                  <SelectItem value="2">2학기</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gpa">평점</Label>
              <Input
                id="gpa"
                type="number"
                step="0.01"
                min="0"
                max={formData.maxGpa}
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) })}
                required
                placeholder="3.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxGpa">만점</Label>
              <Select
                value={formData.maxGpa.toString()}
                onValueChange={(value) => setFormData({ ...formData, maxGpa: parseFloat(value) })}
              >
                <SelectTrigger id="maxGpa">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.0">4.0</SelectItem>
                  <SelectItem value="4.3">4.3</SelectItem>
                  <SelectItem value="4.5">4.5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-black text-white hover:bg-gray-800 h-12"
            >
              저장
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12"
              onClick={onClose}
            >
              취소
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
