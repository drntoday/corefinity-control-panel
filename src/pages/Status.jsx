import { useState } from 'react';
import { Activity } from 'lucide-react';
import OrangeLink from '../components/OrangeLink';

export default function Status() {
  const [systemStatus] = useState({
    overall: 'operational',
    components: [
      { name: 'API Services', status: 'operational' },
      { name: 'Web Frontend', status: 'operational' },
      { name: 'Database', status: 'operational' },
      { name: 'CDN', status: 'operational' },
      { name: 'Authentication', status: 'operational' },
    ],
    incidents: [],
    uptime: 99.99,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50';
      case 'degraded': return 'text-yellow-600 bg-yellow-50';
      case 'outage': return 'text-red-600 bg-red-50';
      default: return 'text-text-secondary bg-gray-50';
    }
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">System Status</h2>
        <p className="text-text-secondary">Real-time status of all Altitude services</p>
      </div>

      {/* Overall Status */}
      <div className="card-premium p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${systemStatus.overall === 'operational' ? 'bg-green-100' : 'bg-red-100'}`}>
              <Activity className={`w-8 h-8 ${systemStatus.overall === 'operational' ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary">
                All Systems {systemStatus.overall === 'operational' ? 'Operational' : 'Experiencing Issues'}
              </h3>
              <p className="text-text-secondary">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-text-primary">{systemStatus.uptime}%</div>
            <div className="text-sm text-text-secondary">Uptime (30 days)</div>
          </div>
        </div>
      </div>

      {/* Component Status */}
      <div className="card-premium p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Component Status</h3>
        <div className="space-y-3">
          {systemStatus.components.map((component) => (
            <div key={component.name} className="flex items-center justify-between py-3 border-b last:border-0">
              <span className="text-text-primary">{component.name}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(component.status)}`}>
                {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Incidents</h3>
        {systemStatus.incidents.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No incidents in the last 30 days</p>
          </div>
        ) : (
          <div className="space-y-4">
            {systemStatus.incidents.map((incident) => (
              <div key={incident.id} className="border-l-4 border-orange-500 pl-4 py-2">
                <h4 className="font-medium text-text-primary">{incident.title}</h4>
                <p className="text-sm text-text-secondary mt-1">{incident.description}</p>
                <p className="text-xs text-text-secondary mt-2">{incident.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-6 card-premium p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
        <div className="flex flex-wrap gap-4">
          <OrangeLink to="/dashboard" className="text-sm">← Back to Dashboard</OrangeLink>
          <OrangeLink to="/environments" className="text-sm">View Environments</OrangeLink>
          <OrangeLink to="/deployments" className="text-sm">View Deployments</OrangeLink>
        </div>
      </div>
    </div>
  );
}
