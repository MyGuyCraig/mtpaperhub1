import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail } from 'lucide-react';

const IGCSENotesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IGCSE SME Notes</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              High-quality study notes prepared by subject matter experts for IGCSE examinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-12"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">IGCSE Notes Coming Soon</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We're currently preparing comprehensive IGCSE study notes. These will be available soon with the same high quality you expect from our other materials.
            </p>
            <a
              href="mailto:web.mtpaperhub@gmail.com?subject=IGCSE Notes Inquiry"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              <Mail className="h-5 w-5 mr-2" />
              Get Notified When Available
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IGCSENotesPage;