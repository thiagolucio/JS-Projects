import Link from "next/link";
// import Repo from "./Repo";
import { cookies, headers } from 'next/headers';

async function User() {
  // const response = await fetch('https://api.github.com/users/thiagolucio', {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });

  const user = await response.json();

  const userCookies = cookies();
  const userHeaders = headers();



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="m-6">
              <h3>DADOS DO USUARIO:</h3>
              <pre>{JSON.stringify(user[0], null, 2)}</pre>
          </div>

          <div className="m-6">
              <h3>COOKIES USUARIO:</h3>
              {/* {JSON.stringify(userCookies.getAll(), null, 2)} */}
              <pre>{JSON.stringify(userCookies.getAll(), null, 2)}</pre>
          </div>

          <div className="m-6">
              <h3>HEADERS USUARIO:</h3>
              <pre>{JSON.stringify(userHeaders, null, 2)}</pre>
              {/* {JSON.stringify(userHeaders.entries(), null, 2)} */}
          </div>

        {/* vc tambem pode colocar um componente dentro de outro como abaixo */}
        {/* <h2>Repos</h2>
        <Repo /> */}
    </main>
  ); 
}

export default User;


/* 
Em caso de dois fetchs no mesmo componente. Procure fazer da seguinte forma:
export default async function NomeComponent() {
  const [user, repos] = await Promise.all([
    fetch('https://api.github.com/users/thiagolucio', {
      cache: 'no-store',
    }).then((response) => response.json()),
    fetch('https://api.github.com/users/thiagolucio/repos', {
      cache: 'no-store',
    }).then((response) => response.json()),
  ]);
}
*/