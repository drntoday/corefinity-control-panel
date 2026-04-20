import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import OrangeLink from '../components/OrangeLink';
import StatusBadge from '../components/StatusBadge';

// Mock data for tickets
const mockTickets = [
  {
    id: 1,
    subject: 'Website Loading Slowly',
    createdDate: '2025-01-15',
    lastUpdate: '2025-01-16',
    priority: 'High',
    status: 'Open',
    agency: 'Digital Solutions Inc',
    company: 'Acme Corp',
    website: 'https://acmecorp.com',
    messages: [
      { id: 1, sender: 'user', content: 'My website has been loading very slowly for the past few days.', timestamp: '2025-01-15 09:30' },
      { id: 2, sender: 'support', content: 'Thank you for contacting us. We are looking into this issue right away.', timestamp: '2025-01-15 10:15', type: 'reply' },
      { id: 3, sender: 'support', content: 'Initial investigation shows potential database query issues.', timestamp: '2025-01-15 14:00', type: 'internal' },
    ],
    history: [
      { id: 1, action: 'Ticket created', timestamp: '2025-01-15 09:30', user: 'System' },
      { id: 2, action: 'Status changed to Open', timestamp: '2025-01-15 09:31', user: 'System' },
      { id: 3, action: 'Assigned to Support Team', timestamp: '2025-01-15 10:00', user: 'Admin' },
    ]
  },
  {
    id: 2,
    subject: 'SSL Certificate Expiring Soon',
    createdDate: '2025-01-14',
    lastUpdate: '2025-01-15',
    priority: 'Medium',
    status: 'Pending',
    agency: 'WebTech Agency',
    company: 'Beta LLC',
    website: 'https://betallc.com',
    messages: [
      { id: 1, sender: 'user', content: 'I received a notification that my SSL certificate is expiring.', timestamp: '2025-01-14 11:00' },
      { id: 2, sender: 'support', content: 'We will renew your SSL certificate within 24 hours.', timestamp: '2025-01-14 15:30', type: 'reply' },
    ],
    history: [
      { id: 1, action: 'Ticket created', timestamp: '2025-01-14 11:00', user: 'System' },
      { id: 2, action: 'Status changed to Pending', timestamp: '2025-01-14 15:30', user: 'Support Agent' },
    ]
  },
  {
    id: 3,
    subject: 'Feature Request: Dark Mode',
    createdDate: '2025-01-10',
    lastUpdate: '2025-01-12',
    priority: 'Low',
    status: 'Closed',
    agency: 'Creative Studio',
    company: 'Gamma Design',
    website: 'https://gammadesign.io',
    messages: [
      { id: 1, sender: 'user', content: 'Would love to see a dark mode option in the control panel.', timestamp: '2025-01-10 08:00' },
      { id: 2, sender: 'support', content: 'Thanks for the suggestion! We have added this to our roadmap.', timestamp: '2025-01-12 10:00', type: 'reply' },
    ],
    history: [
      { id: 1, action: 'Ticket created', timestamp: '2025-01-10 08:00', user: 'System' },
      { id: 2, action: 'Status changed to Closed', timestamp: '2025-01-12 10:00', user: 'Product Manager' },
    ]
  },
  {
    id: 4,
    subject: 'Database Connection Error',
    createdDate: '2025-01-16',
    lastUpdate: '2025-01-16',
    priority: 'Critical',
    status: 'Open',
    agency: 'Tech Partners',
    company: 'Delta Systems',
    website: 'https://deltasystems.net',
    messages: [
      { id: 1, sender: 'user', content: 'Getting frequent database connection errors on production.', timestamp: '2025-01-16 07:45' },
      { id: 2, sender: 'support', content: 'Escalating to senior engineering team immediately.', timestamp: '2025-01-16 08:00', type: 'reply' },
      { id: 3, sender: 'support', content: 'DB team is investigating the connection pool settings.', timestamp: '2025-01-16 08:30', type: 'internal' },
    ],
    history: [
      { id: 1, action: 'Ticket created', timestamp: '2025-01-16 07:45', user: 'System' },
      { id: 2, action: 'Priority set to Critical', timestamp: '2025-01-16 07:46', user: 'System' },
      { id: 3, action: 'Escalated to Engineering', timestamp: '2025-01-16 08:00', user: 'Support Lead' },
    ]
  },
];

const statusOptions = ['All', 'Open', 'Pending', 'Closed'];
const priorityColors = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-gray-100 text-gray-800',
};

const statusTypeMap = {
  Open: 'success',
  Pending: 'pending',
  Closed: 'error',
};

export default function Tickets() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortColumn, setSortColumn] = useState('lastUpdate');
  const [sortDirection, setSortDirection] = useState('desc');
  const navigate = useNavigate();

  // Filter tickets by status
  const filteredTickets = filterStatus === 'All' 
    ? mockTickets 
    : mockTickets.filter(t => t.status === filterStatus);

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Tickets</h2>
      
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {statusOptions.map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === status
                ? 'btn-primary'
                : 'bg-bg-surface text-text-secondary hover:text-text-primary border border-default'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* New Ticket Button - Gold Outline */}
      <div className="mb-4">
        <button className="btn-outline-gold flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('subject')}
              >
                Subject {getSortIcon('subject')}
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('createdDate')}
              >
                Created Date {getSortIcon('createdDate')}
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastUpdate')}
              >
                Last Update {getSortIcon('lastUpdate')}
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('priority')}
              >
                Priority {getSortIcon('priority')}
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                Status {getSortIcon('status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <OrangeLink 
                    to={`/tickets/${ticket.id}`}
                    className="font-medium text-brand-orange hover:text-orange-700 hover:underline"
                  >
                    {ticket.subject}
                  </OrangeLink>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{ticket.createdDate}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ticket.lastUpdate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge 
                    type={statusTypeMap[ticket.status]} 
                    label={ticket.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedTickets.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No tickets found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
