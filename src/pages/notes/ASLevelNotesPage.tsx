import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import toast from 'react-hot-toast';

const ASLevelNotesPage: React.FC = () => {
  const { addItem } = useCartStore();

  const notes = [
    { id: 'as-bio-notes', name: 'AS Biology SME Notes', price: 1300, description: 'Comprehensive AS Level Biology notes' },
    { id: 'as-chem-notes', name: 'AS Chemistry SME Notes', price: 1750, description: 'Complete AS Level Chemistry notes' },
    { id: 'as-phy-notes', name: 'AS Physics SME Notes', price: 1250, description: 'Thorough AS Level Physics notes' }
  ];

  const handleAddToCart = (note: typeof notes[0]) => {
    addItem({
      id: note.id,
      type: 'product',
      name: note.name,
      price: note.price
    });
    toast.success(`${note.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AS Level SME Notes</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              High-quality study notes prepared by subject matter experts for AS Level examinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Available AS Level Notes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive study notes covering major AS Level subjects, prepared by experienced educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{note.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">PKR {note.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{note.description}</p>
                
                <button
                  onClick={() => handleAddToCart(note)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-600 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need Custom Notes?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Looking for notes on a specific topic or subject not listed here? Contact us for custom note preparation.
          </p>
          <a
            href="mailto:web.mtpaperhub@gmail.com?subject=Custom AS Level Notes Request"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Mail className="h-5 w-5 mr-2" />
            Request Custom Notes
          </a>
        </div>
      </section>
    </div>
  );
};

export default ASLevelNotesPage;