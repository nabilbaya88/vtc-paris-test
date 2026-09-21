import { useState, useEffect, useRef } from 'react';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import RecentBookings from './components/RecentBookings';
import Footer from './components/Footer';
import TrackingModal from './components/TrackingModal';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} onReserve={scrollToBooking} />
      <Hero onReserve={scrollToBooking} onTrack={() => setShowTracking(true)} />
      <Marquee />
      <Services />
      <RecentBookings />
      <div ref={bookingRef}>
        <BookingForm />
      </div>
      <Pricing />
      <Testimonials />
      <Footer />
      {showTracking && <TrackingModal onClose={() => setShowTracking(false)} />}
    </div>
  );
}