--- FICHIERS_PAGES/Reservation.tsx


+++ FICHIERS_PAGES/Reservation.tsx 
// src/pages/Reservation.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, Clock, Car, Users, CreditCard,
  CheckCircle, ArrowLeft, ArrowRight, Star, Shield, Wifi
} from 'lucide-react';

export default function Reservation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    date: '',
    time: '',
    passengers: 1,
    vehicleType: 'berline',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const steps = [
    { id: 1, label: 'Trajet', icon: MapPin },
    { id: 2, label: 'Véhicule', icon: Car },
    { id: 3, label: 'Informations', icon: Users },
    { id: 4, label: 'Confirmation', icon: CheckCircle },
  ];

  const vehicles = [
    {
      id: 'berline',
      name: 'Berline Premium',
      desc: 'Mercedes Classe E ou équivalent',
      price: '45€',
      capacity: '1-3 passagers',
      features: ['Cuir', 'Climatisation', 'WiFi', 'Eau offerte'],
      icon: '🚗',
    },
    {
      id: 'van',
      name: 'Van de Luxe',
      desc: 'Mercedes Classe V ou équivalent',
      price: '75€',
      capacity: '1-7 passagers',
      features: ['Espace XL', 'Climatisation', 'WiFi', 'Prises USB'],
      icon: '🚐',
    },
    {
      id: 'luxe',
      name: 'Gamme Luxe',
      desc: 'Mercedes Classe S ou BMW Série 7',
      price: '120€',
      capacity: '1-3 passagers',
      features: ['Ultra-premium', 'Champagne', 'WiFi 5G', 'Sièges massants'],
      icon: '✨',
    },
  ];

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Réserver votre trajet
          </h1>
          <p className="text-slate-600">
            Complétez les étapes ci-dessous pour réserver votre chauffeur privé
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center z-10">
                <motion.div
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </motion.div>
                <span className={`mt-2 text-xs font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8"
          >
            {/* Step 1: Trajet */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Détails du trajet
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Point de départ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                      <input
                        type="text"
                        value={formData.departure}
                        onChange={(e) => updateFormData('departure', e.target.value)}
                        placeholder="Adresse de départ"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      <input
                        type="text"
                        value={formData.arrival}
                        onChange={(e) => updateFormData('arrival', e.target.value)}
                        placeholder="Adresse d'arrivée"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateFormData('date', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Heure
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => updateFormData('time', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre de passagers
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateFormData('passengers', Math.max(1, formData.passengers - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-700 font-bold"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-slate-900 w-8 text-center">
                      {formData.passengers}
                    </span>
                    <button
                      onClick={() => updateFormData('passengers', Math.min(8, formData.passengers + 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Véhicule */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-500" />
                  Choisissez votre véhicule
                </h2>

                <div className="grid gap-4">
                  {vehicles.map((vehicle) => (
                    <motion.div
                      key={vehicle.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => updateFormData('vehicleType', vehicle.id)}
                      className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 ${
                        formData.vehicleType === vehicle.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {formData.vehicleType === vehicle.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{vehicle.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-slate-900">{vehicle.name}</h3>
                            <span className="text-lg font-bold text-blue-600">{vehicle.price}</span>
                          </div>
                          <p className="text-sm text-slate-500 mb-2">{vehicle.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {vehicle.features.map((feature, i) => (
                              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md text-xs text-slate-600">
                                {feature === 'WiFi' && <Wifi className="w-3 h-3" />}
                                {feature === 'Cuir' && <Star className="w-3 h-3" />}
                                {feature === 'Climatisation' && <Shield className="w-3 h-3" />}
                                {feature}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 text-xs text-slate-400">{vehicle.capacity}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Informations */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Vos informations
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Notes supplémentaires (optionnel)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    placeholder="Numéro de vol, instructions spéciales..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Récapitulatif & Confirmation
                </h2>

                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600">Trajet</span>
                    <span className="font-medium text-slate-900">
                      {formData.departure || 'Non renseigné'} → {formData.arrival || 'Non renseigné'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600">Date & Heure</span>
                    <span className="font-medium text-slate-900">
                      {formData.date || 'Non renseigné'} à {formData.time || 'Non renseigné'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600">Véhicule</span>
                    <span className="font-medium text-slate-900">
                      {vehicles.find(v => v.id === formData.vehicleType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600">Passager</span>
                    <span className="font-medium text-slate-900">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {vehicles.find(v => v.id === formData.vehicleType)?.price}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700">
                      Paiement sécurisé — Vous ne serez facturé qu'après confirmation du chauffeur
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-center text-white"
                >
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                  <h3 className="text-lg font-semibold mb-1">Prêt à confirmer ?</h3>
                  <p className="text-blue-200 text-sm">
                    Cliquez sur "Confirmer la réservation" pour finaliser votre commande
                  </p>
                </motion.div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
              {currentStep > 1 ? (
                <motion.button
                  whileHover={{ x: -3 }}
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-2.
