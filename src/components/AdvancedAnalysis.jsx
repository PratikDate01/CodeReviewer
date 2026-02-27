import { AlertTriangle, AlertCircle, Info, CheckCircle, Lightbulb } from 'lucide-react'
import { useState } from 'react'

const getSeverityColor = (severity) => {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return 'border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/10 text-red-700 dark:text-red-400'
    case 'major':
      return 'border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-950/10 text-amber-700 dark:text-amber-400'
    case 'minor':
      return 'border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/10 text-blue-700 dark:text-blue-400'
    default:
      return 'border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 text-gray-700 dark:text-slate-400'
  }
}

const getSeverityIcon = (severity) => {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return <AlertTriangle size={14} className="text-red-500" />
    case 'major':
      return <AlertCircle size={14} className="text-amber-500" />
    case 'minor':
      return <Info size={14} className="text-blue-500" />
    default:
      return <Info size={14} className="text-gray-500" />
  }
}

export default function AdvancedAnalysis({ analysis }) {
  const [expandedIssue, setExpandedIssue] = useState(null)

  const totalIssues = analysis.issues?.length || 0

  return (
    <div className="space-y-6">
      {/* Issues List */}
      <div className="space-y-3">
        {analysis.issues?.map((issue, idx) => (
          <div
            key={idx}
            className={`group rounded-lg border ${getSeverityColor(issue.severity)} transition-all duration-200 cursor-pointer overflow-hidden`}
            onClick={() => setExpandedIssue(expandedIssue === idx ? null : idx)}
          >
            <div className="p-3 flex items-start gap-3">
              <div className="mt-0.5 shrink-0">{getSeverityIcon(issue.severity)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-[13px] font-bold uppercase tracking-tight truncate">{issue.type}</h4>
                  <span className="text-[10px] font-mono opacity-60">L:{issue.line}</span>
                </div>
                <p className="text-xs leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                  {issue.message}
                </p>
              </div>
            </div>
            
            {expandedIssue === idx && (
              <div className="px-3 pb-3 pt-1 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                <div className="bg-gray-950 rounded p-3 text-[11px] font-mono text-slate-400 overflow-x-auto">
                   <div className="flex gap-4">
                     <span className="text-slate-600 select-none">Context:</span>
                     <span>{issue.func_name ? `Function: ${issue.func_name}` : 'Global Scope'}</span>
                   </div>
                   {issue.column && (
                     <div className="flex gap-4 mt-1">
                       <span className="text-slate-600 select-none">Position:</span>
                       <span>Column {issue.column}</span>
                     </div>
                   )}
                </div>
              </div>
            )}
          </div>
        ))}

        {totalIssues === 0 && (
          <div className="p-8 border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-950/10 rounded-xl text-center">
            <CheckCircle size={32} className="text-emerald-500 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Clear Scan</h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-500 mt-1">No security vulnerabilities or deep logic issues detected.</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="space-y-3">
          {analysis.recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm">
              <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed font-medium">{rec}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
