import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AdminDashboard from './pages/AdminDashboard';
import HotelPortal from './pages/HotelPortal';
import UserApp from './pages/UserApp';
import NightRobin from './pages/NightRobin';
import NightWorkers from './pages/NightWorkers';
import AIAgent from './pages/AIAgent';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/hotel" element={<HotelPortal />} />
          <Route path="/user" element={<UserApp />} />
          <Route path="/night-robin" element={<NightRobin />} />
          <Route path="/night-workers" element={<NightWorkers />} />
          <Route path="/ai-agent" element={<AIAgent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;