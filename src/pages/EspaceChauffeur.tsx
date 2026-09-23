
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, Mail, Eye, EyeOff, Car, MapPin, Clock,
  DollarSign, Star, Calendar, Phone, AlertCircle,
  TrendingUp, Navigation, Users
} from 'lucide-react';

export default function EspaceChauffeur() {
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
    { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp },
    { id: 'missions', label: 'Mes missions', icon: Car },
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'gains', label: 'Mes gains', icon: DollarSign },
  ];

  const missions = [
    {
      id: 'MIS-001',
      client: 'Marie L.',
      phone: '+33 6 12 34 56 78',
      date: "Aujourd'hui",
      time: '14:30',
      from: 'Aéroport CDG - Terminal 2',
      to: '8 Rue du Faubourg Saint-Honoré, Paris 8e',
      vehicle: 'Mercedes Classe E - AB-123-CD',
      status: 'confirmée',
      price: '55€',
    },
    {
      id: 'MIS-002',
      client: 'Thomas D.',
      phone: '+33 6 98 76 54 32',
      date: "Aujourd'hui",
      time: '18:00',
      from: '15 Avenue Montaigne, Paris 8e',
      to: 'Gare de Lyon',
      vehicle: 'Mercedes Classe E - AB-123-CD',
      status: 'en_attente',
      price: '32€',
    },
    {
      id: 'MIS-003',
      client: 'Sophie M.',
      phone: '+33 6 11 22 33 44',
      date: 'Demain',
      time: '09:00',
      from: 'Hôtel Ritz, Place Vendôme',
      to: 'Aéroport Orly - Terminal 3',
      vehicle: 'Mercedes Classe V - EF-456-GH',
      status: 'confirmée',
      price: '75€',
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
                className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-slate-700/30"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-slate-900">Espace Chauffeur</h1>
              <p className="text-slate-500 mt-2">Accédez à votre interface professionnelle</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Identifiant chauffeur
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chauffeur@transpvtc.fr"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
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
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
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
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500" />
                  <span className="text-sm text-slate-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Aide connexion
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-semibold rounded-xl shadow-lg shadow-slate-700/30 hover:shadow-slate-700/50 transition-all duration-300"
              >
                Accéder à l'espace chauffeur
              </motion.button>
            </form>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">
                  Accès réservé aux chauffeurs agréés TranspVTC. Contactez votre responsable si vous n'avez pas vos identifiants.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Espace Chauffeur 🚗
            </h1>
            <p className="text-slate-500 mt-1">
              Bienvenue, Jean-Pierre — Véhicule : Mercedes Classe E
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-xl border border-green-200 text-sm font-medium"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              En service
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-600 hover:text-red-500 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Déconnexion</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
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
                  ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-lg shadow-slate-700/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Missions aujourd'hui", value: '5', icon: Car, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Gains du jour', value: '245€', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
                    { label: 'Km parcourus', value: '127 km', icon: Navigation, color: 'from-purple-500 to-pink-500' },
                    { label: 'Note clients', value: '4.8 ★', icon: Star, color: 'from-yellow-500 to-orange-500' },
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

                {/* Next mission */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Prochaine mission</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-blue-200 text-sm">Client</div>
                      <div className="font-semibold">Marie L. — 14:30</div>
                      <div className="text-blue-200 text-sm mt-2">Départ</div>
                      <div className="font-medium">Aéroport CDG - Terminal 2</div>
                    </div>
                    <div>
                      <div className="text-blue-200 text-sm">Téléphone</div>
                      <div className="font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        +33 6 12 34 56 78
                      </div>
                      <div className="text-blue-200 text-sm mt-2">Arrivée</div>
                      <div className="font-medium">8 Rue du Faubourg Saint-Honoré</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 px-6 py-2.5 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
                  >
                    Démarrer la mission →
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'missions' && (
              <div className="space-y-4">
                {missions.map((mission, i) => (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{mission.client}</div>
                          <div className="text-sm text-slate-500">{mission.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          mission.status === 'confirmée'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {mission.status === 'confirmée' ? '✓ Confirmée' : '⏳ En attente'}
                        </span>
                        <span className="font-bold text-slate-900">{mission.price}</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-slate-500 text-xs">Départ</div>
                          <div className="text-slate-700">{mission.from}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-slate-500 text-xs">Arrivée</div>
                          <div className="text-slate-700">{mission.to}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{mission.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{mission.time}</span>
                      </div>
                      <div className="text-slate-500 text-xs">{mission.vehicle}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'planning' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Planning de la semaine</h2>
                <div className="grid grid-cols-7 gap-2">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-3 rounded-lg text-center ${
                        i === 2
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-medium text-slate-500">{day}</div>
                      <div className={`text-lg font-bold mt-1 ${
                        i === 2 ? 'text-blue-600' : 'text-slate-900'
                      }`}>
                        {15 + i}
                      </div>
                      {i < 5 && (
                        <div className="mt-1 text-xs text-slate-400">{Math.floor(Math.random() * 4) + 2} miss.</div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">Aujourd'hui — Mercredi 17</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      09:00 - 12:00 : Disponible
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      14:30 - 16:00 : Mission Marie L.
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      18:00 - 19:30 : Mission Thomas D.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gains' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Aujourd'hui", value: '245€', change: '+12%' },
                    { label: 'Cette semaine', value: '1 280€', change: '+8%' },
                    { label: 'Ce mois', value: '4 850€', change: '+15%' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
                    >
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="text-2xl font-bold text-slate-900 mt-1">{item.value}</div>
                      <div className="text-sm text-green-600 mt-1">{item.change}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Historique des gains</h3>
                  <div className="space-y-3">
                    {[
                      { date: '16 Jan', missions: 5, amount: '245€' },
                      { date: '15 Jan', missions: 4, amount: '198€' },
                      { date: '14 Jan', missions: 6, amount: '312€' },
                      { date: '13 Jan', missions: 3, amount: '156€' },
                      { date: '12 Jan', missions: 5, amount: '267€' },
                    ].map((day, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-700">{day.date}</span>
                          <span className="text-xs text-slate-400">({day.missions} missions)</span>
                        </div>
                        <span className="font-semibold text-slate-900">{day.amount}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
