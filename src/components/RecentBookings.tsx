import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://script.google.com/macros/s/AKfycbxH5HaUScvNH_1gwTk8Ol4gLKTnIA_RjzGMYh2FKLhEoR3I1y-YTZkwEvg-5YoEatDk/exec';

interface Booking { id: string; date: string; time: string; name: string; phone: number; email: string; depart: string; arrivee: string; km: string; min: string; price: number; createdAt: string; }

export default function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(API_URL).then(r => r.json()).then(data => {
      const sorted = data.sort((a: Booking, b: Booking) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookings(sorted.slice(0, 4));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const formatDate = (s: string) => new Date(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  const formatTime = (s: string) => new Date(s).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const shorten = (a: string) => a.length > 35 ? a.substring(0, 35) + '...' : a;

  return (
    <section ref={sectionRef} className="py-20 px-4 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Activité récente</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 dark:text-white">Dernières courses</h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><span className="text-4xl block mb-3">🚗</span><p>Aucune course récente</p></div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {bookings.map((b, i) => (
              <div key={b.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">#{b.id.substring(0, 8)}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{b.price}€</span>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2"><span className="text-green-500 text-xs mt-1">●</span><span className="text-sm text-gray-700 dark:text-gray-300 truncate">{shorten(b.depart)}</span></div>
                  <div className="flex items-start gap-2"><span className="text-red-500 text-xs mt-1">●</span><span className="text-sm text-gray-700 dark:text-gray-300 truncate">{shorten(b.arrivee)}</span></div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-400">{formatDate(b.date)} · {formatTime(b.time)}</span>
                  <span className="text-xs text-gray-400">{b.km} km</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}