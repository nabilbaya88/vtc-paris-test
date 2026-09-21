export default function Marquee() {
  const items = ['Paris · Île-de-France', 'Disponible 24h/24, 7j/7', 'Paiement simplifié', 'Réservation en 1 minute', 'Confirmation sur WhatsApp'];
  return (
    <div className="bg-amber-500 text-black py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-black/30 rounded-full"></span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}