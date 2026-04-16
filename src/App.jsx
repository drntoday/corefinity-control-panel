import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Environments from './pages/Environments';
import Deployments from './pages/Deployments';
import Tickets from './pages/Tickets';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter basename="/corefinity-control-panel">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/environments" element={<Environments />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
