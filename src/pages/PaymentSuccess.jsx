import { useLocation, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../style/success.css';
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
    <>
      <Header />

      <div className="success-container">
        <div className="success-card">
          <h2>✅ Payment Successful!</h2>

          <img
            src={getPosterSrc(movie?.poster_path)}
            alt={movie?.title}
            className="poster-success"
            style={{ width: '180px', borderRadius: '12px', marginBottom: '1rem' }}
          />

          <table className="success-table">
            <tbody>
              <tr>
                <th>🎬 Movie</th>
                <td>{movie?.title}</td>
              </tr>
              <tr>
                <th>🎟️ Tickets</th>
                <td>{ticketCount}</td>
              </tr>
              <tr>
                <th>🪑 Seats</th>
                <td>{seats.join(', ')}</td>
              </tr>
              <tr>
                <th>💰 Paid</th>
                <td>₹{totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <div className="button-group">
            <button onClick={generatePDF} className="pdf-download-button">
              ⬇️ Download PDF
            </button>

            <Link to="/" className="success-home-btn">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentSuccess;
