import { AlertCircle, Terminal, Shield, Cpu, Zap, Info } from 'lucide-react'
import ScoreDisplay from './ScoreDisplay'
import StaticAnalysis from './StaticAnalysis'
import AdvancedAnalysis from './AdvancedAnalysis'
import AIReview from './AIReview'
import ComplexityDetails from './ComplexityDetails'

export default function ResultsPanel({ results, loading, error, onClearError }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-widest">Deep Analysis in Progress...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 rounded-lg p-4 animate-in fade-in slide-in-from-top-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-red-800 dark:text-red-200 uppercase tracking-tight">Analysis Error</h3>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1 leading-relaxed">{error}</p>
          </div>
        </div>
        <button
          onClick={onClearError}
          className="mt-3 text-xs font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 underline decoration-2 underline-offset-4"
        >
          Dismiss
        </button>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 dark:text-slate-600 mb-6">
          <Terminal size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 uppercase tracking-tight">System Idle</h3>
        <p className="text-sm text-gray-500 dark:text-slate-500 mt-2 max-w-[240px] leading-relaxed">
          Provide source code in the editor to begin automated review.
        </p>
      </div>
    )
  }

  const scoring = {
    final_score: results.final_score,
    static_score: results.breakdown?.static_score || 0,
    ai_score: results.breakdown?.ai_score || 0,
    critical: results.security_analysis?.critical || 0,
    major: results.security_analysis?.major || 0,
    minor: results.security_analysis?.minor || 0,
  }

  const advancedAnalysis = {
    ...results.complexity_analysis,
    final_score: results.final_score,
    issues: results.security_analysis?.issues || [],
    recommendations: results.ai_review?.recommendations || [],
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Summary Section */}
      <ScoreDisplay scoring={scoring} reviewMode={results.metadata?.review_mode} />

      <div className="space-y-6">
        {results.metadata?.review_mode === 'static' && results.static_analysis && (
          <>
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                <Shield size={16} className="text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Static Analysis</h3>
              </div>
              <StaticAnalysis analysis={results.static_analysis} />
            </section>
            
            {results.complexity_analysis && (
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                  <Cpu size={16} className="text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Complexity Details</h3>
                </div>
                <ComplexityDetails complexity={results.complexity_analysis} />
              </section>
            )}
          </>
        )}

        {results.metadata?.review_mode === 'advanced' && (
          <>
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                <Zap size={16} className="text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider">AI Security & Depth</h3>
              </div>
              <AdvancedAnalysis analysis={advancedAnalysis} />
            </section>
            
            {results.complexity_analysis && (
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                  <Cpu size={16} className="text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Complexity Details</h3>
                </div>
                <ComplexityDetails complexity={results.complexity_analysis} />
              </section>
            )}
            
            {results.static_analysis && (
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                  <Shield size={16} className="text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Static Analysis</h3>
                </div>
                <StaticAnalysis analysis={results.static_analysis} />
              </section>
            )}
          </>
        )}

        {results.metadata?.review_mode === 'hybrid' && (
          <>
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                <Zap size={16} className="text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Security & Logic Analysis</h3>
              </div>
              <AdvancedAnalysis analysis={advancedAnalysis} />
            </section>

            {results.ai_review && (
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                  <Info size={16} className="text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Expert Recommendations</h3>
                </div>
                <AIReview review={results.ai_review} />
              </section>
            )}
            
            {results.complexity_analysis && (
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                  <Cpu size={16} className="text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Complexity Metrics</h3>
                </div>
                <ComplexityDetails complexity={results.complexity_analysis} />
              </section>
            )}
            
            {results.static_analysis && (
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                  <Shield size={16} className="text-blue-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Static Analysis</h3>
                </div>
                <StaticAnalysis analysis={results.static_analysis} />
              </section>
            )}
          </>
        )}

        {results.metadata?.review_mode === 'ai' && results.ai_review && (
          <section>
            <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
              <Zap size={16} className="text-blue-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider">AI expert review</h3>
            </div>
            <AIReview review={results.ai_review} />
          </section>
        )}
      </div>
    </div>
  )
}
