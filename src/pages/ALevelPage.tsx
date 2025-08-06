import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Mail, X } from 'lucide-react';
import SubjectModal from '../components/SubjectModal';

// Pricing data for A Level subjects
const pricing: Record<string, Record<string, number>> = {
  'accounting-al': { 'P1': 170, 'P2': 250, 'P3': 580 },
  'biology-al': { 'P1': 300, 'P2': 445, 'P3': 175, 'P4': 515, 'P5': 195 },
  'business-al': { 'P1': 265, 'P2': 375, 'P3': 590 },
  'chemistry-al': { 'P1': 215, 'P2': 270, 'P3': 195, 'P4': 350, 'P5': 155 },
  'comp-sci-al': { 'P1': 240, 'P2': 330, 'P3': 160, 'P4': 355 },
  'economics-al': { 'P1': 190, 'P2': 220, 'P3': 180, 'P4': 190 },
  'env-mgmt-al': { 'P1': 320, 'P2': 290 },
  'eng-lang-al': { 'P1': 225, 'P2': 110, 'P3': 160, 'P4': 110 },
  'eng-lit-al': { 'P3': 270, 'P4': 270, 'P5': 260, 'P6': 385 },
  'further-math-al': { 'P1': 305, 'P2': 335 },
  'history-al': { 'P1': 260, 'P2': 355, 'P3': 125, 'P4': 305 },
  'law-al': { 'P1': 140, 'P2': 170, 'P3': 130, 'P4': 125 },
  'math-al': { 'P1': 525, 'P3': 525, 'S1': 365, 'M1': 410 },
  'physics-al': { 'P1': 290, 'P2': 340, 'P3': 175, 'P4': 370, 'P5': 155 },
  'psychology-al': { 'P1': 320, 'P2': 395, 'P3': 400, 'P4': 340 },
  'sociology-al': { 'P1': 205, 'P2': 210, 'P3': 175 },
  'thinking-skills-al': { 'P1': 285, 'P2': 180, 'P3': 125, 'P4': 175 },
  'urdu-al': { 'P2': 210, 'P3': 210, 'P4': 210 }
};

const ALevelPage: React.FC = () => {
  const [showFloatingTile, setShowFloatingTile] = React.useState(true);
  const [selectedSubject, setSelectedSubject] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState(false);

  const subjects = [
    { id: 'accounting-al', name: 'Accounting', code: '9706', startingPrice: 170, papers: ['P1', 'P2', 'P3'] },
    { id: 'biology-al', name: 'Biology', code: '9700', startingPrice: 175, papers: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    { id: 'business-al', name: 'Business Studies', code: '9609', startingPrice: 265, papers: ['P1', 'P2', 'P3'] },
    { id: 'chemistry-al', name: 'Chemistry', code: '9701', startingPrice: 155, papers: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    { id: 'comp-sci-al', name: 'Computer Science', code: '9618', startingPrice: 160, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'economics-al', name: 'Economics', code: '9708', startingPrice: 180, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'eng-lang-al', name: 'English Language', code: '9093', startingPrice: 110, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'eng-lit-al', name: 'English Literature', code: '9695', startingPrice: 260, papers: ['P3', 'P4', 'P5', 'P6'] },
    { id: 'env-mgmt-al', name: 'Environmental Management', code: '8291', startingPrice: 290, papers: ['P1', 'P2'] },
    { id: 'further-math-al', name: 'Further Mathematics', code: '9231', startingPrice: 305, papers: ['P1', 'P2'] },
    { id: 'history-al', name: 'History', code: '9389', startingPrice: 125, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'law-al', name: 'Law', code: '9084', startingPrice: 125, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'math-al', name: 'Mathematics', code: '9709', startingPrice: 365, papers: ['P1', 'P3', 'S1', 'M1'] },
    { id: 'physics-al', name: 'Physics', code: '9702', startingPrice: 155, papers: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    { id: 'psychology-al', name: 'Psychology', code: '9990', startingPrice: 320, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'sociology-al', name: 'Sociology', code: '9699', startingPrice: 175, papers: ['P1', 'P2', 'P3'] },
    { id: 'thinking-skills-al', name: 'Thinking Skills', code: '9694', startingPrice: 125, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'urdu-al', name: 'Urdu', code: '9676', startingPrice: 210, papers: ['P2', 'P3', 'P4'] }
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
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">A Level Resources</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Advanced study materials for Cambridge A Level examinations. Comprehensive resources to help you achieve excellence in your chosen subjects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/build-your-own"
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Build Custom Package
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Available A Level Subjects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of A Level subjects. All materials include past papers and marking schemes.
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
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-lg font-bold text-blue-600">PKR {subject.startingPrice}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Code: {subject.code}</p>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSubjectClick(subject)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
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
              Our A Level packages include everything you need to excel in your advanced level examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Past Papers</h3>
              <p className="text-gray-600">Complete collection of past examination papers from recent years.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Marking Schemes</h3>
              <p className="text-gray-600">Detailed marking schemes to understand how answers are evaluated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Excel in A Levels?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Build your custom A Level package with exactly the subjects and materials you need for university preparation.
          </p>
          <Link
            to="/build-your-own"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
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
          level="a-level"
          pricing={pricing[selectedSubject.id] || {}}
        />
      )}
    </div>
  );
};

export default ALevelPage;