import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Plus,
  Minus,
  ShoppingCart,
  Mail,
  X
} from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

// --- DATA & TYPES (Keep your existing data and types) ---
// Define types
type Level = 'o-level' | 'a-level' | 'igcse';
type Paper = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'S1' | 'M1';
type Binding = 'none' | 'tape' | 'ring';

interface Subject {
  id: string;
  name: string;
  code: string;
  papers: Paper[];
}

interface PaperYearRange {
  paper: Paper;
  yearRange: {
    start: number;
    end: number;
  };
}

interface FormState {
  level: Level; // Default to 'o-level' instead of ''
  subjects: string[];
  papers: Record<string, PaperYearRange[]>;
  binding: Binding; // Default to 'tape'
  bindingOption: 'together' | 'separate';
  notes: string;
  customSubject: string;
}

// Pricing data (Keep your existing pricing object)
const pricing: Record<Level, Record<string, Record<string, number>>> = {
  'o-level': {
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
  },
  'a-level': {
    'accounting-al': { 'P1': 170, 'P2': 250, 'P3': 580 },
    'biology-al': { 'P1': 300, 'P2': 445, 'P3': 175, 'P4': 515, 'P5': 195 },
    'business-al': { 'P1': 265, 'P2': 375, 'P3': 590 },
    'chemistry-al': { 'P1': 215, 'P2': 270, 'P3': 195, 'P4': 350, 'P5': 155 },
    'comp-sci-al': { 'P1': 240, 'P2': 330, 'P3': 160, 'P4': 355 },
    'economics-al': { 'P1': 190, 'P2': 220, 'P3': 180, 'P4': 190 },
    'eng-lang-al': { 'P1': 225, 'P2': 110, 'P3': 160, 'P4': 110 },
    'eng-lit-al': { 'P3': 270, 'P4': 270, 'P5': 260, 'P6': 385 },
    'env-mgmt-al': { 'P1': 320, 'P2': 290 },
    'further-math-al': { 'P1': 305, 'P2': 335 },
    'history-al': { 'P1': 260, 'P2': 355, 'P3': 125, 'P4': 305 },
    'law-al': { 'P1': 140, 'P2': 170, 'P3': 130, 'P4': 125 },
    'math-al': { 'P1': 525, 'P3': 525, 'S1': 365, 'M1': 410 },
    'physics-al': { 'P1': 290, 'P2': 340, 'P3': 175, 'P4': 370, 'P5': 155 },
    'psychology-al': { 'P1': 320, 'P2': 395, 'P3': 400, 'P4': 340 },
    'sociology-al': { 'P1': 205, 'P2': 210, 'P3': 175 },
    'thinking-skills-al': { 'P1': 285, 'P2': 180, 'P3': 125, 'P4': 175 },
    'urdu-al': { 'P2': 210, 'P3': 210, 'P4': 210 }
  },
  'igcse': {
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
  }
};

