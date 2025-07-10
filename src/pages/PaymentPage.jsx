import { useNavigate } from 'react-router-dom';
import '../style/payment.css';

const PaymentPage = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Simulate user clicking after scanning
    navigate('/payment-confirmed');
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-box">
        <h2>Pay Now</h2>
        <p>Scan the QR code below using any UPI app</p>

        <img
          src="./assets/upi-qr.jpg"
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
