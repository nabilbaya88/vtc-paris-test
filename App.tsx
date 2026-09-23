
export default function App() {
  return (
    <div/>
  );
}


import { useState, useEffect, useRef, ReactNode } from 'react';
import {
  Car, MapPin, Clock, Plane, Train,
  Phone, Globe, Check, X, RefreshCw,
  Calendar, Menu, ArrowRight, Banknote
} from 'lucide-react';

const API_URL = 'https://script.google.com/macros/s/AKfycbxH5HaUScvNH_1gwTk8Ol4gLKTnIA_RjzGMYh2FKLhEoR3I1y-YTZkwEvg-5YoEatDk/exec';

interface Reservation {
  id: string;
  date: string;
  time: string;
  name: string;
  phone: number | string;
  email: string;
  depart: string;
  arrivee: string;
  km: string;
  min: string;
  price: number;
  createdAt: string;
}

// ─── Hook : animation au scroll ───
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

// ─── Hook : compteur animé ───
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let frame: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);
  return count;
}

// ─── Composant : FadeIn au scroll ───
function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Formulaire
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Détection scroll pour la nav
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Récupération des réservations
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json() as Reservation[];
      setReservations(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (showDashboard) fetchReservations(); }, [showDashboard]);

  // Envoi de la réservation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: phone ? Number(phone) : '',
          email,
          depart: pickup,
          arrivee: destination,
          date,
          time
        }),
      });
      setSubmitSuccess(true);
      setName(''); setPhone(''); setEmail('');
      setPickup(''); setDestination(''); setDate(''); setTime('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      setSubmitError('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (s: string) => {
    try { return new Date(s).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
    catch { return s; }
  };
  const formatTime = (s: string) => {
    try { return new Date(s).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); }
    catch { return s; }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-x-hidden">
      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                <Car className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                VTC <span className="text-amber-500">Paris</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Services</a>
              <a href="#reservation" className="text-sm text-gray-400 hover:text-white transition-colors">Réserver</a>
              <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
              <button
                onClick={() => setShowDashboard(true)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
              >
                Espace Client
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5 px-4 py-6 space-y-4">
            <a href="#services" onClick={() => setMobileMenu(false)} className="block text-gray-300 hover:text-white py-2">Services</a>
            <a href="#reservation" onClick={() => setMobileMenu(false)} className="block text-gray-300 hover:text-white py-2">Réserver</a>
            <a href="#contact" onClick={() => setMobileMenu(false)} className="block text-gray-300 hover:text-white py-2">Contact</a>
            <button
              onClick={() => { setShowDashboard(true); setMobileMenu(false); }}
              className="w-full px-5 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm rounded-xl transition-all"
            >
              Espace Client
            </button>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1502602682455-6c009a8945a5?w=1920&q=80"
            alt="Tour Eiffel, Paris"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/50 to-[#0a0a0f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Badge statut */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-300 font-medium">Île-de-France · Disponible 24h/24, 7j/7</span>
              </div>
            </FadeIn>

            {/* Titre */}
            <FadeIn delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
                Un chauffeur privé,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">à <em className="italic font-serif">votre</em> rythme.</span>
              </h1>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={200}>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
                Trajets, transferts aéroport et déplacements professionnels à Paris et en Île-de-France — réservez en quelques secondes, confirmez sur WhatsApp.
              </p>
            </FadeIn>

            {/* Boutons CTA */}
            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#reservation"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-amber-500/30 text-lg"
                >
                  Réserver un trajet
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setShowDashboard(true)}
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 rounded-xl transition-all duration-300 text-white hover:-translate-y-0.5"
                >
                  🔍 Suivre ma course
                </button>
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn delay={400}>
              <div className="flex items-center gap-6 mt-12 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Paris · Île-de-France</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>24h/24, 7j/7</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-amber-500 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════════ BANNIÈRE DÉFILANTE ═══════════════ */}
      <section className="relative py-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border-y border-amber-500/10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4 text-sm font-medium text-amber-400/80">
              <span>Paris · Île-de-France</span>
              <span className="text-amber-500">✦</span>
              <span>Disponible 24h/24, 7j/7</span>
              <span className="text-amber-500">✦</span>
              <span>Paiement simplifié</span>
              <span className="text-amber-500">✦</span>
              <span>Réservation en 1 minute</span>
              <span className="text-amber-500">✦</span>
              <span>Confirmation sur WhatsApp</span>
              <span className="text-amber-500">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Nos services</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
                Un service adapté à <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">tous vos besoins</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Un service de chauffeur privé adapté à tous vos besoins de déplacement en Île-de-France.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Carte 1 : Aéroports */}
            <FadeIn delay={0}>
              <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Plane className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Aéroports & Gares</h3>
                <p className="text-gray-400 leading-relaxed">
                  Prise en charge à Orly, Roissy CDG, Gare de Lyon, Gare du Nord et toutes les gares d'Île-de-France.
                </p>
                <div className="mt-6 flex items-center gap-2 text-amber-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Transferts</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </FadeIn>

            {/* Carte 2 : 24/7 */}
            <FadeIn delay={100}>
              <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Disponible 24/7</h3>
                <p className="text-gray-400 leading-relaxed">
                  Un chauffeur joignable à toute heure, jour et nuit. Service continu sans interruption.
                </p>
                <div className="mt-6 flex items-center gap-2 text-amber-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Toujours là</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </FadeIn>

            {/* Carte 3 : Paiement */}
            <FadeIn delay={200}>
              <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Banknote className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Paiement CB & Espèces</h3>
                <p className="text-gray-400 leading-relaxed">
                  Carte bancaire ou espèces, comme vous préférez. Paiement simple et sécurisé.
                </p>
                <div className="mt-6 flex items-center gap-2 text-amber-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Flexible</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ RÉSERVATION ═══════════════ */}
      <section id="reservation" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Réservation</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
                Réserver un <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">trajet</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">
                Remplissez le formulaire ci-dessous. Votre réservation sera enregistrée et confirmée rapidement.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-sm">
              {/* Messages */}
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-300 text-sm">Réservation envoyée avec succès ! Vous serez contacté prochainement.</span>
                </div>
              )}
              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-red-300 text-sm">{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom + Téléphone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>

                {/* Départ + Destination */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Adresse de départ *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/60" />
                      <input
                        type="text"
                        required
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Ex: Aéroport Roissy CDG"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Adresse de destination *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/60" />
                      <input
                        type="text"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Ex: 15 Rue de Rivoli, Paris"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Date + Heure */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/60" />
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Heure *</label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/60" />
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-2xl shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Envoyer la réservation
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-4">
                Estimation de tarif indicative, non contractuelle. Le prix définitif est confirmé par le chauffeur.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <StatsSection />

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer id="contact" className="relative py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Col 1 : Logo + description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <Car className="w-5 h-5 text-black" />
                </div>
                <span className="text-lg font-bold">VTC <span className="text-amber-500">Paris</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Service de chauffeur privé à Paris et en Île-de-France. Disponible 24h/24, 7j/7 pour tous vos déplacements.
              </p>
            </div>

            {/* Col 2 : Liens */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Services</a></li>
                <li><a href="#reservation" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Réserver</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Col 3 : Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>+33 6 12 34 56 78</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Globe className="w-4 h-4 text-amber-500" />
                  <span>Paris, Île-de-France</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>24h/24, 7j/7</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} VTC Paris. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════ MODAL ESPACE CLIENT ═══════════════ */}
      {showDashboard && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowDashboard(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#12121a] border border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Espace Client</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {reservations.length} réservation{reservations.length !== 1 ? 's' : ''} enregistrée{reservations.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchReservations}
                  className="px-3 py-2 flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Actualiser</span>
                </button>
                <button
                  onClick={() => setShowDashboard(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
                  <span className="ml-3 text-gray-400">Chargement des données...</span>
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-16">
                  <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Aucune réservation pour le moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((res) => (
                    <div key={res.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/20 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm">
                            {res.name ? res.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{res.name}</p>
                            <p className="text-xs text-gray-500">{res.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-500 font-bold">{res.price}€</p>
                          <p className="text-xs text-gray-500">{formatDate(res.date)} · {formatTime(res.time)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          {res.depart}
                        </span>
                        <span className="text-gray-600">→</span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          {res.arrivee}
                        </span>
                      </div>
                      {res.km && (
                        <p className="text-xs text-gray-500 mt-2">
                          📏 {res.km} km {res.email && `· ${res.email}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────── SECTION STATS ────────────
function StatsSection() {
  const { ref, isInView } = useInView(0.3);
  const c1 = useCounter(24, 1500, isInView);
  const c2 = useCounter(1, 800, isInView);
  const c3 = useCounter(100, 1800, isInView);
  const c4 = useCounter(49, 2000, isInView);

  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
            <p className="text-3xl sm:text-4xl font-bold text-amber-500">{c1}/7</p>
            <p className="text-sm text-gray-400 mt-2">Disponibilité</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
            <p className="text-3xl sm:text-4xl font-bold text-amber-500">{c2} min</p>
            <p className="text-sm text-gray-400 mt-2">Réservation</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
            <p className="text-3xl sm:text-4xl font-bold text-amber-500">{c3}%</p>
            <p className="text-sm text-gray-400 mt-2">Professionnel</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
            <p className="text-3xl sm:text-4xl font-bold text-amber-500">★ {(c4 / 10).toFixed(1)}</p>
            <p className="text-sm text-gray-400 mt-2">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
