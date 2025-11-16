import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SignUpPageProps {
  onNavigate: (page: string) => void;
  onSignUp: (email: string, password: string, name: string) => void;
}

export function SignUpPage({ onNavigate, onSignUp }: SignUpPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    onSignUp(email, password, name);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-white px-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-3">회원가입</h2>
          <p className="text-gray-500">ScholarBee에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12"
              placeholder="홍길동"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
              placeholder="example@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-12"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-gray-800"
          >
            가입하기
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            이미 계정이 있으신가요?{" "}
            <button
              onClick={() => onNavigate('login')}
              className="text-black hover:underline"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
