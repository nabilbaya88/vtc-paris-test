interface TopBarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onReserve: () => void;
}

export default function TopBar({ darkMode, setDarkMode, onReserve }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-white/90 text-sm font-medium hidden sm:block">
            Île-de-France · Disponible 24h/24, 7j/7
          </span>
          <span className="text-white/90 text-sm font-medium sm:hidden">Disponible 24/7</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded text-xs bg-white/10 text-white hover:bg-white/20 transition-colors">🇫🇷 FR</button>
            <button className="px-2 py-1 rounded text-xs text-white/60 hover:bg-white/10 transition-colors">🇬🇧 EN</button>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all" title="Changer le thème">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={onReserve} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg text-sm transition-all hover:scale-105 shadow-lg shadow-amber-500/20">
            Réserver un trajet
          </button>
        </div>
      </div>
    </div>
  );
}