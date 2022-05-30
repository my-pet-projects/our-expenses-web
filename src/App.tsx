import { useRoutes } from 'react-router-dom';

import { Footer, Navigation } from './Layout';
import { routes } from './route';

const App = (): JSX.Element => {
  const isLoggedIn = true;
  const routeContent = useRoutes(routes(isLoggedIn));

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800">
        <Navigation />
      </nav>
      <main className="flex-grow">{routeContent}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
