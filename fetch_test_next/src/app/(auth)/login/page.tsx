import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: 'LOGIN DO USUARIO',
}

export default function Login()  {
  return (
    <>
      <Image src="/logo.jpeg" className="m-4" alt="Logo" width={230} height={230} />
      <h2 className="text-white">Login</h2>
      <Link href="/dashboard">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold my-4 py-3 px-4 rounded-2xl"> Back </button>
      </Link>
    </>
  )
}