// Subjects data (Keep your existing subjects object)
const subjects: Record<Level, Subject[]> = {
  'o-level': [
    { id: 'urdu-1', name: 'Urdu – First Language', code: '3247', papers: ['P1', 'P2'] },
    { id: 'urdu-2', name: 'Urdu – Second Language', code: '3248', papers: ['P1', 'P2'] },
    { id: 'english', name: 'English Language', code: '1123', papers: ['P1', 'P2'] },
    { id: 'english-lit', name: 'Literature in English', code: '2010', papers: ['P1', 'P2'] },
    { id: 'biology', name: 'Biology', code: '5090', papers: ['P1', 'P2', 'P4'] },
    { id: 'chemistry', name: 'Chemistry', code: '5070', papers: ['P1', 'P2', 'P4'] },
    { id: 'physics', name: 'Physics', code: '5054', papers: ['P1', 'P2', 'P4'] },
    { id: 'math-d', name: 'Mathematics D', code: '4024', papers: ['P1', 'P2'] },
    { id: 'add-math', name: 'Additional Mathematics', code: '4037', papers: ['P1', 'P2'] },
    { id: 'comb-sci', name: 'Combined Science', code: '5129', papers: ['P1', 'P2', 'P3'] },
    { id: 'pak-studies', name: 'Pakistan Studies', code: '2059', papers: ['P1', 'P2'] },
    { id: 'islamiyat', name: 'Islamiyat', code: '2058', papers: ['P1', 'P2'] },
    { id: 'business', name: 'Business Studies', code: '7115', papers: ['P1', 'P2'] },
    { id: 'economics', name: 'Economics', code: '2281', papers: ['P1', 'P2'] },
    { id: 'commerce', name: 'Commerce', code: '7100', papers: ['P1', 'P2'] },
    { id: 'sociology', name: 'Sociology', code: '2251', papers: ['P1', 'P2'] },
    { id: 'comp-sci', name: 'Computer Science', code: '2210', papers: ['P1', 'P2'] },
    { id: 'global-persp', name: 'Global Perspectives', code: '2069', papers: ['P1'] },
    { id: 'env-mgmt', name: 'Environmental Management', code: '5014', papers: ['P1', 'P2'] },
    { id: 'food-nutrition', name: 'Food & Nutrition', code: '6065', papers: ['P1', 'P2'] },
    { id: 'travel-tour', name: 'Travel & Tourism', code: '7096', papers: ['P1', 'P2'] },
    { id: 'accounting', name: 'Accounting', code: '7707', papers: ['P1', 'P2'] }
  ],
  'a-level': [
    { id: 'accounting-al', name: 'Accounting', code: '9706', papers: ['P1', 'P2', 'P3'] },
    { id: 'biology-al', name: 'Biology', code: '9700', papers: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    { id: 'business-al', name: 'Business Studies', code: '9609', papers: ['P1', 'P2', 'P3'] },
    { id: 'chemistry-al', name: 'Chemistry', code: '9701', papers: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    { id: 'comp-sci-al', name: 'Computer Science', code: '9618', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'economics-al', name: 'Economics', code: '9708', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'eng-lang-al', name: 'English Language', code: '9093', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'eng-lit-al', name: 'English Literature', code: '9695', papers: ['P3', 'P4', 'P5', 'P6'] },
    { id: 'env-mgmt-al', name: 'Environmental Management', code: '8291', papers: ['P1', 'P2'] },
    { id: 'further-math-al', name: 'Further Mathematics', code: '9231', papers: ['P1', 'P2'] },
    { id: 'history-al', name: 'History', code: '9389', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'law-al', name: 'Law', code: '9084', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'math-al', name: 'Mathematics', code: '9709', papers: ['P1', 'P3', 'S1', 'M1'] },
    { id: 'physics-al', name: 'Physics', code: '9702', papers: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    { id: 'psychology-al', name: 'Psychology', code: '9990', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'sociology-al', name: 'Sociology', code: '9699', papers: ['P1', 'P2', 'P3'] },
    { id: 'thinking-skills-al', name: 'Thinking Skills', code: '9694', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'urdu-al', name: 'Urdu', code: '9676', papers: ['P2', 'P3', 'P4'] }
  ],
  'igcse': [
    { id: 'eng-lang', name: 'English Language (First Language)', code: '0500', papers: ['P1', 'P2'] },
    { id: 'eng-lit', name: 'English Literature', code: '0475', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'urdu-2', name: 'Urdu as a Second Language', code: '0539', papers: ['P1', 'P2'] },
    { id: 'math', name: 'Mathematics (Core and Extended)', code: '0580', papers: ['P1', 'P2', 'P3', 'P4'] },
    { id: 'add-math', name: 'Additional Mathematics', code: '0606', papers: ['P1', 'P2'] },
    { id: 'biology', name: 'Biology', code: '0610', papers: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] },
    { id: 'chemistry', name: 'Chemistry', code: '0620', papers: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] },
    { id: 'physics', name: 'Physics', code: '0625', papers: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] },
    { id: 'comb-sci', name: 'Combined Science', code: '0653', papers: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] },
    { id: 'pak-studies', name: 'Pakistan Studies', code: '0448', papers: ['P1', 'P2'] },
    { id: 'islamiyat', name: 'Islamiyat', code: '0493', papers: ['P1', 'P2'] },
    { id: 'business', name: 'Business Studies', code: '0450', papers: ['P1', 'P2'] },
    { id: 'economics', name: 'Economics', code: '0455', papers: ['P1', 'P2'] },
    { id: 'sociology', name: 'Sociology', code: '0495', papers: ['P1', 'P2'] },
    { id: 'global-persp', name: 'Global Perspectives', code: '0457', papers: ['P1'] },
    { id: 'comp-sci', name: 'Computer Science', code: '0478', papers: ['P1', 'P2'] },
    { id: 'ict', name: 'Information and Communication Technology (ICT)', code: '0417', papers: ['P1', 'P2', 'P3'] },
    { id: 'geography', name: 'Geography', code: '0460', papers: ['P1', 'P2'] },
    { id: 'env-mgmt', name: 'Environmental Management', code: '0680', papers: ['P1', 'P2'] },
    { id: 'accounting', name: 'Accounting', code: '0452', papers: ['P1', 'P2'] },
    { id: 'eng-2nd-lang', name: 'English as a Second Language', code: '0510', papers: ['P2', 'P4'] }
  ]
};
// Make sure to paste your full pricing and subjects data here from your original code.


