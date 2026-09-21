const routes = [
  { from: 'Paris Centre', to: 'Aéroport Roissy CDG', price: '55€ - 70€', duration: '45-60 min' },
  { from: 'Paris Centre', to: 'Aéroport Orly', price: '40€ - 55€', duration: '30-45 min' },
  { from: 'Paris Centre', to: 'Gare de Lyon', price: '15€ - 25€', duration: '15-25 min' },
  { from: 'La Défense', to: 'Aéroport Roissy CDG', price: '65€ - 80€', duration: '50-70 min' },
  { from: 'Versailles', to: 'Paris Centre', price: '35€ - 50€', duration: '30-45 min' },
  { from: 'Disneyland', to: 'Paris Centre', price: '60€ - 75€', duration: '40-55 min' },
];

export default function Pricing() {
  return (
    <section className="py-20 px-4 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Tarifs</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 dark:text-white">Estimations de prix</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3">Tarifs indicatifs pour les trajets les plus demandés.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 font-semibold text-sm text-gray-600 dark:text-gray-300">
            <div>Départ</div><div>Arrivée</div><div className="text-center">Prix</div><div className="text-center">Durée</div>
          </div>
          {routes.map((r, i) => (
            <div key={i} className={`grid grid-cols-4 gap-4 p-4 items-center text-sm border-b border-gray-50 dark:border-gray-700/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''}`}>
              <div className="font-medium dark:text-white">{r.from}</div>
              <div className="text-gray-600 dark:text-gray-400">{r.to}</div>
              <div className="text-center font-bold text-amber-600 dark:text-amber-400">{r.price}</div>
              <div className="text-center text-gray-500 dark:text-gray-400">{r.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}