import { useState, useEffect } from 'react';

const API_URL = 'https://script.google.com/macros/s/AKfycbxH5HaUScvNH_1gwTk8Ol4gLKTnIA_RjzGMYh2FKLhEoR3I1y-YTZkwEvg-5YoEatDk/exec';

interface Booking { id: string; date: string; time: string; name: string; phone: number; email: string; depart: string; arrivee: string; km: string; min: string; price: number; createdAt: string; }

export default function TrackingModal({ onClose }: { onClose: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    fetch(API_URL).then(r => r.json()).then(setBookings).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.depart.toLowerCase().includes(searchTerm.toLowerCase()) || b.arrivee.toLowerCase().includes(searchTerm.toLowerCase()));
  const fmtDate = (s: string) => new Date(s).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtTime = (s: string) => new Date(s).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-modal-in flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold dark:text-white">🔍 Suivi des courses</h3>
            <p className="text-gray-500 text-sm mt-1">{bookings.length} réservation{bookings.length > 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">✕</button>
        </div>
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none text-sm" />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? <div className="text-center py-12"><div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-500 text-sm">Chargement...</p></div>
          : selected ? (
            <div className="space-y-4">
              <button onClick={() => setSelected(null)} className="text-sm text-amber-600 hover:underline">← Retour</button>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between"><span className="text-xs font-mono text-gray-400">{selected.id}</span><span className="font-bold text-amber-600">{selected.price}€</span></div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2"><span className="text-green-500">●</span><div><p className="text-xs text-gray-400">Départ</p><p className="font-medium text-sm dark:text-white">{selected.depart}</p></div></div>
                  <div className="flex items-start gap-2"><span className="text-red-500">●</span><div><p className="text-xs text-gray-400">Arrivée</p><p className="font-medium text-sm dark:text-white">{selected.arrivee}</p></div></div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div><p className="text-xs text-gray-400">Date</p><p className="text-sm dark:text-white">{fmtDate(selected.date)}</p></div>
                  <div><p className="text-xs text-gray-400">Heure</p><p className="text-sm dark:text-white">{fmtTime(selected.time)}</p></div>
                  <div><p className="text-xs text-gray-400">Distance</p><p className="text-sm dark:text-white">{selected.km} km</p></div>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-600 space-y-1">
                  <p className="text-sm dark:text-white">👤 {selected.name}</p>
                  <p className="text-sm dark:text-white">📞 {selected.phone}</p>
                  {selected.email && <p className="text-sm dark:text-white">📧 {selected.email}</p>}
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? <div className="text-center py-12 text-gray-400">Aucune réservation</div>
          : (
            <div className="space-y-3">
              {filtered.map(b => (
                <button key={b.id} onClick={() => setSelected(b)} className="w-full text-left p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="flex justify-between mb-2"><span className="font-semibold text-sm dark:text-white">{b.name}</span><span className="text-amber-600 font-bold text-sm">{b.price}€</span></div>
                  <div className="text-xs text-gray-500 mb-1">● {b.depart}</div>
                  <div className="text-xs text-gray-500 mb-2">● {b.arrivee}</div>
                  <div className="flex justify-between text-xs text-gray-400"><span>{fmtDate(b.date)} · {fmtTime(b.time)}</span><span>{b.km} km</span></div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}