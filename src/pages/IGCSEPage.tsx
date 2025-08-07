import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Mail, X, Filter } from 'lucide-react';
import SubjectModal from '../components/SubjectModal';

// Pricing data for IGCSE subjects
const pricing: Record<string, Record<string, number>> = {
  'global-persp': { 'P1': 385 },
  'ict': { 'P1': 365 },
  'islamiyat': { 'P1': 320, 'P2': 300 },
  'math': { 'P1': 260, 'P4': 435 },
  'pak-studies': { 'P1': 60, 'P2': 125 },
  'physics': { 'P2': 270, 'P4': 285, 'P6': 255 },
  'sociology': { 'P1': 355, 'P2': 480 },
  'urdu-2': { 'P1': 100, 'P2': 100 },
  'accounting': { 'P1': 190, 'P2': 380 },
  'add-math': { 'P1': 365, 'P2': 350 },
  'biology': { 'P2': 240, 'P4': 445, 'P5': 250 },
  'business': { 'P1': 435, 'P2': 321 },
  'chemistry': { 'P1': 260, 'P2': 395, 'P4': 320, 'P6': 210 },
  'comp-sci': { 'P1': 290, 'P2': 365 },
  'economics': { 'P1': 160, 'P2': 395 },
  'eng-lang': { 'P1': 530, 'P2': 315 },
  'eng-2nd-lang': { 'P2': 330, 'P4': 145 },
  'env-mgmt': { 'P1': 435, 'P2': 450 },
  'geography': { 'P1': 200, 'P2': 250 }
};

const IGCSEPage: React.FC = () => {
  const [showFloatingTile, setShowFloatingTile] = React.useState(true);
  const [selectedSubject, setSelectedSubject] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<string>('name');
  const [filterBy, setFilterBy] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const subjects = [
    { id: 'global-persp', name: 'Global Perspectives', code: '0457', startingPrice: 385, papers: ['P1'] },
    { id: 'ict', name: 'Information and Communication Technology (ICT)', code: '0417', startingPrice: 365, papers: ['P1', 'P2', 'P3'] },
    { id: 'islamiyat', name: 'Islamiyat', code: '0493', startingPrice: 300, papers: ['P1', 'P2'] },
    { id: 'math', name: 'Mathematics (Core and Extended)', code: '0580', startingPrice: 260, papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'pak-studies', name: 'Pakistan Studies', code: '0448', startingPrice: 60, papers: ['P1', 'P2'] },
    { id: 'physics', name: 'Physics', code: '0625', startingPrice: 255, papers: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] },
    { id: 'sociology', name: 'Sociology', code: '0495', startingPrice: 355, papers: ['P1', 'P2'] },
    { id: 'urdu-2', name: 'Urdu as a Second Language', code: '0539', startingPrice: 100, papers: ['P1', 'P2'] },
    { id: 'accounting', name: 'Accounting', code: '0452', startingPrice: 190, papers: ['P1', 'P2'] },
    { id: 'add-math', name: 'Additional Mathematics', code: '0606', startingPrice: 350, papers: ['P1', 'P2'] },
    { id: 'biology', name: 'Biology', code: '0610', startingPrice: 240, papers: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] },
    { id: 'business', name: 'Business Studies', code: '0450', startingPrice: 321, papers: ['P1', 'P2'] },
    { id: 'chemistry', name: 'Chemistry', code: '0620', startingPrice: 210, papers: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] },
    { id: 'comp-sci', name: 'Computer Science', code: '0478', startingPrice: 290, papers: ['P1', 'P2'] },
    { id: 'economics', name: 'Economics', code: '0455', startingPrice: 160, papers: ['P1', 'P2'] },
    { id: 'eng-lang', name: 'English Language (First Language)', code: '0500', startingPrice: 315, papers: ['P1', 'P2'] },
    { id: 'eng-2nd-lang', name: 'English as a Second Language', code: '0510', startingPrice: 145, papers: ['P2', 'P4'] },
    { id: 'env-mgmt', name: 'Environmental Management', code: '0680', startingPrice: 435, papers: ['P1', 'P2'] },
    { id: 'geography', name: 'Geography', code: '0460', startingPrice: 200, papers: ['P1', 'P2'] }
  ];

  const handleSubjectClick = (subject: any) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubject(null);
  };

  // Filter and sort subjects
  const filteredAndSortedSubjects = React.useMemo(() => {
    let filtered = [...subjects];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by subject type
    if (filterBy !== 'all') {
      if (filterBy === 'sciences') {
        filtered = filtered.filter(s => ['biology', 'chemistry', 'physics'].includes(s.id));
      } else if (filterBy === 'languages') {
        filtered = filtered.filter(s => ['eng-lang', 'eng-2nd-lang', 'urdu-2'].includes(s.id));
      } else if (filterBy === 'business') {
        filtered = filtered.filter(s => ['business', 'economics', 'accounting'].includes(s.id));
      } else if (filterBy === 'mathematics') {
        filtered = filtered.filter(s => ['math', 'add-math'].includes(s.id));
      }
    }
    
    // Sort subjects
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-low') {
        return a.startingPrice - b.startingPrice;
      } else if (sortBy === 'price-high') {
        return b.startingPrice - a.startingPrice;
      }
      return 0;
    });
    
    return filtered;
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
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IGCSE Resources</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              International General Certificate of Secondary Education study materials. Comprehensive resources designed for the global curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/build-your-own"
                className="px-8 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors shadow-lg"
              >
                Build Custom Package
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Available IGCSE Subjects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of IGCSE subjects. All materials include past papers and marking schemes.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Filter & Sort</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Subjects</label>
                <input
                  type="text"
                  placeholder="Search by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject Type</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Subjects</option>
                  <option value="sciences">Sciences</option>
                  <option value="languages">Languages</option>
                  <option value="business">Business & Commerce</option>
                  <option value="mathematics">Mathematics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="name">Subject Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-lg font-bold text-green-600">PKR {subject.startingPrice}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Code: {subject.code}</p>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSubjectClick(subject)}
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
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
              Our IGCSE packages include everything you need to excel in your international examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Past Papers</h3>
              <p className="text-gray-600">Complete collection of past examination papers from recent years.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Marking Schemes</h3>
              <p className="text-gray-600">Detailed marking schemes to understand how answers are evaluated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Excel in IGCSE?</h2>
          <p className="text-green-100 max-w-2xl mx-auto mb-8">
            Build your custom IGCSE package with exactly the subjects and materials you need for international success.
          </p>
          <Link
            to="/build-your-own"
            className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors shadow-lg"
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
          level="igcse"
          pricing={pricing[selectedSubject.id] || {}}
        />
      )}
    </div>
  );
};

export default IGCSEPage;