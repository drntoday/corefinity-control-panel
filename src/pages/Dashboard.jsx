import { useState, useEffect } from 'react';
import { usePulse } from '../context/PulseContext';
import { useGuide } from '../context/GuideContext';
import OrangeLink from '../components/OrangeLink';
import { 
  Activity, 
  CheckCircle, 
  MessageSquare, 
  Shield, 
  Server, 
  Plus, 
  Ticket, 
  Settings,
  Cpu,
  HardDrive,
  Globe,
  Zap,
  AlertTriangle,
  X
} from 'lucide-react';

// Sparkline SVG component (defined outside main component)
function Sparkline({ data }) {
  const width = 100;
  const height = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { metrics, runningTasks, alerts, removeAlert } = usePulse();
  const { demoMode, showGuide } = useGuide();
  const [environments, setEnvironments] = useState([
    { id: 1, name: 'altitude-api', cpu: 45, memory: 62, status: 'active', region: 'us-east-1' },
    { id: 2, name: 'altitude-web', cpu: 32, memory: 48, status: 'active', region: 'us-west-2' },
    { id: 3, name: 'altitude-db', cpu: 78, memory: 85, status: 'active', region: 'eu-west-1' },
    { id: 4, name: 'staging-env', cpu: 12, memory: 24, status: 'idle', region: 'us-east-1' },
    { id: 5, name: 'analytics-prod', cpu: 56, memory: 71, status: 'active', region: 'ap-south-1' },
  ]);

  const [stats, setStats] = useState({
    totalEnvironments: 12,
    activeDeployments: 3,
    pendingTickets: 5,
    systemHealth: 99.9,
  });

  const [sparklineData, setSparklineData] = useState([98, 99, 98.5, 99.2, 99.5, 99.1, 99.8, 99.9]);

  // Sync activeDeployments with running tasks from Pulse context
  useEffect(() => {
    setStats(prev => ({ ...prev, activeDeployments: runningTasks }));
  }, [runningTasks]);

  // Sync systemHealth from Pulse context
  useEffect(() => {
    setStats(prev => ({ ...prev, systemHealth: metrics.systemHealth }));
  }, [metrics.systemHealth]);
  const activities = [
    { id: 1, type: 'deployment', message: 'Deployment Successful for altitude-api (main branch)', time: '2 min ago', icon: CheckCircle },
    { id: 2, type: 'ticket', message: 'New Support Ticket created: #4029', time: '15 min ago', icon: MessageSquare },
    { id: 3, type: 'firewall', message: 'Firewall Rule Added: 192.161.x.x', time: '1 hour ago', icon: Shield },
    { id: 4, type: 'deployment', message: 'Deployment Successful for altitude-web (develop branch)', time: '2 hours ago', icon: CheckCircle },
    { id: 5, type: 'ticket', message: 'Ticket #4028 resolved by support team', time: '3 hours ago', icon: MessageSquare },
    { id: 6, type: 'firewall', message: 'SSL Certificate renewed for altitude.com', time: '5 hours ago', icon: Shield },
  ];

  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Skeleton loader delay for premium feel
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Live fluctuation of environment metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironments(prev => prev.map(env => ({
        ...env,
        cpu: Math.min(100, Math.max(0, env.cpu + (Math.random() - 0.5) * 4)),
        memory: Math.min(100, Math.max(0, env.memory + (Math.random() - 0.5) * 4)),
      })));
      
      // Also fluctuate system health slightly
      setStats(prev => ({
        ...prev,
        systemHealth: Math.min(100, Math.max(95, prev.systemHealth + (Math.random() - 0.5) * 0.2)),
      }));

      // Update sparkline data
      setSparklineData(prev => {
        const newData = [...prev.slice(1), stats.systemHealth];
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [stats.systemHealth]);

  const getUsageColor = (value) => {
    if (value < 50) return 'bg-green-500';
    if (value < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'idle': return 'text-text-secondary bg-gray-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-text-secondary bg-gray-50';
    }
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-bg-elevated rounded w-24"></div>
        <div className="h-8 w-8 bg-bg-elevated rounded-lg"></div>
      </div>
      <div className="h-8 bg-bg-elevated rounded w-16 mb-2"></div>
      <div className="h-3 bg-bg-elevated rounded w-32"></div>
    </div>
  );

  // Skeleton Table Row
  const SkeletonTableRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="h-4 bg-bg-elevated rounded w-32"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-bg-elevated rounded w-20"></div></td>
      <td className="px-6 py-4"><div className="h-2 bg-bg-elevated rounded w-full"></div></td>
      <td className="px-6 py-4"><div className="h-2 bg-bg-elevated rounded w-full"></div></td>
      <td className="px-6 py-4"><div className="h-6 bg-bg-elevated rounded w-16"></div></td>
    </tr>
  );

  if (loading) {
    return (
      <div className="p-6 bg-[#F9FAFB] min-h-screen">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h2>
        
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="h-6 bg-bg-elevated rounded w-48 mb-6"></div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {[...Array(5)].map((_, i) => (
                    <th key={i} className="px-6 py-3 text-left">
                      <div className="h-4 bg-bg-elevated rounded w-20"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => <SkeletonTableRow key={i} />)}
              </tbody>
            </table>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="h-6 bg-bg-elevated rounded w-40 mb-6"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 mb-4 animate-pulse">
                  <div className="h-8 w-8 bg-bg-elevated rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-bg-elevated rounded w-full mb-2"></div>
                    <div className="h-3 bg-bg-elevated rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="h-6 bg-bg-elevated rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 bg-bg-elevated rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      {/* Incident Banner - Shows when System Health < 98% */}
      {stats.systemHealth < 98 && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">System Alert</p>
                <p className="text-sm text-red-700">System Health has dropped to {stats.systemHealth.toFixed(1)}%. Immediate attention may be required.</p>
              </div>
            </div>
            <button onClick={() => setStats(prev => ({ ...prev, systemHealth: 99 }))} className="text-red-600 hover:text-red-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Activity className="w-4 h-4" />
          <span>Live updates enabled</span>
        </div>
      </div>

      {/* Global Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Environments */}
        <div 
          className={`card-premium card-metric-gold p-6 ${demoMode ? 'guide-wrapper demo-active' : ''}`}
          onClick={() => demoMode && showGuide('metric-environments')}
          data-guide="metric-environments"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Total Environments</span>
            <div className="p-2 bg-bg-elevated rounded-lg">
              <Server className="w-5 h-5" style={{ color: 'var(--gold-primary)' }} />
            </div>
          </div>
          <div className="text-3xl font-bold text-text-primary mb-1">{stats.totalEnvironments}</div>
          <OrangeLink to="/environments" className="text-sm">
            View all environments →
          </OrangeLink>
          {demoMode && <span className="guide-badge">?</span>}
        </div>

        {/* Active Deployments */}
        <div 
          className={`card-premium card-metric-purple p-6 ${demoMode ? 'guide-wrapper demo-active' : ''}`}
          onClick={() => demoMode && showGuide('metric-deployments')}
          data-guide="metric-deployments"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Active Deployments</span>
            <div className="p-2 bg-bg-elevated rounded-lg">
              <Zap className="w-5 h-5" style={{ color: 'var(--purple-royal)' }} />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl font-bold text-text-primary">{stats.activeDeployments}</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ backgroundColor: 'var(--purple-royal)', opacity: 0.75 }}></span>
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: 'var(--purple-royal)' }}></span>
            </span>
          </div>
          <OrangeLink to="/deployments" className="text-sm">
            View deployments →
          </OrangeLink>
          {demoMode && <span className="guide-badge">?</span>}
        </div>

        {/* Pending Tickets */}
        <div 
          className={`card-premium card-metric-orange p-6 ${demoMode ? 'guide-wrapper demo-active' : ''}`}
          onClick={() => demoMode && showGuide('metric-tickets')}
          data-guide="metric-tickets"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Pending Tickets</span>
            <div className="p-2 bg-bg-elevated rounded-lg">
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--orange-ember)' }} />
            </div>
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--orange-ember)' }}>{stats.pendingTickets}</div>
          <OrangeLink to="/tickets" className="text-sm">
            View tickets →
          </OrangeLink>
          {demoMode && <span className="guide-badge">?</span>}
        </div>

        {/* System Health */}
        <div 
          className={`card-premium card-metric-success p-6 ${demoMode ? 'guide-wrapper demo-active' : ''}`}
          onClick={() => demoMode && showGuide('metric-health')}
          data-guide="metric-health"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">System Health</span>
            <div className="p-2 bg-bg-elevated rounded-lg">
              <Activity className="w-5 h-5" style={{ color: 'var(--success)' }} />
            </div>
          </div>
          <div className="flex items-end justify-between mb-1">
            {/* Donut Chart for System Health */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="transform -rotate-90">
              {/* Background track */}
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="var(--bg-highlight)"
                strokeWidth="8"
              />
              {/* Progress arc */}
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="var(--gold-primary)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(stats.systemHealth / 100) * 201.06} 201.06`}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="text-right">
              <span className="text-3xl font-bold text-text-primary">{stats.systemHealth.toFixed(1)}%</span>
            </div>
          </div>
          <OrangeLink to="/status" className="text-sm">
            View status page →
          </OrangeLink>
          {demoMode && <span className="guide-badge">?</span>}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Environment Health Monitoring Table */}
        <div className="lg:col-span-2 card-premium overflow-hidden">
          <div className="px-6 py-4 border-b var(--border-default) flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Top Environments</h3>
            <OrangeLink to="/environments" className="text-sm">
              View all →
            </OrangeLink>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">Environment</th>
                  <th className="px-6 py-3 text-left">Region</th>
                  <th className="px-6 py-3 text-left">CPU Usage</th>
                  <th className="px-6 py-3 text-left">Memory Usage</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {environments.map((env) => (
                  <tr key={env.id} className="">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrangeLink to={`/environments`} className="font-medium text-text-primary">
                        <Globe className="w-4 h-4 inline mr-2 text-accent-secondary" />
                        {env.name}
                      </OrangeLink>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{env.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-24 h-2 bg-bg-elevated rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${env.cpu < 50 ? "bg-accent-secondary" : env.cpu < 75 ? "bg-warning" : "bg-error"} transition-all duration-500`}
                            style={{ width: `${env.cpu}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-text-secondary w-10">{env.cpu.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-24 h-2 bg-bg-elevated rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${env.memory < 50 ? "bg-accent-secondary" : env.memory < 75 ? "bg-warning" : "bg-error"} transition-all duration-500`}
                            style={{ width: `${env.memory}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-text-secondary w-10">{env.memory.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(env.status)}`}>
                        {env.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-bg-elevated"></div>
                
                <div className="space-y-6">
                  {activities.map((activity) => {
                    const IconComponent = activity.icon;
                    const getIconBg = () => {
                      switch (activity.type) {
                        case 'deployment': return 'bg-green-100 text-green-600';
                        case 'ticket': return 'bg-orange-100 text-brand-orange';
                        case 'firewall': return 'bg-blue-100 text-blue-600';
                        default: return 'bg-gray-100 text-text-secondary';
                      }
                    };

                    return (
                      <div key={activity.id} className="relative flex items-start gap-4">
                        <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getIconBg()}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-sm text-text-primary">{activity.message}</p>
                          <p className="text-xs text-text-secondary mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-orange text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-sm">
                <Plus className="w-5 h-5" />
                Create New Environment
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-text-primary font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                <Ticket className="w-5 h-5" />
                Open Support Ticket
              </button>
              
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm font-medium text-text-primary">Maintenance Mode</span>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    maintenanceMode ? 'bg-brand-orange' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
