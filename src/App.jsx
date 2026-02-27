import { useState, useEffect } from 'react'
import Header from './components/Header'
import CodeEditor from './components/CodeEditor'
import ResultsPanel from './components/ResultsPanel'
import ReviewHistory from './components/ReviewHistory'
import { reviewCode } from './services/api'

function App() {
  const [code, setCode] = useState('')
  const [reviewMode, setReviewMode] = useState('hybrid')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('reviewHistory')
    if (saved) setHistory(JSON.parse(saved))

    const darkModePreference = localStorage.getItem('darkMode') === 'true'
    setDarkMode(darkModePreference)
  }, [])

  useEffect(() => {
    localStorage.setItem('reviewHistory', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const handleReview = async () => {
    if (!code.trim()) {
      setError('Please enter some Python code to review.')
      return
    }

    if (code.length > 50000) {
      setError('Code exceeds maximum length of 50,000 characters.')
      return
    }

    setLoading(true)
    setError('')
    setResults(null)

    try {
      const data = await reviewCode(code, reviewMode)
      setResults(data)
      setHistory([
        {
          id: Date.now(),
          code: code.substring(0, 100),
          score: data.final_score,
          timestamp: new Date().toISOString(),
          fullData: data,
        },
        ...history.slice(0, 19),
      ])
    } catch (err) {
      setError(err.message || 'An error occurred during code review.')
    } finally {
      setLoading(false)
    }
  }

  const handleLoadFromHistory = (item) => {
    setCode(item.code)
    setResults(item.fullData)
    setShowHistory(false)
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${darkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-gray-50 text-gray-900'}`}>
      <Header
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
        historyCount={history.length}
        onShowHistory={() => setShowHistory(!showHistory)}
      />

      <main className="flex-1 flex min-h-0 overflow-hidden">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Left Panel: Editor */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col border-r border-gray-200 dark:border-slate-800 min-h-0">
            <CodeEditor
              code={code}
              onCodeChange={setCode}
              reviewMode={reviewMode}
              onReviewModeChange={setReviewMode}
              onReview={handleReview}
              loading={loading}
            />
          </div>

          {/* Right Panel: Results/History */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col bg-gray-50/50 dark:bg-slate-900/20 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {showHistory ? (
                <ReviewHistory
                  history={history}
                  onLoadReview={handleLoadFromHistory}
                  onClearHistory={handleClearHistory}
                  onClose={() => setShowHistory(false)}
                />
              ) : (
                <ResultsPanel
                  results={results}
                  loading={loading}
                  error={error}
                  onClearError={() => setError('')}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-7 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-4 text-[10px] font-medium text-gray-500 dark:text-slate-500 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="uppercase tracking-wider">{loading ? 'Analyzing...' : 'Ready'}</span>
          </div>
          <span className="text-gray-300 dark:text-slate-800">|</span>
          <span>Python 3.9</span>
        </div>
      </footer>
    </div>
  )
}

export default App
