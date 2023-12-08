"use client";
// https://next-auth.js.org/providers/google#configuration
import { SessionProvider } from 'next-auth/react';

function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;