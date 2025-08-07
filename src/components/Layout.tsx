import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Footer from './Footer';
import { useCartStore } from '../stores/cartStore';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { items } = useCartStore();
  
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-indigo-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">MT</span>
              </div>
              <span className="text-xl font-bold text-gray-800">MTPaperhub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
              <div className="relative group">
                <button className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center">
                  Notes
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link to="/notes/o-level" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">O Level Notes</Link>
                    <Link to="/notes/as-level" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AS Level Notes</Link>
                    <Link to="/notes/a-level" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">A Level Notes</Link>
                    <Link to="/notes/igcse" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">IGCSE Notes</Link>
                  </div>
                </div>
              </div>
              <Link to="/o-level" className="text-gray-600 hover:text-indigo-600 transition-colors">O Level</Link>
              <Link to="/a-level" className="text-gray-600 hover:text-indigo-600 transition-colors">A Level</Link>
              <Link to="/igcse" className="text-gray-600 hover:text-indigo-600 transition-colors">IGCSE</Link>
              <Link to="/custom-requests" className="text-gray-600 hover:text-indigo-600 transition-colors bg-purple-100 px-3 py-1 rounded-full">Custom Orders</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <button 
                className="md:hidden text-gray-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white mt-4 rounded-lg shadow-lg p-4 absolute left-4 right-4 z-50">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">Home</Link>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                  <Link to="/notes/o-level" className="block text-gray-700 hover:text-indigo-600 transition-colors py-1 text-sm">O Level Notes</Link>
                  <Link to="/notes/as-level" className="block text-gray-700 hover:text-indigo-600 transition-colors py-1 text-sm">AS Level Notes</Link>
                  <Link to="/notes/a-level" className="block text-gray-700 hover:text-indigo-600 transition-colors py-1 text-sm">A Level Notes</Link>
                  <Link to="/notes/igcse" className="block text-gray-700 hover:text-indigo-600 transition-colors py-1 text-sm">IGCSE Notes</Link>
                </div>
                <Link to="/o-level" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">O Level</Link>
                <Link to="/custom-requests" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">Custom Orders</Link>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;