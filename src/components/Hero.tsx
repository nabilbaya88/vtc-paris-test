import { useState, useEffect } from 'react';

interface HeroProps {
  onReserve: () => void;
  onTrack: () => void;
}

export default function Hero({ onReserve, onTrack }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" alt="Tour Eiffel, Paris" className={`w-full h-full object-cover transition-all duration-1000 ${loaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>
      <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <span className="text-amber-400 text-sm font-medium">Paris · Île-de-France</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          <div className="overflow-hidden">
            <span className={`block transition-all duration-700 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>Un chauffeur privé,</span>
          </div>
          <div className="overflow-hidden">
            <span className={`block transition-all duration-700 delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>à <em className="text-amber-400 not-italic font-extrabold">votre</em> rythme.</span>
          </div>
        </h1>
        <p className={`text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 transition-all duration-700 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Trajets, transferts aéroport et déplacements professionnels à Paris et en Île-de-France — réservez en quelques secondes, confirmez sur WhatsApp.
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <button onClick={onReserve} className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-lg transition-all hover:scale-105 shadow-2xl shadow-amber-500/30 flex items-center gap-2">
            Réserver un trajet <span className="group-hover:translate-y-1 transition-transform">↓</span>
          </button>
          <button onClick={onTrack} className="px-6 py-4 text-white/70 hover:text-white font-medium text-lg transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/60">
            🔍 Suivre ma course
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}