import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  FileText, 
  Image, 
  BookOpen, 
  Printer,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const CustomRequestsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Requests</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Can't find what you're looking for? We've got you covered! Send us your custom requirements and we'll help you get exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:web.mtpaperhub@gmail.com"
                className="px-8 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors shadow-lg flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Your Request
              </a>
              <Link
                to="/build-your-own"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                Build Standard Package
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Can Print for You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From study notes to custom subjects, we can print almost anything you need for your academic success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Study Notes</h3>
              <p className="text-gray-600">
                Send us your handwritten or digital notes and we'll print them in high quality with professional binding.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pictures & Images</h3>
              <p className="text-gray-600">
                Have study materials in image format? We can print pictures, diagrams, and any visual content you need.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Subjects</h3>
              <p className="text-gray-600">
                Need materials for subjects not in our standard list? We can source and print materials for any subject.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Any Document</h3>
              <p className="text-gray-600">
                PDFs, Word documents, presentations - we can print any file format you send us with professional quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Printer className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Formats</h3>
              <p className="text-gray-600">
                Need specific paper sizes, binding styles, or printing formats? We can accommodate your custom requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Bulk Orders</h3>
              <p className="text-gray-600">
                Need multiple copies or large quantities? We offer competitive pricing for bulk printing orders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple Per-Page Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our custom printing service is priced per page, making it easy to calculate costs for any project.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Printer className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Per Page Pricing</h3>
              <p className="text-gray-600 mb-6">
                Send us your files and we'll provide you with a detailed quote based on the number of pages, paper quality, and binding requirements.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  📧 Email: <span className="text-purple-600">web.mtpaperhub@gmail.com</span>
                </p>
                <p className="text-gray-600">
                  Include your files, quantity needed, and any special requirements for an accurate quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting your custom materials printed is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Send Your Request</h3>
              <p className="text-gray-600">
                Email us at web.mtpaperhub@gmail.com with your files, requirements, and any special instructions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Get a Quote</h3>
              <p className="text-gray-600">
                We'll review your request and send you a detailed quote with pricing and delivery timeline.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Receive Your Order</h3>
              <p className="text-gray-600">
                Once you approve the quote and make payment, we'll print and deliver your materials.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Email CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-purple-100 max-w-2xl mx-auto mb-8">
            Send us your custom printing requirements today and let us help you get exactly what you need for your studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=web.mtpaperhub@gmail.com&su=Custom%20Printing%20Request&body=Hi%20MTPaperhub,%0D%0A%0D%0AI%20would%20like%20to%20request%20custom%20printing%20for:%0D%0A%0D%0A[Please%20describe%20what%20you%20need%20printed]%0D%0A%0D%0AQuantity%20needed:%0D%0ASpecial%20requirements:%0D%0A%0D%0AThank%20you!"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
>
  <Mail className="h-5 w-5 mr-2" />
  <span>Send Email Request</span>
  <ArrowRight className="h-5 w-5 ml-2" />
</a>
          </div>
          <div className="mt-6 text-purple-100">
            <p className="text-sm">
              📧 web.mtpaperhub@gmail.com | 📞 +92 329 7899451
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomRequestsPage;