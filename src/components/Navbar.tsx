import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car, User, Shield } from 'lucide-react';
import type { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Navbar({ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const navLinks: { page: Page; label: string; icon?: React.ComponentType<{ className?: string }> }[] = [
    { page: 'home', label: 'Accueil' },
    { page: 'reservation', label: 'Réserver', icon: Car },
    { page: 'espace-client', label: 'Espace Client', icon: User },
    { page: 'espace-chauffeur', label: 'Espace Chauffeur', icon: Shield },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-lg shadow-slate-200/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <Car className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              TranspVTC
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                {currentPage === link.page && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-lg border border-blue-500/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-1.5 ${currentPage === link.page ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'}`}>
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('reservation')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              Réserver maintenant
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-slate-200/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.page}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => { setCurrentPage(link.page); setIsMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      currentPage === link.page
                        ? 'bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-blue-700 border border-blue-500/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => { setCurrentPage('reservation'); setIsMenuOpen(false); }}
                  className="w-full text-center px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg mt-4"
                >
                  Réserver maintenant
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
