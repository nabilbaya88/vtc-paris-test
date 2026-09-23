import { motion } from 'framer-motion';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TranspVTC</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Votre partenaire de transport de confiance. Service premium, chauffeurs professionnels,
              ponctualité garantie.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">Navigation</h3>
            <ul className="space-y-3">
              {[
                { page: 'home' as Page, label: 'Accueil' },
                { page: 'reservation' as Page, label: 'Réserver un trajet' },
                { page: 'espace-client' as Page, label: 'Espace Client' },
                { page: 'espace-chauffeur' as Page, label: 'Espace Chauffeur' },
              ].map((link) => (
                <li key={link.page}>
                  <button onClick={() => navigateTo(link.page)} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">Nos Services</h3>
            <ul className="space-y-3">
              {['Transport aéroport', 'Trajets longue distance', 'Mise à disposition', 'Transport événementiel', 'Navette gare'].map((service) => (
                <li key={service} className="text-slate-400 text-sm">{service}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                contact@transpvtc.fr
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                Paris, France
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 TranspVTC. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Mentions légales</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">CGV</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
