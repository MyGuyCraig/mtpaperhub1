import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Star, Mail, X } from 'lucide-react';
import SubjectModal from '../components/SubjectModal';

// Pricing data for O Level subjects
const pricing: Record<string, Record<string, number>> = {
  'english': { 'P1': 250, 'P2': 130 },
  'english-lit': { 'P1': 255, 'P2': 130 },
  'env-mgmt': { 'P1': 175, 'P2': 170 },
  'food-nutrition': { 'P1': 290, 'P2': 290 },
  'pak-studies': { 'P1': 90, 'P2': 250 },
  'islamiyat': { 'P1': 315, 'P2': 290 },
  'math-d': { 'P1': 240, 'P2': 275 },
  'physics': { 'P1': 170, 'P2': 270, 'P4': 145 },
  'sociology': { 'P1': 145, 'P2': 180 },
  'global-persp': { 'P1': 90 },
  'urdu-1': { 'P1': 80, 'P2': 80 },
  'urdu-2': { 'P1': 175, 'P2': 175 },
  'travel-tour': { 'P1': 105, 'P2': 120 },
  'accounting': { 'P1': 120, 'P2': 330 },
  'add-math': { 'P1': 255, 'P2': 250 },
  'biology': { 'P1': 180, 'P2': 240, 'P4': 125 },
  'business': { 'P1': 290, 'P2': 290 },
  'chemistry': { 'P1': 160, 'P2': 255, 'P4': 190 },
  'comb-sci': { 'P1': 180, 'P2': 320 },
  'commerce': { 'P1': 120, 'P2': 305 },
  'comp-sci': { 'P1': 180, 'P2': 225 },
  'economics': { 'P1': 110, 'P2': 250 }
};

const OLevelPage: React.FC = () => {
  const [showFloatingTile, setShowFloatingTile] = React.useState(true);
  const [selectedSubject, setSelectedSubject] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState(false);

  const subjects = [
    { id: 'urdu-1', name: 'Urdu – First Language', code: '3247', startingPrice: 80, papers: ['P1', 'P2'] },
    { id: 'urdu-2', name: 'Urdu – Second Language', code: '3248', startingPrice: 80, papers: ['P1', 'P2'] },
    { id: 'english', name: 'English Language', code: '1123', startingPrice: 130, papers: ['P1', 'P2'] },
    { id: 'english-lit', name: 'Literature in English', code: '2010', startingPrice: 130, papers: ['P1', 'P2'] },
    { id: 'biology', name: 'Biology', code: '5090', startingPrice: 125, papers: ['P1', 'P2', 'P4'] },
    { id: 'chemistry', name: 'Chemistry', code: '5070', startingPrice: 160, papers: ['P1', 'P2', 'P4'] },
    { id: 'physics', name: 'Physics', code: '5054', startingPrice: 145, papers: ['P1', 'P2', 'P4'] },
    { id: 'math-d', name: 'Mathematics D', code: '4024', startingPrice: 240, papers: ['P1', 'P2'] },
    { id: 'add-math', name: 'Additional Mathematics', code: '4037', startingPrice: 250, papers: ['P1', 'P2'] },
    { id: 'comb-sci', name: 'Combined Science', code: '5129', startingPrice: 180, papers: ['P1', 'P2', 'P3'] },
    { id: 'pak-studies', name: 'Pakistan Studies', code: '2059', startingPrice: 90, papers: ['P1', 'P2'] },
    { id: 'islamiyat', name: 'Islamiyat', code: '2058', startingPrice: 290, papers: ['P1', 'P2'] },
    { id: 'business', name: 'Business Studies', code: '7115', startingPrice: 290, papers: ['P1', 'P2'] },
    { id: 'economics', name: 'Economics', code: '2281', startingPrice: 110, papers: ['P1', 'P2'] },
    { id: 'commerce', name: 'Commerce', code: '7100', startingPrice: 120, papers: ['P1', 'P2'] },
    { id: 'sociology', name: 'Sociology', code: '2251', startingPrice: 145, papers: ['P1', 'P2'] },
    { id: 'comp-sci', name: 'Computer Science', code: '2210', startingPrice: 180, papers: ['P1', 'P2'] },
    { id: 'global-persp', name: 'Global Perspectives', code: '2069', startingPrice: 90, papers: ['P1'] },
    { id: 'env-mgmt', name: 'Environmental Management', code: '5014', startingPrice: 170, papers: ['P1', 'P2'] },
    { id: 'food-nutrition', name: 'Food & Nutrition', code: '6065', startingPrice: 290, papers: ['P1', 'P2'] },
    { id: 'travel-tour', name: 'Travel & Tourism', code: '7096', startingPrice: 105, papers: ['P1', 'P2'] },
    { id: 'accounting', name: 'Accounting', code: '7707', startingPrice: 120, papers: ['P1', 'P2'] }
  ];

  const handleSubjectClick = (subject: any) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="text-sm font-medium whitespace-nowrap">Can't find something?</span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=web.mtpaperhub@gmail.com&su=Custom%20Request&body=Hi%20MTPaperhub,%0D%0A%0D%0AI%20need%20help%20with:%0D%0A%0D%0A[Please%20describe%20what%20you%20need]%0D%0A%0D%0AThank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-50 transition-colors"
            >
              Email
            </a>
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
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">O Level Resources</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              Comprehensive study materials for Cambridge O Level examinations. Get past papers and marking schemes for all subjects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/build-your-own"
                className="px-8 py-3 bg-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors shadow-lg"
              >
                Build Custom Package
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Available O Level Subjects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of O Level subjects. All materials include past papers and marking schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-lg font-bold text-red-600">PKR {subject.startingPrice}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Code: {subject.code}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-gray-600 text-sm ml-2">5.0</span>
                  </div>
                  <button
                    onClick={() => handleSubjectClick(subject)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center"
                  >
                    Select
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What's Included</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our O Level packages include everything you need to excel in your examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Past Papers</h3>
              <p className="text-gray-600">Complete collection of past examination papers from recent years.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Marking Schemes</h3>
              <p className="text-gray-600">Detailed marking schemes to understand how answers are evaluated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your O Level Journey?</h2>
          <p className="text-red-100 max-w-2xl mx-auto mb-8">
            Build your custom O Level package with exactly the subjects and materials you need.
          </p>
          <Link
            to="/build-your-own"
            className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors shadow-lg"
          >
            <span>Build Your Package</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Subject Modal */}
      {selectedSubject && (
        <SubjectModal
          isOpen={showModal}
          onClose={handleCloseModal}
          subject={selectedSubject}
          level="o-level"
          pricing={pricing[selectedSubject.id] || {}}
        />
      )}
    </div>
  );
};

export default OLevelPage;