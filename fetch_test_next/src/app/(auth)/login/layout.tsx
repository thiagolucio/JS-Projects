import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl decoration-pink-500 mb-5">
        Conteúdo do Layout de Login
      </h1>
      {children}
    </main>
  );
}
