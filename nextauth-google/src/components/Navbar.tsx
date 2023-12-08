"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function NavBar() {
  const { data: session } = useSession();
  //   console.log("USER SESSION: ", session);

  return (
    <nav>
      <ul>
        {session?.user ? (
          <div>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="user-item">
              <img
                src={session.user.image}
                alt={session.user.name}
                width={30}
                height={30}
              />
              <span>{session.user.name}</span>
              <span>{session.user.email}</span>
            </li>
            <li>
              <button
                onClick={async () => {
                  await signOut({ callbackUrl: "/" });
                }}
              >
                Saír
              </button>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <button onClick={() => signIn()}>Entrar</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
