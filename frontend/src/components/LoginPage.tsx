import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-white px-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-3">로그인</h2>
          <p className="text-gray-500">맞춤형 장학금을 찾아보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <Button
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-gray-800"
          >
            로그인
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            계정이 없으신가요?{" "}
            <button
              onClick={() => onNavigate('signup')}
              className="text-black hover:underline"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
