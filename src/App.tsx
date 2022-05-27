import { useRoutes } from 'react-router-dom';

import { Footer, Navigation } from './Layout';
import { routes } from './route';

const App = (): JSX.Element => {
  const isLoggedIn = true;
  const routeContent = useRoutes(routes(isLoggedIn));

  return (
    <div className="flex flex-col h-screen justify-between">
      <nav className="bg-gray-800">
        <Navigation />
      </nav>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
          {routeContent}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
