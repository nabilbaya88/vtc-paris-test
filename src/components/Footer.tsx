export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4"><span className="text-2xl">🚗</span><span className="text-xl font-bold">VTC Paris</span></div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">Service de chauffeur privé à Paris et en Île-de-France. Disponible 24h/24, 7j/7.</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-all">📱</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-all">💬</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-all">📧</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Transfert aéroport</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transfert gare</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mise à disposition</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>📞 +33 1 00 00 00 00</li>
              <li>💬 WhatsApp 24/7</li>
              <li>📍 Paris & Île-de-France</li>
              <li>🕐 Disponible 24h/24</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© 2024 VTC Paris — Tous droits réservés.</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}