// --- REDESIGNED COMPONENT ---
const BuildYourOwnPage: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [showConfetti, setShowConfetti] = useState(false);
  const [showFloatingTile, setShowFloatingTile] = useState(true);
  const [formState, setFormState] = useState<FormState>({
    level: 'o-level', 
    subjects: [],
    papers: {},
    binding: 'none',
    bindingOption: 'together',
    notes: '',
    customSubject: '',
  });

  // --- LOGIC (Mostly unchanged, adapted for new flow) ---
  const handleSelectLevel = (level: Level) => {
    setFormState({
      ...formState,
      level,
      subjects: [],
      papers: {},
    });
  };

  const handleToggleSubject = (subjectId: string) => {
    const isSelected = formState.subjects.includes(subjectId);
    let updatedSubjects = [...formState.subjects];
    const updatedPapers = { ...formState.papers };

    if (isSelected) {
      updatedSubjects = updatedSubjects.filter(id => id !== subjectId);
      delete updatedPapers[subjectId];
    } else {
      updatedSubjects.push(subjectId);
      updatedPapers[subjectId] = [];
    }
    setFormState({ ...formState, subjects: updatedSubjects, papers: updatedPapers });
  };
  
  const handleTogglePaper = (subjectId: string, paper: Paper) => {
    const currentPapers = formState.papers[subjectId] || [];
    const isPaperSelected = currentPapers.some(p => p.paper === paper);
    let updatedSubjectPapers;

    if (isPaperSelected) {
      updatedSubjectPapers = currentPapers.filter(p => p.paper !== paper);
    } else {
      const defaultYear = 2024;
      const newPaper: PaperYearRange = {
        paper,
        yearRange: { start: defaultYear - 5, end: defaultYear },
      };
      updatedSubjectPapers = [...currentPapers, newPaper];
    }
    
    setFormState({
      ...formState,
      papers: { ...formState.papers, [subjectId]: updatedSubjectPapers },
    });
  };

  const handleUpdatePaperYear = (subjectId: string, paper: Paper, field: 'start' | 'end', change: number) => {
    const currentPapers = formState.papers[subjectId] || [];
    const paperIndex = currentPapers.findIndex(p => p.paper === paper);
    if (paperIndex === -1) return;

    const updatedPapers = [...currentPapers];
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

    setFormState({
      ...formState,
      papers: { ...formState.papers, [subjectId]: updatedPapers },
    });
  };

  const calculatePrice = useMemo(() => {
    let basePrice = 0;
    let totalPapers = 0;
    formState.subjects.forEach(subjectId => {
      const papers = formState.papers[subjectId] || [];
      papers.forEach(paperInfo => {
        const yearCount = paperInfo.yearRange.end - paperInfo.yearRange.start + 1;
        const paperPrice = pricing[formState.level]?.[subjectId]?.[paperInfo.paper] ?? 0;
        basePrice += paperPrice * (yearCount > 0 ? yearCount : 0);
        totalPapers += 1;
      });
    });

    // Calculate binding charges based on total number of papers
    if (formState.binding === 'ring') {
      basePrice += 200 * totalPapers;
    } else if (formState.binding === 'tape') {
      basePrice += 50 * totalPapers;
    }
    return basePrice;
  }, [formState]);

  const handleAddToCart = () => {
    if (formState.subjects.length === 0) {
      toast.error('Please select at least one subject.');
      return;
    }
    const hasSelectedPapers = formState.subjects.some(sid => formState.papers[sid]?.length > 0);
    if (!hasSelectedPapers) {
      toast.error('Please select at least one paper for your chosen subjects.');
      return;
    }

    const levelLabel = formState.level === 'o-level' ? 'O Level' : formState.level === 'a-level' ? 'A Level' : 'IGCSE';
    const allSubjects = subjects[formState.level];
    
    const customPackage = {
      id: `custom-${Date.now()}`,
      type: 'custom' as const,
      name: `Custom ${levelLabel} Package`,
      price: calculatePrice,
      details: {
        level: levelLabel,
        subjects: formState.subjects.map(subjectId => {
          const subject = allSubjects.find(s => s.id === subjectId);
          return {
            name: subject?.name,
            code: subject?.code,
            papers: formState.papers[subjectId]?.map(p => ({
              paper: p.paper,
              yearRange: `${p.yearRange.start}-${p.yearRange.end}`,
            })) || [],
          };
        }),
        binding: `${formState.binding === 'ring' ? 'Ring' : 'Tape'} Binding (${formState.bindingOption})`,
        notes: formState.notes,
        customSubject: formState.customSubject,
      },
    };

    addItem(customPackage);
    toast.success('Custom package added to cart!');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const getSubjectById = (subjectId: string): Subject | undefined => {
    return subjects[formState.level].find(s => s.id === subjectId);
  };

  const levelConfig = {
    'o-level': { color: 'red', name: 'O Level' },
    'a-level': { color: 'blue', name: 'A Level' },
    'igcse': { color: 'green', name: 'IGCSE' },
  };

  const activeColor = levelConfig[formState.level].color;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      
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
      
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 border-b border-slate-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <h1 className="text-2xl font-bold text-slate-800">Build Your Own Package</h1>
                <button onClick={() => navigate('/cart')} className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                    <ShoppingCart className="h-6 w-6" />
                    {/* You can add a cart count indicator here if your cartStore provides it */}
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* --- LEFT COLUMN: CONTROLS --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Level & Subject Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-1">Step 1: Select Level & Subjects</h2>
              <p className="text-slate-500 mb-6">Choose an exam level to see the available subjects.</p>
              
              {/* Level Tabs */}
              <div className="flex border-b border-slate-200 mb-6">
                {Object.entries(levelConfig).map(([level, config]) => (
                  <button
                    key={level}
                    onClick={() => handleSelectLevel(level as Level)}
                    className={`px-4 py-2 -mb-px text-sm font-semibold border-b-2 transition-colors duration-200
                      ${formState.level === level
                        ? `border-${config.color}-500 text-${config.color}-600`
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`
                    }
                  >{config.name}</button>
                ))}
              </div>
              
              {/* Subjects Grid */}
              <motion.div
                key={formState.level}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {subjects[formState.level].map((subject) => {
                  const isSelected = formState.subjects.includes(subject.id);
                  return (
                    <button
                      key={subject.id}
                      onClick={() => handleToggleSubject(subject.id)}
                      className={`p-4 rounded-xl text-left border-2 transition-all duration-200
                        ${isSelected
                          ? `bg-${activeColor}-50 border-${activeColor}-500 shadow-sm`
                          : 'bg-white border-slate-200 hover:border-slate-300'}`
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-sm">{subject.name}</p>
                          <p className="text-xs text-slate-500 mt-1">Code: {subject.code}</p>
                        </div>
                        <div className={`w-5 h-5 mt-0.5 ml-2 flex-shrink-0 rounded-full flex items-center justify-center border-2
                          ${isSelected ? `bg-${activeColor}-500 border-${activeColor}-500` : 'border-slate-300'}`
                        }>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* 2. Paper & Year Configuration */}
            <AnimatePresence>
            {formState.subjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6"
              >
                <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-1">Step 2: Configure Your Papers</h2>
                    <p className="text-slate-500">For each subject, select the papers and year range you need.</p>
                </div>

                {formState.subjects.map(subjectId => {
                  const subject = getSubjectById(subjectId);
                  if (!subject) return null;
                  const selectedPapers = formState.papers[subjectId] || [];

                  return (
                    <div key={subjectId} className={`p-5 rounded-xl bg-slate-50 border border-slate-200`}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-slate-800">{subject.name}</h3>
                        <button onClick={() => handleToggleSubject(subjectId)} className="text-slate-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Paper Toggles */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                        {subject.papers.map(paper => {
                          const isPaperSelected = selectedPapers.some(p => p.paper === paper);
                          return (
                            <button
                              key={paper}
                              onClick={() => handleTogglePaper(subjectId, paper)}
                              className={`px-3 py-2 text-sm rounded-md border transition-colors
                                ${isPaperSelected ? `bg-${activeColor}-500 text-white border-${activeColor}-500` : `bg-white border-slate-300 text-slate-700 hover:bg-slate-100`}`}
                            >
                              {paper}
                            </button>
                          );
                        })}
                      </div>

                      {/* Year Selection for selected papers */}
                      <AnimatePresence>
                      {selectedPapers.length > 0 && (
                        <motion.div 
                          layout 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 mt-5"
                        >
                          {selectedPapers.map(({ paper, yearRange }) => (
                            <div key={paper} className="p-4 bg-white rounded-lg border border-slate-200 flex items-center justify-between flex-wrap gap-4">
                              <p className="font-medium text-slate-700">Year Range for <span className={`font-semibold text-${activeColor}-600`}>{paper}</span>:</p>
                              <div className="flex items-center gap-4">
                                {/* Start Year */}
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-slate-500">Start</span>
                                  <button onClick={() => handleUpdatePaperYear(subjectId, paper, 'start', -1)} className="p-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300"><Minus className="w-4 h-4" /></button>
                                  <span className="font-mono font-semibold text-slate-800 w-10 text-center">{yearRange.start}</span>
                                  <button onClick={() => handleUpdatePaperYear(subjectId, paper, 'start', 1)} className="p-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300"><Plus className="w-4 h-4" /></button>
                                </div>
                                {/* End Year */}
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-slate-500">End</span>
                                  <button onClick={() => handleUpdatePaperYear(subjectId, paper, 'end', -1)} className="p-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300"><Minus className="w-4 h-4" /></button>
                                  <span className="font-mono font-semibold text-slate-800 w-10 text-center">{yearRange.end}</span>
                                  <button onClick={() => handleUpdatePaperYear(subjectId, paper, 'end', 1)} className="p-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300"><Plus className="w-4 h-4" /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}
            </AnimatePresence>

            {/* 3. Binding & Notes */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Step 3: Final Touches</h2>
              
              {/* Binding */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-700 mb-3">Binding Option</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button onClick={() => setFormState({...formState, binding: 'none'})} className={`p-3 rounded-lg border-2 text-sm text-left transition ${formState.binding === 'none' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <p className="font-semibold">No Binding</p>
                    <p className="text-slate-500">Simple loose papers (Free)</p>
                  </button>
                  <button onClick={() => setFormState({...formState, binding: 'tape'})} className={`p-3 rounded-lg border-2 text-sm text-left transition ${formState.binding === 'tape' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <p className="font-semibold">Tape Binding</p>
                    <p className="text-slate-500">Simple and cost-effective (+PKR 50 per paper)</p>
                  </button>
                  <button onClick={() => setFormState({...formState, binding: 'ring'})} className={`p-3 rounded-lg border-2 text-sm text-left transition ${formState.binding === 'ring' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <p className="font-semibold">Ring Binding</p>
                    <p className="text-slate-500">Durable and lays flat (+PKR 200 per paper)</p>
                  </button>
                </div>
              </div>
              
              {/* Special Notes */}
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Special Notes (Optional)</h3>
                <textarea
                  value={formState.notes}
                  onChange={(e) => setFormState({...formState, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  placeholder="Any special instructions or custom requirements..."
                />
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Custom Package</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Level</span>
                      <span className={`font-semibold text-${activeColor}-600`}>{levelConfig[formState.level].name}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-slate-500">Binding</span>
                      <span className="font-medium text-slate-700 capitalize">{formState.binding}</span>
                    </div>
                  </div>
                  
                  <hr className="my-4"/>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {formState.subjects.length > 0 ? formState.subjects.map(sid => {
                      const subject = getSubjectById(sid);
                      const papers = formState.papers[sid] || [];
                      return (
                        <div key={sid} className="text-sm">
                          <p className="font-semibold text-slate-700">{subject?.name}</p>
                          {papers.length > 0 ? (
                            <ul className="pl-4 text-slate-500 list-disc list-inside">
                              {papers.map(p => (
                                <li key={p.paper}>{p.paper}: <span className="font-mono">{p.yearRange.start}-{p.yearRange.end}</span></li>
                              ))}
                            </ul>
                          ) : (
                            <p className="pl-4 text-xs text-slate-400">No papers selected</p>
                          )}
                        </div>
                      )
                    }) : (
                        <div className="text-center py-8">
                            <BookOpen className="mx-auto h-12 w-12 text-slate-300"/>
                            <p className="mt-2 text-sm text-slate-500">Your selections will appear here.</p>
                        </div>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-b-2xl border-t border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-slate-800">Total Price</span>
                    <span className={`text-2xl font-bold text-slate-900`}>PKR {calculatePrice.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-${activeColor}-500/20 hover:shadow-xl hover:shadow-${activeColor}-500/30 bg-${activeColor}-500 hover:bg-${activeColor}-600 disabled:bg-slate-300 disabled:shadow-none`}>
                    <ShoppingCart className="w-5 h-5"/>
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm flex gap-3">
                  <HelpCircle className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5"/>
                  <p>Can't find a subject? Add a custom request in the "Special Notes" and we'll do our best to accommodate.</p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuildYourOwnPage;