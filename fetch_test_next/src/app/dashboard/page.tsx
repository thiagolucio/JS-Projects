import Link from "next/link";

// revalidar (refresh) a cada 500 segundos por baixo dos panos refresh no api
// export const revalidate = 500;

export const metadata = {
  title: 'DASHBOARD',
}

async function Dashboard() {
  // por padrao o Next oculta a requisicao http e nao mostra a URL do API
  const response = await fetch('https://thiagolucio.com.br/downloads/json/mock.json', {
    // cache: 'no-store', // force-cache, no-cache, no-store, default, entries, reload
    next: {
      revalidate: 500,      
    }
  });

  const dados = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>HERE IS DASHBOARD</h1>
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-3 px-4 rounded-3xl"> Home </button>
          </Link>
      </div>
      <div className="bg-indigo-500 p-52 border-rounded-3xl">
        <pre>{JSON.stringify(dados, null, 2)}</pre>
      </div>
    </main>
  );
}

export default Dashboard;