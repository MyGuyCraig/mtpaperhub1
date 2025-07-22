import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BookOpen,
  Award,
  Clock,
  Download,
  Users,
  Star,
  TrendingUp,
  Mail,
  X
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [testimonialRef, testimonialInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showFloatingTile, setShowFloatingTile] = React.useState(true);

  return (
    <div>
      {/* Floating Custom Requests Tile */}
      {showFloatingTile && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, delay: 2 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:shadow-xl transition-shadow">
            <Mail className="h-4 w-4 text-purple-200" />
            <span className="text-sm font-medium whitespace-nowrap">Have a custom request?</span>
            <Link
              to="/custom-requests"
              className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-50 transition-colors"
            >
              Learn More
            </Link>
            <button
              onClick={() => setShowFloatingTile(false)}
              className="text-purple-200 hover:text-white transition-colors ml-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-50 overflow-hidden">
          <svg className="absolute -top-24 -right-24 text-indigo-200 w-64 h-64 opacity-50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.3,42.1C65.1,55,54.4,66.3,41.6,74.5C28.8,82.7,14.4,87.8,-0.2,88.1C-14.8,88.4,-29.6,83.9,-43.9,76.5C-58.3,69.2,-72.1,59,-79.3,45.1C-86.5,31.3,-87,13.6,-85.2,-3.3C-83.3,-20.2,-79.1,-36.5,-70.3,-50.2C-61.5,-63.9,-48.1,-75,-34.2,-79.9C-20.2,-84.8,-5.7,-83.4,8.1,-79.1C21.8,-74.8,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute -bottom-16 -left-16 text-indigo-200 w-72 h-72 opacity-50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M47.7,-73.2C62.1,-65.3,74.5,-52.9,79.5,-38.1C84.5,-23.2,82.2,-6,78.1,9.8C74,25.5,68.2,39.9,58.4,50.1C48.7,60.3,35.1,66.3,20.6,72.5C6.1,78.7,-9.3,85,-23.6,82.5C-37.9,80,-51.1,68.7,-60.9,55.5C-70.7,42.3,-77.1,27.2,-79.7,11.2C-82.3,-4.8,-81.1,-21.7,-73.5,-34.9C-65.9,-48.1,-51.9,-57.6,-37.8,-65.5C-23.7,-73.4,-9.4,-79.7,4.2,-85.8C17.7,-91.9,33.3,-81.1,47.7,-73.2Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6 space-x-2">
                <div className="h-1 w-10 bg-indigo-600"></div>
                <span className="text-indigo-600 font-medium">Your Academic Success Partner</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Ace Your Exams With Premium Study Resources
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Comprehensive collection of past papers, study guides, and practice materials for O Level, A Level, and IGCSE examinations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/build-your-own" className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl hover:shadow-indigo-200 flex items-center justify-center">
                  <span>Build Your Package</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link to="/custom-requests" className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <span>Custom Orders</span>
                </Link>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">AA</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">FH</div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">ZK</div>
                </div>
                <span className="text-sm text-gray-600">Trusted by students across Pakistan</span>
              </div>
            </motion.div>

            {/* Right Content - Illustration */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Main Book Stack */}
                <div className="book-animation">
                  <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Book Stack */}
                    <rect x="100" y="180" width="200" height="30" rx="2" fill="#4338ca" />
                    <rect x="110" y="150" width="180" height="30" rx="2" fill="#6366f1" />
                    <rect x="120" y="120" width="160" height="30" rx="2" fill="#818cf8" />
                    <rect x="130" y="90" width="140" height="30" rx="2" fill="#a5b4fc" />

                    {/* Open Book */}
                    <path d="M130 90 L130 60 C130 55 135 50 140 50 L190 50 L190 90 L130 90 Z" fill="#c7d2fe" />
                    <path d="M190 90 L190 50 L240 50 C245 50 250 55 250 60 L250 90 L190 90 Z" fill="#e0e7ff" />

                    {/* Book Details */}
                    <line x1="140" y1="65" x2="180" y2="65" stroke="#4338ca" strokeWidth="2" />
                    <line x1="140" y1="75" x2="170" y2="75" stroke="#4338ca" strokeWidth="2" />
                    <line x1="200" y1="65" x2="240" y2="65" stroke="#4338ca" strokeWidth="2" />
                    <line x1="200" y1="75" x2="230" y2="75" stroke="#4338ca" strokeWidth="2" />

                    {/* Pencil */}
                    <rect x="260" y="70" width="4" height="60" rx="1" transform="rotate(-30 260 70)" fill="#f59e0b" />
                    <polygon points="260,70 265,72 262,80" fill="#b45309" />

                    {/* Glasses */}
                    <circle cx="120" cy="40" r="15" stroke="#1f2937" strokeWidth="2" fill="transparent" />
                    <circle cx="160" cy="40" r="15" stroke="#1f2937" strokeWidth="2" fill="transparent" />
                    <line x1="135" y1="40" x2="145" y2="40" stroke="#1f2937" strokeWidth="2" />
                  </svg>
                </div>

                {/* Floating Exam Badges */}
                <motion.div
                  className="absolute top-0 right-0 exam-badge bg-white p-3 rounded-lg shadow-lg"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                    </div>
                    <span className="font-medium">O Level</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 right-10 exam-badge bg-white p-3 rounded-lg shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    </div>
                    <span className="font-medium">A Level</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-40 left-0 exam-badge bg-white p-3 rounded-lg shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <span className="font-medium">IGCSE</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Build Your Own Section - Main Feature */}
      <section className="py-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-95"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Build Your Own Custom Package</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Tailor your study materials to your exact requirements. Select your course, subjects, paper types, and years.
            </p>
          </div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl bg-purple-50 border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-purple-700 mb-2">1. Select Your Course</h3>
                <p className="text-gray-600">Choose between O Level, A Level, or IGCSE.</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-pink-50 border border-pink-100">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-pink-700 mb-2">2. Choose Subjects</h3>
                <p className="text-gray-600">Select the subjects you need materials for.</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-red-50 border border-red-100">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">3. Customize Options</h3>
                <p className="text-gray-600">Select paper types, years, and binding options.</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/build-your-own"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <span>Start Building Your Package</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* Testimonials */}
      <section
        className="py-16 px-6 md:px-12 lg:px-20 bg-white"
        ref={testimonialRef}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from students who have achieved academic success with our resources.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current opacity-50" />
                </div>
                <span className="text-gray-600 text-sm">4.2</span>
              </div>
              <p className="text-gray-700 mb-6">
                "The O Level Mathematics resources were exactly what I needed. The practice papers helped me understand the exam format and improved my problem-solving skills."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3">
                  AK
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Ahmed Khan</h4>
                  <p className="text-gray-600 text-sm">O Level Student</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-gray-600 text-sm">4.8</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Building my own custom package for A Level Chemistry and Physics was incredibly helpful. I could focus on exactly the topics I struggled with."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium mr-3">
                  FH
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Fatima Hassan</h4>
                  <p className="text-gray-600 text-sm">A Level Student</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current opacity-30" />
                </div>
                <span className="text-gray-600 text-sm">4.5</span>
              </div>
              <p className="text-gray-700 mb-6">
                "The quality of the IGCSE resources is outstanding. I particularly appreciated the detailed solutions that helped me understand complex concepts."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium mr-3">
                  ZK
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Zain Khalil</h4>
                  <p className="text-gray-600 text-sm">IGCSE Student</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-gray-600 text-sm">5.0</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Outstanding quality materials for A Level Chemistry. The marking schemes were incredibly detailed and helped me understand exactly what examiners expect."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium mr-3">
                  RK
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Rania Khan</h4>
                  <p className="text-gray-600 text-sm">A Level Student</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-gray-600 text-sm">5.0</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Perfect for O Level English Literature preparation. The variety of past papers and comprehensive marking schemes made all the difference in my results."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-medium mr-3">
                  UM
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Usman Malik</h4>
                  <p className="text-gray-600 text-sm">O Level Student</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-gray-600 text-sm">5.0</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Exceptional service and quality. The IGCSE Business Studies materials were exactly what I needed. Fast delivery and professional binding too!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium mr-3">
                  LF
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Laiba Fatima</h4>
                  <p className="text-gray-600 text-sm">IGCSE Student</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current opacity-70" />
                </div>
                <span className="text-gray-600 text-sm">4.6</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Great collection of past papers for Business Studies. The marking schemes really helped me understand what examiners are looking for."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium mr-3">
                  SA
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Sara Ahmed</h4>
                  <p className="text-gray-600 text-sm">O Level Student</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current opacity-40" />
                </div>
                <span className="text-gray-600 text-sm">4.3</span>
              </div>
              <p className="text-gray-700 mb-6">
                "The Physics papers were comprehensive and well organized. Delivery was quick and the binding quality is good."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium mr-3">
                  MH
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Muhammad Hassan</h4>
                  <p className="text-gray-600 text-sm">A Level Student</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-gray-600 text-sm">5.0</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Amazing collection of A Level Physics materials. The quality is top-notch and helped me achieve the grades I needed for university admission."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium mr-3">
                  AS
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Ali Shah</h4>
                  <p className="text-gray-600 text-sm">A Level Student</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-indigo-50 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MTPaperhub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We offer premium quality study materials that are tailored to help you excel in your exams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">High-quality materials meticulously curated by education experts.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Exam-Focused</h3>
              <p className="text-gray-600">Materials designed to match the latest examination patterns and requirements.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable</h3>
              <p className="text-gray-600">Build your own package to focus on exactly what you need for your studies.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Results-Driven</h3>
              <p className="text-gray-600">Proven track record of helping students achieve outstanding results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Excel in Your Exams?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Start your journey to academic success today with our premium resources tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/build-your-own"
              className="px-8 py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center"
            >
              <span>Build Your Package</span>
            </Link>
            <Link
              to="/custom-requests"
              className="px-8 py-3 rounded-lg border border-white text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <span>Custom Orders</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;