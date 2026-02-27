import { AlertTriangle, TrendingUp, Code, Activity } from 'lucide-react'

export default function ComplexityDetails({ complexity }) {
  if (!complexity) return null

  return (
    <div className="space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Complexity</p>
          <p className="text-sm font-black text-blue-600 dark:text-blue-400">{(complexity.cyclomatic_complexity || 0).toFixed(1)}</p>
        </div>
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Maintainability</p>
          <p className="text-sm font-black text-emerald-500">{(complexity.maintainability_index || 0).toFixed(1)}</p>
        </div>
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Avg CC</p>
          <p className="text-sm font-black text-blue-500">{(complexity.avg_complexity || 0).toFixed(1)}</p>
        </div>
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Functions</p>
          <p className="text-sm font-black text-gray-600 dark:text-slate-400">{complexity.function_count || 0}</p>
        </div>
      </div>

      <div className="space-y-2">
        {/* CC List */}
        {complexity.cyclomatic_complexity_list && complexity.cyclomatic_complexity_list.length > 0 && (
          <div className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 text-gray-400 dark:text-slate-500 flex items-center gap-2">
              <Activity size={12} />
              Function Complexity
            </h4>
            <div className="space-y-1">
              {complexity.cyclomatic_complexity_list.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] py-1 border-b border-gray-50 dark:border-slate-800/50 last:border-0">
                  <div className="flex items-center gap-2 font-mono text-gray-600 dark:text-slate-400">
                    <Code size={10} className="opacity-50" />
                    <span className="truncate max-w-[140px]">{item.function}</span>
                  </div>
                  <span className={`font-bold ${item.complexity > 10 ? 'text-red-500' : item.complexity > 5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {item.complexity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Long Functions */}
        {complexity.long_functions_list && complexity.long_functions_list.length > 0 && (
          <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-red-500 flex items-center gap-2">
              <AlertTriangle size={12} />
              Long Functions
            </h4>
            <div className="space-y-1">
              {complexity.long_functions_list.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] font-medium text-red-700 dark:text-red-400/80">
                  <span className="font-mono">{item.name}</span>
                  <span className="text-[10px] font-bold">{item.lines} lines</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
