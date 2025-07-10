import { useLocation, Link } from 'react-router-dom';
import '../style/success.css';
import jsPDF from 'jspdf';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
  const { state } = useLocation();
  const movie = state?.movie;
  const seats = state?.seats || [];

  const ticketCount = seats.length;
  const seatPrice = 150;
  const totalAmount = ticketCount * seatPrice;

  const getPosterSrc = (path) => {
    return path?.startsWith('/assets/')
      ? path
      : `https://image.tmdb.org/t/p/w500${path}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('🎟️ Ticket Confirmation', 20, 20);
    doc.setFontSize(12);
    doc.text(`Movie: ${movie?.title}`, 20, 35);
    doc.text(`Tickets Booked: ${ticketCount}`, 20, 45);
    doc.text(`Seat Numbers: ${seats.join(', ')}`, 20, 55);
    doc.text(`Total Paid: ₹${totalAmount}`, 20, 65);
    doc.text('✅ Payment Successful', 20, 75);
    doc.text('Enjoy your show! 🍿', 20, 90);

    doc.save(`${movie?.title.replace(/\s+/g, '_')}_Tickets.pdf`);
  };

  if (!movie) return <h2 className="error-msg">Movie not found.</h2>;

  return (
    <div className="payment-success-page">
      <Header />

      <div className="success-card">
        <h1>✅ Payment Successful!</h1>

        <div className="movie-info">
          <h2>{movie?.title}</h2>
          <img
            src={getPosterSrc(movie?.poster_path)}
            alt={movie?.title}
            className="poster-success"
          />
        </div>

        <div className="booking-summary">
          <p><strong>🎟️ Tickets Booked:</strong> {ticketCount}</p>
          <p><strong>🪑 Seat Numbers:</strong> {seats.join(', ')}</p>
          <p><strong>💰 Total Paid:</strong> ₹{totalAmount}</p>
        </div>

        <button onClick={generatePDF} className="pdf-download-button">
          ⬇️ Download Ticket PDF
        </button>

        <p className="enjoy-text">🎬 Enjoy your show!</p>

        <Link to="/" className="home-link">← Back to Home</Link>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
