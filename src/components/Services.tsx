import { useEffect, useRef, useState } from 'react';

const services = [
  { emoji: '✈️🚄', title: 'Aéroports & Gares', text: "Prise en charge à Orly, Roissy CDG, Gare de Lyon, Gare du Nord et toutes les gares d'Île-de-France.", tag: 'Transferts' },
  { emoji: '🕐', title: 'Disponible 24/7', text: 'Un chauffeur joignable à toute heure, jour et nuit.', tag: null },
  { emoji: '💳💶', title: 'Paiement CB & Espèces', text: 'Carte bancaire ou espèces, comme vous préférez.', tag: null },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className={`group relative p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 hover:scale-[1.02] transition-all duration-500 hover:shadow-xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <span className="text-4xl mb-4 block">{service.emoji}</span>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.text}</p>
              {service.tag && <span className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">{service.tag}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}