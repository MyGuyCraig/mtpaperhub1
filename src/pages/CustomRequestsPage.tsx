import React, { useState } from 'react';
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
  ArrowRight,
  Sticker,
  FileImage
} from 'lucide-react';

const CustomRequestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'stickers' | 'posters'>('notes');

  const oLevelNotes = [
    { subject: 'Biology', price: 1650 },
    { subject: 'Physics', price: 2000 },
    { subject: 'Mathematics', price: 2500 },
    { subject: 'Chemistry', price: 1250 },
    { subject: 'Computer Science', price: 1050 }
  ];

  const aLevelNotes = [
    { subject: 'AS Biology', price: 1300 },
    { subject: 'AS Chemistry', price: 1750 },
    { subject: 'AS Physics', price: 1250 },
    { subject: 'Math P1', price: 1100 },
    { subject: 'Math P3', price: 1239 },
    { subject: 'Math M1', price: 420 },
    { subject: 'Math S1', price: 510 },
    { subject: 'AS & A Level CS', price: 800 },
    { subject: 'A Level Biology', price: 1300 },
    { subject: 'A Level Chemistry', price: 1200 },
    { subject: 'A Level Physics', price: 1250 }
  ];

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

      {/* Sleek Header with Tabs */}
      <section className="py-8 px-6 md:px-12 lg:px-20 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'notes'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <BookOpen className="h-5 w-5 inline mr-2" />
                Notes
              </button>
              <button
                onClick={() => setActiveTab('stickers')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'stickers'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Sticker className="h-5 w-5 inline mr-2" />
                Stickers
              </button>
              <button
                onClick={() => setActiveTab('posters')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'posters'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FileImage className="h-5 w-5 inline mr-2" />
                Posters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Notes Section */}
          {activeTab === 'notes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Study Notes</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  High-quality, comprehensive study notes for O Level and A Level subjects. All notes are professionally prepared and cover the complete syllabus.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* O Level Notes */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">O Level Notes</h3>
                  <div className="space-y-4">
                    {oLevelNotes.map((note, index) => (
                      <motion.div
                        key={note.subject}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-100"
                      >
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-red-600 mr-3" />
                          <span className="font-medium text-gray-800">{note.subject}</span>
                        </div>
                        <span className="text-lg font-bold text-red-600">PKR {note.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* A Level Notes */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">A Level Notes</h3>
                  <div className="space-y-4">
                    {aLevelNotes.map((note, index) => (
                      <motion.div
                        key={note.subject}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100"
                      >
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="font-medium text-gray-800">{note.subject}</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">PKR {note.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to Order Notes?</h3>
                  <p className="text-gray-600 mb-6">
                    Contact us to place your order for any of the above study notes. All notes come with professional binding and are delivered within 3-5 business days.
                  </p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=web.mtpaperhub@gmail.com&su=Study%20Notes%20Order&body=Hi%20MTPaperhub,%0D%0A%0D%0AI%20would%20like%20to%20order%20study%20notes%20for:%0D%0A%0D%0A[Please%20specify%20which%20subjects%20and%20levels]%0D%0A%0D%0AThank%20you!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Order Notes
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stickers Section */}
          {activeTab === 'stickers' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Custom Stickers</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  High-quality custom stickers for educational purposes, motivational quotes, subject labels, and more.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sticker className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Educational Stickers</h3>
                  <p className="text-gray-600">Subject labels, formula stickers, and educational graphics for notebooks and study materials.</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sticker className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Motivational Stickers</h3>
                  <p className="text-gray-600">Inspirational quotes and motivational messages to keep you focused on your studies.</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sticker className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Design</h3>
                  <p className="text-gray-600">Send us your own designs or let us create custom stickers based on your requirements.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Custom Sticker Pricing</h3>
                <p className="text-gray-600 mb-6">
                  Sticker prices vary based on size, quantity, and design complexity. Email us with your requirements for a detailed quote.
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=web.mtpaperhub@gmail.com&su=Custom%20Stickers%20Quote&body=Hi%20MTPaperhub,%0D%0A%0D%0AI%20would%20like%20a%20quote%20for%20custom%20stickers:%0D%0A%0D%0AType:%20[Educational/Motivational/Custom%20Design]%0D%0AQuantity:%20%0D%0ASize:%20%0D%0ADesign%20details:%20%0D%0A%0D%0AThank%20you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors shadow-lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Get Quote
                </a>
              </div>
            </motion.div>
          )}

          {/* Posters Section */}
          {activeTab === 'posters' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Custom Posters</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  High-quality custom posters for educational displays, motivational content, and study room decoration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileImage className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Educational Posters</h3>
                  <p className="text-gray-600">Subject-specific posters, formula charts, periodic tables, and educational infographics.</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileImage className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Motivational Posters</h3>
                  <p className="text-gray-600">Inspirational quotes, study tips, and motivational content to enhance your study environment.</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileImage className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Designs</h3>
                  <p className="text-gray-600">Personalized posters with your own content, images, or designs for any educational purpose.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Custom Poster Pricing</h3>
                <p className="text-gray-600 mb-6">
                  Poster prices depend on size (A4, A3, A2, A1), paper quality, and design complexity. Contact us for a personalized quote.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Available Sizes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• A4 (210 × 297 mm)</li>
                      <li>• A3 (297 × 420 mm)</li>
                      <li>• A2 (420 × 594 mm)</li>
                      <li>• A1 (594 × 841 mm)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Paper Options</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Standard Paper</li>
                      <li>• Glossy Photo Paper</li>
                      <li>• Matte Finish</li>
                      <li>• Premium Card Stock</li>
                    </ul>
                  </div>
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=web.mtpaperhub@gmail.com&su=Custom%20Poster%20Quote&body=Hi%20MTPaperhub,%0D%0A%0D%0AI%20would%20like%20a%20quote%20for%20custom%20posters:%0D%0A%0D%0AType:%20[Educational/Motivational/Custom%20Design]%0D%0ASize:%20[A4/A3/A2/A1]%0D%0APaper%20type:%20%0D%0AQuantity:%20%0D%0ADesign%20details:%20%0D%0A%0D%0AThank%20you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Get Quote
                </a>
              </div>
            </motion.div>
          )}
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
            Contact us today for your custom printing, notes, stickers, or poster requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=web.mtpaperhub@gmail.com&su=Custom%20Request&body=Hi%20MTPaperhub,%0D%0A%0D%0AI%20would%20like%20to%20request:%0D%0A%0D%0A[Please%20describe%20what%20you%20need]%0D%0A%0D%0AThank%20you!"
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