import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const PulseContext = createContext(null);

// Provider component
export function PulseProvider({ children }) {
  // Global simulated metrics
  const [metrics, setMetrics] = useState({
    cpu: 45,
    ram: 62,
    latency: 14,
    systemHealth: 99.9,
  });

  const [runningTasks, setRunningTasks] = useState(3);
  const [alerts, setAlerts] = useState([]);

  // The "Pulse" - Global timer that updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newCpu = Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 6));
        const newRam = Math.min(100, Math.max(0, prev.ram + (Math.random() - 0.5) * 5));
        const newLatency = Math.max(1, Math.floor(prev.latency + (Math.random() - 0.5) * 4));
        const newHealth = Math.min(100, Math.max(95, prev.systemHealth + (Math.random() - 0.5) * 0.3));
        
        return {
          cpu: newCpu,
          ram: newRam,
          latency: newLatency,
          systemHealth: newHealth,
        };
      });

      // Simulate running tasks fluctuation
      setRunningTasks(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(0, Math.min(10, prev + change));
      });

      // Generate alerts if health drops
      setMetrics(current => {
        if (current.systemHealth < 98 && !alerts.some(a => a.type === 'health')) {
          setAlerts(prev => [...prev, { 
            id: Date.now(), 
            type: 'health', 
            message: `System Health dropped to ${current.systemHealth.toFixed(1)}%`,
            severity: 'warning'
          }]);
        } else if (current.systemHealth >= 98 && alerts.some(a => a.type === 'health')) {
          setAlerts(prev => prev.filter(a => a.type !== 'health'));
        }
        return current;
      });

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    metrics,
    runningTasks,
    alerts,
    addAlert: (alert) => setAlerts(prev => [...prev, alert]),
    removeAlert: (id) => setAlerts(prev => prev.filter(a => a.id !== id)),
    clearAlerts: () => setAlerts([]),
  };

  return (
    <PulseContext.Provider value={value}>
      {children}
    </PulseContext.Provider>
  );
}

// Custom hook to use pulse context
export function usePulse() {
  const context = useContext(PulseContext);
  if (!context) {
    throw new Error('usePulse must be used within a PulseProvider');
  }
  return context;
}
