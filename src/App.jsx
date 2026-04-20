import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { PulseProvider } from './context/PulseContext';
import { GuideProvider } from './context/GuideContext';
import GuideModal from './components/GuideModal';
import GuideToggle from './components/GuideToggle';
import Dashboard from './pages/Dashboard';
import Environments from './pages/Environments';
import Deployments from './pages/Deployments';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import Profile from './pages/Profile';
import PipelineDetails from './pages/PipelineDetails';
import Status from './pages/Status';
import SshKeys from './pages/SshKeys';
import Logout from './pages/Logout';
import NotFound from './components/NotFound';

function App() {
  return (
    <PulseProvider>
      <GuideProvider>
        <GuideToggle />
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/environments" element={<Environments />} />
              <Route path="/deployments" element={<Deployments />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/environment-pipeline/:id" element={<PipelineDetails />} />
              <Route path="/status" element={<Status />} />
              <Route path="/ssh-keys" element={<SshKeys />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </HashRouter>
        <GuideModal />
      </GuideProvider>
    </PulseProvider>
  );
}

export default App;
