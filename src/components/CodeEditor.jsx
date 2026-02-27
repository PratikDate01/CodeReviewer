import { useRef, useEffect, useState } from 'react'
import { Send, Trash2, FileCode, Copy, Clipboard, Check, Maximize2, Minimize2 } from 'lucide-react'

export default function CodeEditor({
  code,
  onCodeChange,
  reviewMode,
  onReviewModeChange,
  onReview,
  loading,
}) {
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const textAreaRef = useRef(null)
  const lineNumbersRef = useRef(null)
  
  const charPercentage = (code.length / 50000) * 100
  const isNearLimit = code.length > 45000

  const lineNumbers = code.split('\n').length
  
  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onCodeChange(text)
    } catch (err) {
      console.error('Failed to read clipboard', err)
    }
  }

  return (
    <div className={`flex flex-col flex-1 min-h-0 bg-white dark:bg-slate-950 transition-all ${
      isFullscreen ? 'fixed inset-0 z-[100]' : 'relative h-full'
    }`}>
      {/* Editor Header/Tabs */}
      <div className="h-10 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 bg-gray-50/50 dark:bg-slate-900/30 shrink-0">
        <div className="flex items-center gap-4 h-full">
          <div className="flex items-center gap-2 px-2 h-full border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider">
            <FileCode size={14} />
            <span>main.py</span>
          </div>
          <div className="h-4 w-px bg-gray-200 dark:bg-slate-800" />
          <div className="flex gap-1">
            {[
              { value: 'hybrid', label: 'Hybrid' },
              { value: 'advanced', label: 'Advanced' },
              { value: 'static', label: 'Static' },
              { value: 'ai', label: 'AI' },
            ].map(mode => (
              <button
                key={mode.value}
                onClick={() => onReviewModeChange(mode.value)}
                disabled={loading}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded transition-all ${
                  reviewMode === mode.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-slate-300'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-[10px] font-mono text-gray-500 dark:text-slate-400">
            <span>{code.length.toLocaleString()} / 50K</span>
            <div className="w-12 h-1 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${isNearLimit ? 'bg-red-500' : 'bg-blue-500'}`} 
                style={{ width: `${Math.min(charPercentage, 100)}%` }}
              />
            </div>
          </div>
          <div className="h-4 w-px bg-gray-200 dark:bg-slate-800" />
          <div className="flex gap-1">
            <button
              onClick={handlePaste}
              className="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Paste"
            ><Clipboard size={14} /></button>
            <button
              onClick={handleCopy}
              className="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Copy"
            >{copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}</button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Toggle Fullscreen"
            >{isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative group">
        <div 
          ref={lineNumbersRef}
          className="w-12 bg-gray-50/50 dark:bg-slate-900/20 border-r border-gray-100 dark:border-slate-900 py-4 text-right pr-3 font-mono text-[11px] text-gray-300 dark:text-slate-700 select-none overflow-hidden"
        >
          {Array.from({ length: Math.max(lineNumbers, 1) }).map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>

        <textarea
          ref={textAreaRef}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          onScroll={handleScroll}
          disabled={loading}
          placeholder="# Paste your Python code here..."
          className="flex-1 px-4 py-4 bg-transparent text-gray-800 dark:text-slate-200 focus:outline-none font-mono text-sm leading-6 resize-none placeholder-gray-300 dark:placeholder-slate-700 overflow-y-auto custom-scrollbar whitespace-pre"
          spellCheck="false"
        />

        {/* Action Button Floating */}
        <div className="absolute bottom-6 right-8 flex gap-2">
          <button
            onClick={() => onCodeChange('')}
            disabled={loading || !code}
            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 rounded-full hover:text-red-500 dark:hover:text-red-400 hover:shadow-lg transition-all disabled:opacity-30"
            title="Clear Code"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={onReview}
            disabled={loading || !code.trim()}
            className="h-10 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:shadow-none group"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
            <span>{loading ? 'Analyzing...' : 'Run Analysis'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}


