/* 
Vc pode usar dois colchetes no nome da pasta pra saber que tem mais subníveis [[slug]]
Vc pode usar pra fazer spread também no nome da pasta [...slug]
*/
import Link from 'next/link';
import { title } from 'process';

interface ProductsProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductsProps) {
  return { title: `${params.slug} | Produtos` };
}

export default function Products({ params }: ProductsProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Produto</h1>
      <p className="from-stone-300 text-xl text-white">{params.slug}</p>
      <Link href="/">
        <button className="bg-indigo-500 hover:bg-purple-700 text-white font-bold my-4 py-3 px-4 rounded-3xl ml-5">
          Voltar
        </button>
      </Link>
    </main>
  );
}

