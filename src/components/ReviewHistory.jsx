import { Trash2, ChevronRight } from 'lucide-react'

function getScoreColor(score) {
  if (score >= 8) return 'text-success-600 dark:text-success-400'
  if (score >= 6) return 'text-primary-600 dark:text-primary-400'
  if (score >= 4) return 'text-warning-600 dark:text-warning-400'
  return 'text-danger-600 dark:text-danger-400'
}

export default function ReviewHistory({ history, onLoadReview, onClearHistory, onClose }) {
  return (
    <div className="card dark:card-dark animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Review History</h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 text-xs text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20 px-2 py-1 rounded"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No review history yet
        </p>
      ) : (
        <div className="space-y-2">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => onLoadReview(item)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 text-left transition flex items-center justify-between group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.code}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                  {item.score.toFixed(2)}
                </span>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        className="mt-4 w-full btn-secondary"
      >
        Close History
      </button>
    </div>
  )
}
