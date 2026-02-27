export default function ScoreDisplay({ scoring, reviewMode }) {
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-500'
    if (score >= 6) return 'text-blue-500'
    if (score >= 4) return 'text-amber-500'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score >= 8) return 'bg-emerald-500/10 border-emerald-500/20'
    if (score >= 6) return 'bg-blue-500/10 border-blue-500/20'
    if (score >= 4) return 'bg-amber-500/10 border-amber-500/20'
    return 'bg-red-500/10 border-red-500/20'
  }

  return (
    <div className="space-y-4">
      {/* Main Score Bar */}
      <div className={`p-6 rounded-xl border ${getScoreBg(scoring.final_score)} transition-all`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1">Overall Health Score</h2>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black ${getScoreColor(scoring.final_score)} tracking-tighter`}>
                {scoring.final_score.toFixed(1)}
              </span>
              <span className="text-sm font-bold text-gray-400 dark:text-slate-600">/ 10.0</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex gap-2">
              {[
                { label: 'Crit', count: scoring.critical, color: 'bg-red-500' },
                { label: 'Maj', count: scoring.major, color: 'bg-amber-500' },
                { label: 'Min', count: scoring.minor, color: 'bg-blue-500' },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.count > 0 ? s.color + ' text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600'}`}>
                    {s.count}
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 dark:text-slate-600 mt-1 uppercase tracking-tighter">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 h-1.5 w-full bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${(scoring.final_score >= 8) ? 'bg-emerald-500' : (scoring.final_score >= 6) ? 'bg-blue-500' : (scoring.final_score >= 4) ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${(scoring.final_score / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Metric Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        {(reviewMode === 'hybrid' || reviewMode === 'static' || reviewMode === 'advanced') && (
          <div className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tight">Static Analysis</span>
              <span className={`text-xs font-bold ${getScoreColor(scoring.static_score)}`}>{scoring.static_score.toFixed(1)}</span>
            </div>
            <div className="h-1 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${getScoreColor(scoring.static_score).replace('text-', 'bg-')}`} style={{ width: `${(scoring.static_score / 10) * 100}%` }} />
            </div>
          </div>
        )}
        {(reviewMode === 'hybrid' || reviewMode === 'ai') && (
          <div className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tight">AI Insights</span>
              <span className={`text-xs font-bold ${getScoreColor(scoring.ai_score)}`}>{scoring.ai_score.toFixed(1)}</span>
            </div>
            <div className="h-1 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${getScoreColor(scoring.ai_score).replace('text-', 'bg-')}`} style={{ width: `${(scoring.ai_score / 10) * 100}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
