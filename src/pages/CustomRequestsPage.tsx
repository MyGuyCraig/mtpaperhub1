import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  FileText, 
  Printer,
  Clock,
  CheckCircle,
  ArrowRight,
  Package
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Print Orders</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Need something printed that's not in our standard catalog? We handle all types of custom printing and miscellaneous orders.
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

      {/* Services Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Custom Printing Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of custom printing services for educational and professional needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Document Printing</h3>
              <p className="text-gray-600">Custom documents, reports, assignments, and academic papers with professional binding options.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Bulk Orders</h3>
              <p className="text-gray-600">Large quantity printing for institutions, schools, and educational organizations.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Printer className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Special Formats</h3>
              <p className="text-gray-600">Custom sizes, special paper types, lamination, and unique formatting requirements.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Pricing Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our pricing depends on various factors including quantity, paper type, binding, and complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Factors Affecting Price</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Number of pages and copies
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Paper quality and size
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Color vs black and white
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Binding type and complexity
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Delivery timeline
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What to Include in Your Request</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  Detailed description of what you need
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  Quantity required
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  Preferred paper size and quality
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  Binding preferences
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  When you need it delivered
                </li>
              </ul>
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
              Getting your custom materials is simple and straightforward.
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
                Email us with your requirements, including type, quantity, and any special instructions.
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
                Once you approve the quote and make payment, we'll create and deliver your custom materials.
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
            Contact us today for your custom printing and miscellaneous order requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=web.mtpaperhub@gmail.com&su=Custom%20Print%20Request&body=Hi%20MTPaperhub,%0D%0A%0D%0AI%20would%20like%20to%20request%20custom%20printing%20for:%0D%0A%0D%0A[Please%20describe%20what%20you%20need%20printed]%0D%0A%0D%0AQuantity:%20%0D%0APaper%20size:%20%0D%0ABinding%20preference:%20%0D%0ADeadline:%20%0D%0A%0D%0AThank%20you!"
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