import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrangeLink from '../components/OrangeLink';
import StatusBadge from '../components/StatusBadge';

// Mock data for tickets (same as Tickets.jsx)
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

const statusTypeMap = {
  Open: 'success',
  Pending: 'pending',
  Closed: 'error',
};

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('conversation');
  const [messageType, setMessageType] = useState('reply'); // 'reply' or 'internal'
  const [messageContent, setMessageContent] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open');

  const ticket = mockTickets.find(t => t.id === parseInt(id));

  // Update breadcrumb on mount
  useEffect(() => {
    if (ticket) {
      const event = new CustomEvent('breadcrumb-update', {
        detail: { company: ticket.company, website: ticket.website }
      });
      window.dispatchEvent(event);
      setTicketStatus(ticket.status);
    }
  }, [ticket]);

  if (!ticket) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ticket Not Found</h2>
        <OrangeLink to="/tickets" className="text-brand-orange">Back to Tickets</OrangeLink>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!messageContent.trim()) return;
    // In a real app, this would send the message to the backend
    console.log(`Sending ${messageType} message:`, messageContent);
    setMessageContent('');
  };

  const handleStatusChange = (newStatus) => {
    setTicketStatus(newStatus);
    // In a real app, this would update the backend
    console.log(`Status changed to: ${newStatus}`);
  };

  // Filter messages to only show replies and user messages in conversation tab
  const conversationMessages = ticket.messages.filter(m => m.type !== 'internal');
  const internalMessages = ticket.messages.filter(m => m.type === 'internal');

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/tickets')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{ticket.subject}</h2>
                    <select
            value={ticketStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border-2 focus:outline-none focus:ring-2 focus:ring-brand-orange ${
              ticketStatus === 'Open' ? 'bg-green-100 text-green-800 border-green-300' :
              ticketStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
              'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${
          ticket.priority === 'Critical' ? 'bg-red-100 text-red-800' :
          ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' :
          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {ticket.priority} Priority
        </span>
      </div>

      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('conversation')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'conversation'
                  ? 'border-b-2 border-brand-orange text-brand-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conversation
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'border-b-2 border-brand-orange text-brand-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              History
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'conversation' && (
            <div className="space-y-4">
              {/* Messages Thread - Modern Chat Style */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {conversationMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-3 ${
                        msg.sender === 'user'
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-brand-blue text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {msg.sender === 'user' ? 'User' : 'Corefinity Support'}
                        </span>
                        <span className="text-xs opacity-70">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dual-Input Messaging Box */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                {/* Message Type Toggle */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setMessageType('reply')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      messageType === 'reply'
                        ? 'bg-brand-orange text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Send Reply
                  </button>
                  <button
                    onClick={() => setMessageType('internal')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      messageType === 'internal'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Internal Comment
                  </button>
                </div>

                {/* Label */}
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {messageType === 'internal' ? 'Internal Comment' : 'Customer Reply'}
                </label>

                {/* Text Area with Dynamic Styling */}
                <div className="relative">
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder={
                      messageType === 'reply'
                        ? 'Write a reply to the customer...'
                        : 'Write an internal note (visible to staff only)...'
                    }
                    className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 resize-none transition-all ${
                      messageType === 'internal'
                        ? 'bg-[#FFFBEB] border-yellow-400 focus:border-yellow-500 focus:ring-yellow-200'
                        : 'bg-white border-gray-300 focus:border-brand-orange focus:ring-brand-orange'
                    }`}
                    rows={4}
                  />
                  {messageType === 'internal' && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-yellow-600 text-white text-xs rounded font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Staff Only
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageContent.trim()}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      messageContent.trim()
                        ? messageType === 'internal'
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          : 'bg-brand-orange hover:bg-orange-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {messageType === 'internal' ? 'Post Internal Note' : 'Send Reply'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {ticket.history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500">
                      by {item.user} • {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Context Sidebar */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Ticket Info</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Agency</label>
                <p>
                  <OrangeLink to="#" className="block mt-1 font-medium">
                    {ticket.agency}
                  </OrangeLink>
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Company</label>
                <p>
                  <OrangeLink to="#" className="block mt-1 font-medium">
                    {ticket.company}
                  </OrangeLink>
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Website</label>
                <p>
                  <OrangeLink href={ticket.website} external className="block mt-1 font-medium">
                    {ticket.website}
                  </OrangeLink>
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <label className="text-xs text-gray-500 uppercase tracking-wide">Created</label>
                <p className="mt-1 text-sm text-gray-700">{ticket.createdDate}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Last Update</label>
                <p className="mt-1 text-sm text-gray-700">{ticket.lastUpdate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
