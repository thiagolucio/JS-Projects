import { Suspense } from 'react';
import GithubUser from './components/GithubUser';
import User from './components/User';
import GithubUseCient from './components/GitHubUseClient';
import { DialogProvider } from './components/contexts/DialogContext';

export default function Home() {
  return (
    // <DialogProvider> é um component use Client e aqui dentro dele temos Componentes Server CLients
    <DialogProvider>
      <div className="Container">
        <h1>Aplicacao SSR</h1>
        <small><GithubUser username='thiagolucio' /></small>
        <Suspense fallback={<p>Carregando...</p>}>
          <small>
            <GithubUser username='RafaelBg' />
          </small>
        </Suspense>
        <Suspense fallback={<p>Carregando...</p>}>
          <small>
            <GithubUseCient username='gamaliel' />
          </small>
        </Suspense>
      </div>
      <div className="fieldArray">
        <small><User /></small>
      </div>
    </DialogProvider>
  );
}
