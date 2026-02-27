export default function StaticAnalysis({ analysis }) {
  const unused_count = analysis?.unused_variables?.length || 0
  const dead_code_count = analysis?.dead_code?.length || 0
  const exception_count = analysis?.exception_handling?.length || 0
  const total_issues = unused_count + dead_code_count + exception_count

  return (
    <div className="space-y-4">
      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Pylint</p>
          <p className="text-sm font-black text-blue-600 dark:text-blue-400">{(analysis?.pylint_score || 0).toFixed(1)}</p>
        </div>
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Unused</p>
          <p className={`text-sm font-black ${unused_count > 0 ? 'text-amber-500' : 'text-gray-300 dark:text-slate-700'}`}>{unused_count}</p>
        </div>
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Dead Code</p>
          <p className={`text-sm font-black ${dead_code_count > 0 ? 'text-red-500' : 'text-gray-300 dark:text-slate-700'}`}>{dead_code_count}</p>
        </div>
        <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Exceptions</p>
          <p className={`text-sm font-black ${exception_count > 0 ? 'text-red-500' : 'text-gray-300 dark:text-slate-700'}`}>{exception_count}</p>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { label: 'Unused Variables', items: analysis?.unused_variables, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/5', border: 'border-amber-500/10' },
          { label: 'Dead Code', items: analysis?.dead_code, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/10' },
          { label: 'Exceptions', items: analysis?.exception_handling, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/10' },
        ].filter(g => g.items?.length > 0).map(group => (
          <div key={group.label} className={`p-3 rounded-lg border ${group.border} ${group.bg}`}>
             <h4 className={`text-[11px] font-black uppercase tracking-widest mb-2 ${group.color}`}>{group.label}</h4>
             <div className="space-y-1.5">
               {group.items.map((issue, idx) => (
                 <div key={idx} className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed pl-3 border-l border-current/20">
                   {issue}
                 </div>
               ))}
             </div>
          </div>
        ))}
      </div>

      {total_issues === 0 && (
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-center gap-3">
          <CheckCircle size={16} className="text-emerald-500" />
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-500 uppercase tracking-tight">Static Rules Passed</p>
        </div>
      )}
    </div>
  )
}
