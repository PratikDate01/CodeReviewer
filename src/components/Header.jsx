import { Moon, Sun, History, Code2 } from 'lucide-react'

export default function Header({ onToggleDarkMode, darkMode, historyCount, onShowHistory }) {
  return (
    <header className="h-14 border-b border-gray-200 dark:border-slate-800 flex items-center px-6 bg-white dark:bg-slate-900/50 shrink-0 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-sm shadow-sm">
            <Code2 size={18} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
              Code Reviewer
              <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">PRO</span>
            </h1>
            <p className="text-[10px] text-gray-500 dark:text-slate-500 font-medium uppercase tracking-tight">AI-Powered Static & Deep Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onShowHistory}
            className="flex items-center gap-2 px-3 h-9 text-xs font-semibold text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-all border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
            title={`${historyCount} reviews in history`}
          >
            <History size={16} />
            <span className="hidden sm:inline">History</span>
            <span className="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-bold">{historyCount}</span>
          </button>
          
          <div className="w-px h-4 bg-gray-200 dark:bg-slate-800 mx-1" />

          <button
            onClick={onToggleDarkMode}
            className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-all"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
