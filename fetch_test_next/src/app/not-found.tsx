import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <h1 className="font-">404 NOT FOUND!</h1>
      <Link href="/">
      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold my-4 py-3 px-4 rounded-3xl"> BACK HOME </button>
      </Link>
    </div>
  </main>
  )
}