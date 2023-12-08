import Link from "next/link";

export const metadata = {
  title: 'Repos',
}
async function Repo() {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store',
  });

  const repos = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="m-6">
          <h1>REPOS</h1>
          <p className="text-white">{JSON.stringify(repos)}</p>
       </div>
    </main>
  );
}

export default Repo;