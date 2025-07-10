import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import SuccessPage from './pages/SuccessPage';
import ParticlesBG from './components/ParticlesBG';
import HomePage from './pages/homepage';
import BookingPage from './pages/BookingPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPage from './pages/PaymentPage';
import PaymentConfirmed from './pages/PaymentConfirmed';
// Wrapper to use useLocation outside Router
function AppWrapper() {
  const location = useLocation();
  const showParticles = location.pathname === "/" || location.pathname === "/success";

  return (
    <>
      {showParticles && <ParticlesBG />}
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
         <Route path="/book/:id" element={<BookingPage />} /> 
        <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-confirmed" element={<PaymentConfirmed />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
