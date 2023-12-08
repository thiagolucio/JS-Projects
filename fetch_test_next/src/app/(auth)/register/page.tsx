import React from 'react';
import Link from 'next/link';


export const metadata = {
  title: 'REGISTRO',
}

export default function Register() {
  return (
    <>
      <h2>Conteúdo de Register</h2>
      <Link href="/dashboard">
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold my-4 py-3 px-4 rounded-2xl"> Back </button>
      </Link>
    </>
  )
}
