import { Activity, Server, GitBranch, Ticket, CheckCircle, AlertTriangle } from 'lucide-react';
import OrangeLink from '../components/OrangeLink';

export default function Status() {
  const systems = [
    { name: 'API Services', status: 'operational', uptime: 99.99 },
    { name: 'Web Frontend', status: 'operational', uptime: 99.95 },
    { name: 'Database Cluster', status: 'operational', uptime: 99.98 },
    { name: 'CDN Network', status: 'operational', uptime: 99.97 },
    { name: 'Authentication', status: 'operational', uptime: 99.99 },
    { name: 'Monitoring', status: 'degraded', uptime: 98.50 },
  ];

  const incidents = [
    { id: 1, title: 'Monitoring service experiencing latency', status: 'investigating', time: '2 hours ago' },
    { id: 2, title: 'Scheduled maintenance completed', status: 'resolved', time: '1 day ago' },
    { id: 3, title: 'CDN cache invalidation delay', status: 'resolved', time: '3 days ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50';
      case 'degraded': return 'text-yellow-600 bg-yellow-50';
      case 'down': return 'text-red-600 bg-red-50';
      case 'investigating': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'degraded': return AlertTriangle;
      case 'down': return AlertTriangle;
      default: return Activity;
    }
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary">System Status</h2>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Activity className="w-4 h-4" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Overall Status Banner */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">All Systems Operational</p>
            <p className="text-sm text-green-700">Most services are running normally. Monitoring team is investigating minor latency.</p>
          </div>
        </div>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {systems.map((system) => {
          const StatusIcon = getStatusIcon(system.status);
          return (
            <div key={system.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">{system.name}</span>
                <StatusIcon className={`w-5 h-5 ${system.status === 'operational' ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                  {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                </span>
                <span className="text-xs text-text-secondary">{system.uptime}% uptime</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Incidents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Incidents</h3>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-text-primary">{incident.title}</p>
                  <p className="text-sm text-text-secondary">{incident.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <OrangeLink to="/dashboard" className="px-4 py-2 bg-bg-elevated rounded-lg text-sm font-medium hover:bg-bg-highlight transition-colors">
            Back to Dashboard
          </OrangeLink>
          <OrangeLink to="/environments" className="px-4 py-2 bg-bg-elevated rounded-lg text-sm font-medium hover:bg-bg-highlight transition-colors">
            View Environments
          </OrangeLink>
          <OrangeLink to="/deployments" className="px-4 py-2 bg-bg-elevated rounded-lg text-sm font-medium hover:bg-bg-highlight transition-colors">
            View Deployments
          </OrangeLink>
        </div>
      </div>
    </div>
  );
}
