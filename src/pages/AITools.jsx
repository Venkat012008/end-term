import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdAutoAwesome, 
  MdQuiz, 
  MdSummarize, 
  MdSmartToy, 
  MdErrorOutline,
  MdSave
} from 'react-icons/md';
import aiService from '../services/aiService';
import { useStudy } from '../context/StudyContext';
import { toast } from 'react-toastify';

const TOOLS = [
  { id: 'summary', title: 'AI Summarizer', description: 'Condense long notes into key points.', icon: MdSummarize, color: 'from-primary-500 to-indigo-600' },
  { id: 'quiz', title: 'Question Generator', description: 'Create practice questions from your material.', icon: MdQuiz, color: 'from-amber-500 to-orange-500' },
  { id: 'flashcards', title: 'Flashcard Creator', description: 'Turn notes into study flashcards.', icon: MdAutoAwesome, color: 'from-emerald-500 to-teal-500' },
];

export default function AITools() {
  const [activeTool, setActiveTool] = useState('summary');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addNote } = useStudy();

  const saveAsNote = async () => {
    if (!result) return;
    try {
      await addNote({
        title: `AI ${activeTool.charAt(0).toUpperCase() + activeTool.slice(1)}: ${input.slice(0, 30)}...`,
        content: result,
        type: 'ai_generated',
        toolUsed: activeTool,
      });
    } catch (err) {
      toast.error('Failed to save note');
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.warn('Please enter some text or a topic first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      let response = '';
      if (activeTool === 'summary') response = await aiService.generateSummary(input);
      if (activeTool === 'quiz') response = await aiService.generateQuestions(input);
      if (activeTool === 'flashcards') response = await aiService.generateFlashcards(input);
      
      setResult(response);
      toast.success('Generation complete!');
    } catch (err) {
      setError(err.message);
      toast.error('AI Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.info('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-surface-800">AI Study Assistant</h2>
        <p className="mt-1 text-sm text-surface-700/60">Leverage AI to supercharge your learning process.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Sidebar / Tool Selection */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex flex-col gap-2">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id);
                    setResult('');
                    setError('');
                  }}
                  className={`flex items-start gap-4 rounded-2xl p-4 text-left transition-all ${
                    activeTool === tool.id
                      ? 'bg-white shadow-md ring-1 ring-primary-100'
                      : 'hover:bg-white/50 text-surface-700/60'
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-sm`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${activeTool === tool.id ? 'text-surface-800' : ''}`}>
                      {tool.title}
                    </h3>
                    <p className="text-xs leading-relaxed">{tool.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <MdSmartToy className="h-4 w-4" /> Pro Tip
            </div>
            <p className="mt-2 text-xs text-indigo-700/70 leading-relaxed">
              For better results, provide clear context or paste a full chapter of notes.
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-surface-200">
            <h3 className="text-lg font-semibold text-surface-800 mb-4">Input Material</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your notes here or describe a topic..."
              className="min-h-[200px] w-full rounded-2xl border border-surface-200 bg-surface-50 p-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <MdAutoAwesome className="h-5 w-5" />
                    Generate {TOOLS.find(t => t.id === activeTool).title.split(' ')[1]}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {(result || loading || error) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-surface-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-800">Generated Results</h3>
                  {result && (
                    <div className="flex gap-2">
                      <button 
                        onClick={saveAsNote} 
                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        <MdSave className="h-4 w-4" /> Save to Database
                      </button>
                      <button onClick={copyToClipboard} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-surface-700 hover:bg-surface-100">
                        <MdContentCopy className="h-4 w-4" /> Copy
                      </button>
                      <button onClick={handleGenerate} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-primary-600 hover:bg-primary-50">
                        <MdRefresh className="h-4 w-4" /> Regenerate
                      </button>
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
                    <p className="text-sm font-medium text-surface-700/60 animate-pulse">AI is thinking...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-100">
                    <MdErrorOutline className="h-10 w-10 mb-2" />
                    <p className="text-sm font-bold">Error generating content</p>
                    <p className="text-xs mt-1 max-w-xs">{error}</p>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-surface-700">
                      {result}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
