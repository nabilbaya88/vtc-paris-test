--- EspaceClient.tsx


+++ EspaceClient.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Lock, Mail, Eye, EyeOff, Car, Calendar,
  MapPin, Clock, CreditCard, Settings, LogOut,
  Bell, FileText, Star, CheckCircle
} from 'lucide-react';

export default function EspaceClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: User },
    { id: 'reservations', label: 'Mes reservations', icon: Car },
    { id: 'factures', label: 'Factures', icon: FileText },
    { id: 'parametres', label: 'Parametres', icon: Settings },
  ];

  const reservations = [
    {
      id: 'RES-2024-001',
      date: '15 Jan 2024',
      time: '14:30',
      from: 'Aeroport CDG',
      to: 'Paris 8eme',
      status: 'Terminee',
      price: '55 EUR',
    },
    {
      id: 'RES-2024-002',
      date: '22 Jan 2024',
      time: '09:00',
      from: 'Paris 16eme',
      to: 'Gare de Lyon',
      status: 'En cours',
      price: '32 EUR',
    },
    {
      id: 'RES-2024-003',
      date: '28 Jan 2024',
      time: '18:00',
      from: 'Bureau',
      to: 'Restaurant Le Meurice',
      status: 'A venir',
      price: '28 EUR',
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30"
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-slate-900">Espace Client</h1>
              <p className="text-slate-500 mt-2">Connectez-vous pour acceder a votre compte</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="........"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublie ?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
              >
                Se connecter
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Pas encore de compte ?{' '}
                <a href="#" className="text-blue-600 font-medium hover:underline">
                  Creer un compte
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Bonjour, {email.split('@')[0] || 'Client'} 👋
            </h1>
            <p className="text-slate-500 mt-1">Bienvenue dans votre espace personnel</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="relative p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Deconnexion</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 border border-slate-200 shadow-sm"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Courses totales', value: '24', icon: Car, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Km parcourus', value: '486 km', icon: MapPin, color: 'from-green-500 to-emerald-500' },
                  { label: 'Depense', value: '892 EUR', icon: CreditCard, color: 'from-purple-500 to-pink-500' },
                  { label: 'Note moyenne', value: '4.9 / 5', icon: Star, color: 'from-yellow-500 to-orange-500' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900">Mes reservations</h2>
                </div>
                <div className="divide-y divide-slate-200">
                  {reservations.map((res, i) => (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{res.from} → {res.to}</div>
                            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{res.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{res.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            res.status === 'Terminee' ? 'bg-green-100 text-green-700' :
                            res.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {res.status}
                          </span>
                          <span className="font-semibold text-slate-900">{res.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'factures' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Vos factures</h3>
                <p className="text-slate-500">Retrouvez ici l'historique de vos factures telechargeables.</p>
              </div>
            )}

            {activeTab === 'parametres' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-semibold text-slate-900">Parametres du compte</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Prenom</label>
                    <input
                      type="text"
                      placeholder="Votre prenom"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Telephone</label>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30"
                >
                  Sauvegarder les modifications
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
