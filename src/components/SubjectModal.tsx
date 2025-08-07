import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

type Paper = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'S1' | 'M1';
type Binding = 'none' | 'tape' | 'ring';
type Level = 'o-level' | 'a-level' | 'igcse';

interface Subject {
  id: string;
  name: string;
  code: string;
  papers: Paper[];
}

interface PaperYearRange {
  paper: Paper;
  session: 'may-jun' | 'oct-nov';
  yearRange: {
    start: number;
    end: number;
  };
}

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
  level: Level;
  pricing: Record<string, number>;
}

const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  onClose,
  subject,
  level,
  pricing
}) => {
  const { addItem } = useCartStore();
  const [selectedPapers, setSelectedPapers] = useState<PaperYearRange[]>([]);
  const [binding, setBinding] = useState<Binding>('none');

  const levelConfig = {
    'o-level': { color: 'red', name: 'O Level' },
    'a-level': { color: 'blue', name: 'A Level' },
    'igcse': { color: 'green', name: 'IGCSE' },
  };

  const activeColor = levelConfig[level].color;

  const handleTogglePaper = (paper: Paper) => {
    const isPaperSelected = selectedPapers.some(p => p.paper === paper);
    
    if (isPaperSelected) {
      setSelectedPapers(selectedPapers.filter(p => p.paper !== paper));
    } else {
      const newPaper: PaperYearRange = {
        paper,
        session: 'may-jun',
        yearRange: { start: 2019, end: 2024 },
      };
      setSelectedPapers([...selectedPapers, newPaper]);
    }
  };

  const handleUpdatePaperYear = (paper: Paper, field: 'start' | 'end', change: number) => {
    const paperIndex = selectedPapers.findIndex(p => p.paper === paper);
    if (paperIndex === -1) return;

    const updatedPapers = [...selectedPapers];
    const currentYear = updatedPapers[paperIndex].yearRange[field];
    const newYear = currentYear + change;
    
    // Limit years to 2024
    if (newYear > 2024) return;
    if (newYear < 2010) return;
    
    updatedPapers[paperIndex].yearRange[field] = newYear;

    // Basic validation to prevent end year from being before start year
    if (field === 'start' && updatedPapers[paperIndex].yearRange.start > updatedPapers[paperIndex].yearRange.end) {
        updatedPapers[paperIndex].yearRange.end = updatedPapers[paperIndex].yearRange.start;
    }
    if (field === 'end' && updatedPapers[paperIndex].yearRange.end < updatedPapers[paperIndex].yearRange.start) {
        updatedPapers[paperIndex].yearRange.start = updatedPapers[paperIndex].yearRange.end;
    }

    setSelectedPapers(updatedPapers);
  };

  const handleUpdatePaperSession = (paper: Paper, session: 'may-jun' | 'oct-nov') => {
    const paperIndex = selectedPapers.findIndex(p => p.paper === paper);
    if (paperIndex === -1) return;

    const updatedPapers = [...selectedPapers];
    updatedPapers[paperIndex].session = session;
    setSelectedPapers(updatedPapers);
  };

  const calculatePrice = useMemo(() => {
    let basePrice = 0;
    selectedPapers.forEach(paperInfo => {
      const yearCount = paperInfo.yearRange.end - paperInfo.yearRange.start + 1;
      const paperPrice = pricing[paperInfo.paper] ?? 0;
      basePrice += paperPrice * (yearCount > 0 ? yearCount : 0);
    });

    // Calculate binding charges based on number of selected papers
    const bindingMultiplier = selectedPapers.length;
    if (binding === 'ring') {
      basePrice += 200 * bindingMultiplier;
    } else if (binding === 'tape') {
      basePrice += 50 * bindingMultiplier;
    }
    return basePrice;
  }, [selectedPapers, binding, pricing]);

  const handleAddToCart = () => {
    if (selectedPapers.length === 0) {
      toast.error('Please select at least one paper.');
      return;
    }

    const levelLabel = levelConfig[level].name;
    
    const customPackage = {
      id: `subject-${subject.id}-${Date.now()}`,
      type: 'custom' as const,
      name: `${levelLabel} ${subject.name}`,
      price: calculatePrice,
      details: {
        level: levelLabel,
        subjects: [{
          name: subject.name,
          code: subject.code,
          papers: selectedPapers.map(p => ({
            paper: p.paper,
            session: p.session,
            yearRange: `${p.yearRange.start}-${p.yearRange.end}`,
          })),
        }],
        binding: `${binding === 'ring' ? 'Ring' : binding === 'tape' ? 'Tape' : 'No'} Binding`,
      },
    };

    addItem(customPackage);
    toast.success('Added to cart!');
    onClose();
    
    // Reset form
    setSelectedPapers([]);
    setBinding('none');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{subject.name}</h2>
                <p className="text-gray-500">Code: {subject.code} | {levelConfig[level].name}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Paper Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Papers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {subject.papers.map(paper => {
                  const isPaperSelected = selectedPapers.some(p => p.paper === paper);
                  return (
                    <button
                      key={paper}
                      onClick={() => handleTogglePaper(paper)}
                      className={`px-4 py-3 text-sm rounded-lg border-2 transition-colors font-medium
                        ${isPaperSelected 
                          ? `bg-${activeColor}-500 text-white border-${activeColor}-500` 
                          : `bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}`}
                    >
                      {paper}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Year Selection for selected papers */}
            <AnimatePresence>
              {selectedPapers.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Year Ranges</h3>
                  <div className="space-y-4">
                    {selectedPapers.map(({ paper, session, yearRange }) => (
                      <div key={paper} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <p className="font-medium text-gray-700">
                            <span className={`font-semibold text-${activeColor}-600`}>{paper}</span> Configuration:
                          </p>
                        </div>
                        
                        {/* Session Selection */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Session:</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdatePaperSession(paper, 'may-jun')}
                              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                session === 'may-jun'
                                  ? `bg-${activeColor}-500 text-white`
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              May/Jun
                            </button>
                            <button
                              onClick={() => handleUpdatePaperSession(paper, 'oct-nov')}
                              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                session === 'oct-nov'
                                  ? `bg-${activeColor}-500 text-white`
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              Oct/Nov
                            </button>
                          </div>
                        </div>
                        
                        {/* Year Range */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <p className="text-sm text-gray-600">Year Range:</p>
                          <div className="flex items-center gap-4">
                            {/* Start Year */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Start</span>
                              <button 
                                onClick={() => handleUpdatePaperYear(paper, 'start', -1)} 
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-mono font-semibold text-gray-800 w-12 text-center">
                                {yearRange.start}
                              </span>
                              <button 
                                onClick={() => handleUpdatePaperYear(paper, 'start', 1)} 
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            {/* End Year */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">End</span>
                              <button 
                                onClick={() => handleUpdatePaperYear(paper, 'end', -1)} 
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-mono font-semibold text-gray-800 w-12 text-center">
                                {yearRange.end}
                              </span>
                              <button 
                                onClick={() => handleUpdatePaperYear(paper, 'end', 1)} 
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price Calculation Display */}
                        <div className="mt-3 p-2 bg-white rounded border">
                          <p className="text-sm text-gray-600">
                            <strong>Price Calculation:</strong> {pricing[paper] || 0} PKR × {yearRange.end - yearRange.start + 1} years = <span className="font-semibold text-green-600">{(pricing[paper] || 0) * (yearRange.end - yearRange.start + 1)} PKR</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Binding Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Binding Option</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onClick={() => setBinding('none')} 
                  className={`p-4 rounded-lg border-2 text-left transition-colors
                    ${binding === 'none' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <p className="font-semibold text-gray-800">No Binding</p>
                  <p className="text-sm text-gray-500">Simple loose papers (Free)</p>
                </button>
                <button 
                  onClick={() => setBinding('tape')} 
                  className={`p-4 rounded-lg border-2 text-left transition-colors
                    ${binding === 'tape' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <p className="font-semibold text-gray-800">Tape Binding</p>
                  <p className="text-sm text-gray-500">Simple and cost-effective (+PKR 50)</p>
                </button>
                <button 
                  onClick={() => setBinding('ring')} 
                  className={`p-4 rounded-lg border-2 text-left transition-colors
                    ${binding === 'ring' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <p className="font-semibold text-gray-800">Ring Binding</p>
                  <p className="text-sm text-gray-500">Durable and lays flat (+PKR 200)</p>
                </button>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl font-bold text-gray-900">PKR {calculatePrice.toLocaleString()}</p>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={selectedPapers.length === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                    ${selectedPapers.length === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : `bg-${activeColor}-500 hover:bg-${activeColor}-600 text-white`}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
              
              {selectedPapers.length > 0 && (
                <div className="text-sm text-gray-600">
                  <p className="mb-1">Selected: {selectedPapers.length} paper(s)</p>
                  <p>Binding: {binding === 'ring' ? `Ring Binding (+PKR ${200 * selectedPapers.length})` : binding === 'tape' ? `Tape Binding (+PKR ${50 * selectedPapers.length})` : 'No Binding (Free)'}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubjectModal;