--- Home.tsx 


+++ Home.tsx 
import { motion } from 'framer-motion';
import {
  Car, Clock, Shield, Star, MapPin, Users,
  ArrowRight, CheckCircle, Zap, Award
} from 'lucide-react';
import type { Page } from '../App';

interface HomeProps {
  navigateTo: (page: Page) => void;
}

export default function Home({ navigateTo }: HomeProps) {
  const services = [
    {
      icon: MapPin,
      title: 'Transport Aeroport',
      description: 'Transferts fiables vers tous les aeroports. Suivi de vol en temps reel.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Mise a disposition',
      description: 'Chauffeur dedie a votre service pour la duree de votre choix.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Transport Groupe',
      description: 'Vehicules adaptes pour vos evenements et deplacements en groupe.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      title: 'Course Urgente',
      description: 'Service express disponible 24h/24 pour vos deplacements imprevus.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Courses realisees' },
    { value: '4.9/5', label: 'Note moyenne' },
    { value: '50+', label: 'Chauffeurs pro' },
    { value: '24/7', label: 'Disponibilite' },
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Cliente reguliere',
      text: 'Service impeccable ! Ponctualite et professionnalisme au rendez-vous a chaque course.',
      rating: 5,
    },
    {
      name: 'Thomas D.',
      role: "Homme d'affaires",
      text: "J'utilise TranspVTC pour tous mes deplacements professionnels. Fiabilite exemplaire.",
      rating: 5,
    },
    {
      name: 'Sophie M.',
      role: 'Touriste',
      text: 'Accueil chaleureux, vehicule propre et confortable. Je recommande vivement !',
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)`
          }} />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  Service VTC Premium
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Votre trajet{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  premium
                </span>{' '}
                commence ici
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-300 mb-8 max-w-lg"
              >
                Reservez votre chauffeur prive en quelques clics.
                Service disponible 24h/24, 7j/7 dans toute la France.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => navigateTo('reservation')}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                >
                  Reserver maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo('espace-client')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  Espace Client
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 right-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Reservation confirmee</div>
                      <div className="text-slate-400 text-xs">Dans 15 minutes</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-20 left-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Chauffeur en route</div>
                      <div className="text-slate-400 text-xs">Mercedes Classe E</div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute inset-8 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <Car className="w-32 h-32 text-white/60" />
                  </motion.div>
                </div>

                <motion.div
                  animate={{ y: [5, -15, 5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 right-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-3 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-white text-sm font-medium">4.9 ★</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
              Nos Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Des solutions adaptees a vos besoins
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Que ce soit pour un transfert aeroport, un deplacement professionnel ou un evenement special,
              nous avons la solution qu'il vous faut.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-600 text-sm font-medium mb-4">
              Comment ca marche
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Reservez en 3 etapes simples
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choisissez votre trajet', desc: 'Indiquez votre point de depart et votre destination' },
              { step: '02', title: 'Selectionnez votre vehicule', desc: 'Berline, Van, ou vehicule de luxe selon vos besoins' },
              { step: '03', title: 'Confirmez et partez', desc: "Votre chauffeur vous attend a l'heure convenue" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className="text-6xl font-black text-blue-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-blue-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigateTo('reservation')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              Commencer ma reservation
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Pourquoi nous choisir
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                L'excellence au service de vos deplacements
              </h2>
              <div className="space-y-4">
                {[
                  'Chauffeurs professionnels certifies',
                  'Vehicules haut de gamme regulierement controles',
                  'Tarification transparente sans surprise',
                  'Service client disponible 24h/24',
                  "Annulation gratuite jusqu'a 1h avant",
                  'Paiement securise en ligne',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Reservation rapide</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-blue-300" />
                      <span className="text-sm">Point de depart</span>
                    </div>
                    <div className="text-white/80 text-sm">Aeroport Charles de Gaulle</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-green-300" />
                      <span className="text-sm">Destination</span>
                    </div>
                    <div className="text-white/80 text-sm">75008 Paris</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-yellow-300" />
                      <span className="text-sm">Date & Heure</span>
                    </div>
                    <div className="text-white/80 text-sm">Aujourd'hui, 14:30</div>
                  </div>
                  <button
                    onClick={() => navigateTo('reservation')}
                    className="w-full py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    Reserver →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-yellow-600 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Temoignages
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Ce que disent nos clients
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 text-sm">{testimonial.name}</div>
                    <div className="text-slate-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Pret a voyager en toute serenite ?
              </h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Reservez votre chauffeur prive des maintenant et profitez d'un service d'exception.
              </p>
              <button
                onClick={() => navigateTo('reservation')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Reserver mon trajet
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
