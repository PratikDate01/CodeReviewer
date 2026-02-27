import { Copy, Check, Bug, Zap, Sparkles, Lock, Clock, Code, Lightbulb, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function AIReview({ review }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const renderListSection = (title, items, color, Icon) => {
    if (!items || items.length === 0) return null
    
    const isArray = Array.isArray(items)
    const itemList = isArray ? items : [items]
    
    return (
      <div className={`relative p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${getColorClasses(color)}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg flex-shrink-0 ${getColorClasses(color).split(' ')[0]}`}>
            <Icon size={22} className={getIconColor(color)} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base mb-3 text-gray-900 dark:text-white">
              {title}
            </h4>
            {isArray ? (
              <ul className="space-y-2">
                {itemList.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-2">
                    <span className="text-primary-500 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {itemList[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const getColorClasses = (color) => {
    const colors = {
      danger: 'from-danger-50 to-red-50 dark:from-danger-900/20 dark:to-red-900/20 border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-900/20',
      warning: 'from-warning-50 to-amber-50 dark:from-warning-900/20 dark:to-amber-900/20 border-warning-200 dark:border-warning-800',
      primary: 'from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800',
      info: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-800',
      success: 'from-success-50 to-green-50 dark:from-success-900/20 dark:to-green-900/20 border-success-200 dark:border-success-800',
    }
    return colors[color] || colors.primary
  }

  const getIconColor = (color) => {
    const colors = {
      danger: 'text-danger-600 dark:text-danger-400',
      warning: 'text-warning-600 dark:text-warning-400',
      primary: 'text-primary-600 dark:text-primary-400',
      info: 'text-cyan-600 dark:text-cyan-400',
      success: 'text-success-600 dark:text-success-400',
    }
    return colors[color] || colors.primary
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card dark:card-dark">
        <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">AI Code Review - Comprehensive Analysis</h3>

        <div className="space-y-4">
          {renderListSection('Logical Flaws', review.logical_flaws, 'danger', Bug)}
          {renderListSection('Architecture Suggestions', review.architecture_suggestions, 'primary', Code)}
          {renderListSection('Performance Optimizations', review.performance_optimization, 'warning', Zap)}
          {renderListSection('Readability Suggestions', review.readability_suggestions, 'info', AlertCircle)}
          {renderListSection('Refactoring Proposals', review.refactoring_proposal, 'warning', Sparkles)}
          {renderListSection('Design Pattern Recommendations', review.design_pattern_recommendations, 'success', Lightbulb)}
        </div>
      </div>

      {review.refactored_code && (
        <div className="card dark:card-dark animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Suggested Refactoring</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Optimized and improved code</p>
            </div>
            <button
              onClick={() => copyToClipboard(review.refactored_code, 'refactored')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                copiedIndex === 'refactored'
                  ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 border border-success-300 dark:border-success-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {copiedIndex === 'refactored' ? (
                <>
                  <Check size={16} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy Code
                </>
              )}
            </button>
          </div>
          <div className="code-block">
            <pre className="text-xs md:text-sm overflow-x-auto">{review.refactored_code}</pre>
          </div>
        </div>
      )}

      {review.ai_score !== undefined && (
        <div className="p-6 bg-gradient-to-r from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-primary-200 dark:border-primary-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-primary-700 dark:text-primary-300 uppercase tracking-wider">AI Quality Score</p>
              <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">Overall code quality assessment</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-primary-600 dark:text-primary-400">
                {review.ai_score}<span className="text-lg text-gray-500 dark:text-gray-400">/10</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
