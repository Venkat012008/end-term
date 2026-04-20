import { motion } from 'framer-motion';
import { MdAutoAwesome, MdQuiz, MdSummarize, MdSmartToy, MdArrowForward } from 'react-icons/md';

const TOOLS = [
  { id: 'flashcards', title: 'AI Flashcards', description: 'Auto-generate flashcards from your notes using AI.', icon: MdAutoAwesome, color: 'from-primary-500 to-violet-600', shadow: 'shadow-primary-500/20' },
  { id: 'quiz', title: 'Smart Quiz', description: 'Take adaptive quizzes that target your weak areas.', icon: MdQuiz, color: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/20' },
  { id: 'summarize', title: 'Note Summarizer', description: 'Paste notes and get concise, exam-ready summaries.', icon: MdSummarize, color: 'from-accent-500 to-emerald-500', shadow: 'shadow-accent-500/20' },
  { id: 'chatbot', title: 'Study Chatbot', description: 'Ask questions and get instant explanations on any topic.', icon: MdSmartToy, color: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/20' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AITools() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-surface-800">AI Tools</h2>
        <p className="mt-1 text-sm text-surface-700/60">Supercharge your study sessions with AI-powered tools.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 sm:grid-cols-2">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.div key={tool.id} variants={card} className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-xl ${tool.shadow}`}>
              {/* Decorative blob */}
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${tool.color} opacity-[0.07] transition-transform duration-500 group-hover:scale-[2]`} />

              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg ${tool.shadow}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800">{tool.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-surface-700/60">{tool.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
                Get started <MdArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
