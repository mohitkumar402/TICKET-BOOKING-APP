import { useLocation, useNavigate } from 'react-router-dom';
import '../style/payment.css';
import upiImage from '../assets/upi.jpg';

const PaymentPage = () => {
  const { state } = useLocation();  // ✅ Receive movie and seat data
  const navigate = useNavigate();

  const handleConfirm = () => {
    // ✅ Forward movie & seats to payment-success
    navigate('/payment-success', { state });
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-box">
        <h2>Pay Now</h2>
        <p>Scan the QR code below using any UPI app</p>

        <img
          src={upiImage}
          alt="QR Code"
          className="qr-image"
        />

        <div className="payment-options">
          <button onClick={handleConfirm}>I've Paid</button>
        </div>

        <p className="note">Supported: UPI, PhonePe, GPay, Paytm</p>
      </div>
    </div>
  );
};

export default PaymentPage;
