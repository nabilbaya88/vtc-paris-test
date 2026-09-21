import { useEffect, useRef, useState } from 'react';

const testimonials = [
  { name: 'Marie L.', role: 'Voyageuse régulière', text: "Service impeccable ! Mon chauffeur était à l'heure, la voiture propre et confortable.", rating: 5, avatar: '👩‍💼' },
  { name: 'Thomas R.', role: "Homme d'affaires", text: "J'utilise ce service chaque semaine. Toujours ponctuel et professionnel.", rating: 5, avatar: '👨‍💻' },
  { name: 'Sophie D.', role: 'Touriste', text: "Accueil chaleureux à l'aéroport. Parfait pour arriver à Paris sans stress !", rating: 5, avatar: '👩‍🎨' },
];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 dark:text-white">Ce que disent nos clients</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, j) => <span key={j} className="text-amber-400">★</span>)}</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.avatar}</span>
                <div><div className="font-semibold text-sm dark:text-white">{t.name}</div><div className="text-xs text-gray-400">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}