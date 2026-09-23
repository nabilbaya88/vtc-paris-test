import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import EspaceClient from './pages/EspaceClient';
import EspaceChauffeur from './pages/EspaceChauffeur';

export type Page = 'home' | 'reservation' | 'espace-client' | 'espace-chauffeur';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={setCurrentPage} />;
      case 'reservation':
        return <Reservation />;
      case 'espace-client':
        return <EspaceClient />;
      case 'espace-chauffeur':
        return <EspaceChauffeur />;
      default:
        return <Home navigateTo={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer navigateTo={setCurrentPage} />
    </div>
  );
}
