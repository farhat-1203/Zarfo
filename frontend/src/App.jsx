import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Menu, Users, ShoppingBag, MapPin } from 'lucide-react';

// The main App component acting as the landing page
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            {/* Zarfo Logo/Icon - Retained for custom brand identity */}
            <svg
              className="h-8 w-8 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 01-1.127 1.838l-4.5 2.25a2 2 0 01-1.746 0l-4.5-2.25a2 2 0 01-1.127-1.838v-4.856a2 2 0 011.127-1.838l4.5-2.25a2 2 0 011.746 0l4.5 2.25a2 2 0 011.127 1.838v4.856z"
              />
            </svg>
            <span className="text-2xl font-bold text-gray-900">Zarfo</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="hover:text-emerald-600 transition duration-300">About Us</a>
            <a href="#mission" className="hover:text-emerald-600 transition duration-300">Our Mission</a>
            <a href="#contact" className="hover:text-emerald-600 transition duration-300">Contact</a>
            <button className="bg-emerald-500 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-600 transition duration-300 transform hover:scale-105 shadow-md">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu (Using headlessui Transition) */}
        <Transition
          show={isMobileMenuOpen}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">About Us</a>
              <a href="#mission" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Our Mission</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Contact</a>
              <button className="w-full bg-emerald-500 text-white px-5 py-2 mt-2 rounded-full font-medium hover:bg-emerald-600">
                Get Started
              </button>
            </div>
          </div>
        </Transition>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
              Connect. Combat Waste.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Zarfo is a platform dedicated to connecting surplus food from hotels with those who need it most, fighting food waste one meal at a time.
            </p>
            <div className="space-x-4">
              <button className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-600 transition duration-300 transform hover:scale-105 shadow-lg">
                I'm a Hotel
              </button>
              <button className="bg-transparent border border-emerald-500 text-emerald-500 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition duration-300 transform hover:scale-105">
                I'm a Diner
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1: Hotels List Food */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hotels List Food</h3>
                <p className="text-gray-600">Hotels can easily list their excess, fresh food before it goes to waste.</p>
              </div>

              {/* Feature 2: Diners Find Deals */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Diners Find Deals</h3>
                <p className="text-gray-600">Hungry diners can browse for delicious, last-minute deals on food that would otherwise be discarded.</p>
              </div>

              {/* Feature 3: Donations to the Community */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Donations to the Community</h3>
                <p className="text-gray-600">Unsold food is donated through our network of volunteers to those in need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2025 Zarfo. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
