import Link from "next/link";
import { Suspense } from "react";
import User from "./components/User";
import Repo from "./components/Repo";
import Counter from "./components/Counter";


// import { User } from '@/components/User';
// import { Respo } from '@/components/Repo';


export const metadata = {
  title: {
   default: 'APP',
   template: "%s | APP"
  }
}


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>HOME</h1>
      <div className="flex align-center">
        <Link href="/dashboard">
          <button className="bg-pink-500 hover:bg-purple-700 text-white font-bold my-4 py-3 px-4 rounded-3xl mr-5">
            DashBoard
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-indigo-500 hover:bg-purple-700 text-white font-bold my-4 py-3 px-4 rounded-3xl">
            Register
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-indigo-500 hover:bg-purple-700 text-white font-bold my-4 py-3 px-4 rounded-3xl ml-5">
            Login
          </button>
        </Link>
        <Link href="/products/slug-do-produto">
          <button className="bg-indigo-500 hover:bg-purple-700 text-white font-bold my-4 py-3 px-4 rounded-3xl ml-5">
            Slug Produto
          </button>
        </Link>
      </div>
      <div>
      <Counter />
        <Suspense
          fallback={
            <p>
              Loading local do componente User usando o Suspense do React...
            </p>
          }
        >
          <User />
        </Suspense>

        <Suspense
          fallback={
            <p>
              Loading local do componente Repo usando o Suspense do React...
            </p>
          }
        >
          <Repo />
        </Suspense>
      </div>
    </main>
  );
}
