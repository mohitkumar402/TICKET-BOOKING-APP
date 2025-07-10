import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import SuccessPage from './pages/SuccessPage';
import ParticlesBG from './components/ParticlesBG';
import HomePage from './pages/homepage';
import BookingPage from './pages/BookingPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPage from './pages/PaymentPage';  // ✅ Rename `Payment` to `PaymentPage` for clarity
import PaymentConfirmed from './pages/PaymentConfirmed';

function AppWrapper() {
  const location = useLocation();
  const showParticles = location.pathname === "/" || location.pathname === "/success";

  return (
    <>
      {showParticles && <ParticlesBG />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
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
