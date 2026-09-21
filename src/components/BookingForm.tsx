import { useState } from 'react';

const API_URL = 'https://script.google.com/macros/s/AKfycbxH5HaUScvNH_1gwTk8Ol4gLKTnIA_RjzGMYh2FKLhEoR3I1y-YTZkwEvg-5YoEatDk/exec';

export default function BookingForm() {
  const [formData, setFormData] = useState({ depart: '', arrivee: '', date: '', time: '', name: '', phone: '', email: '', passengers: '1' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = { action: 'create', ...formData };
      await fetch(API_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus('success');
      const message = `🚗 Nouvelle réservation VTC Paris\n\n📍 Départ : ${formData.depart}\n📍 Arrivée : ${formData.arrivee}\n📅 Date : ${formData.date}\n🕐 Heure : ${formData.time}\n👥 Passagers : ${formData.passengers}\n\n👤 Nom : ${formData.name}\n📞 Tél : ${formData.phone}`;
      setTimeout(() => { window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank'); }, 1000);
      setTimeout(() => { setStatus('idle'); setFormData({ depart: '', arrivee: '', date: '', time: '', name: '', phone: '', email: '', passengers: '1' }); }, 4000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Réservation</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 dark:text-white">Réservez votre trajet</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3">Remplissez le formulaire ci-dessous. Votre réservation sera enregistrée et confirmée sur WhatsApp.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">📍 Adresse de départ</label>
              <input type="text" name="depart" value={formData.depart} onChange={handleChange} required placeholder="Ex: Aéroport CDG" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">📍 Adresse d'arrivée</label>
              <input type="text" name="arrivee" value={formData.arrivee} onChange={handleChange} required placeholder="Ex: 15 Rue de Rivoli, Paris" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">📅 Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">🕐 Heure</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">👤 Votre nom</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Jean Dupont" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">📞 Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+33 6 12 34 56 78" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">📧 Email (optionnel)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jean@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">👥 Passagers</label>
              <select name="passengers" value={formData.passengers} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} passager{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
          {status === 'success' && <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-center font-medium">✅ Réservation envoyée avec succès !</div>}
          <div className="mt-8 text-center">
            <button type="submit" disabled={status === 'loading'} className={`px-10 py-4 font-bold rounded-xl text-lg transition-all shadow-xl ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 text-black hover:scale-105 shadow-amber-500/30'}`}>
              {status === 'loading' ? '⏳ Envoi en cours...' : '📱 Réserver maintenant'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}