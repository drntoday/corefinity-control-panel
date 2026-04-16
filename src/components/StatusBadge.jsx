/**
 * StatusBadge Component
 * A pill-shaped badge with appropriate styling based on status type.
 * 
 * @param {'success' | 'pending' | 'error'} type - The status type
 * @param {string} label - Optional text label for the badge
 * @param {boolean} active - Whether to show pulsing animation (for success/active states)
 * @param {string} className - Additional CSS classes
 */
export default function StatusBadge({ 
  type = 'pending', 
  label, 
  active = false,
  className = '' 
}) {
  const styles = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      dot: 'bg-yellow-500',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-500',
    },
  };

  const currentStyle = styles[type] || styles.pending;

  return (
    <span 
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
        ${currentStyle.bg} ${currentStyle.text} ${className}
      `}
    >
      {active && (
        <span className="relative flex h-2 w-2">
          <span 
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${currentStyle.dot}`}
          ></span>
          <span 
            className={`relative inline-flex rounded-full h-2 w-2 ${currentStyle.dot}`}
          ></span>
        </span>
      )}
      {!active && (
        <span className={`h-2 w-2 rounded-full ${currentStyle.dot}`}></span>
      )}
      {label && <span>{label}</span>}
    </span>
  );
}
