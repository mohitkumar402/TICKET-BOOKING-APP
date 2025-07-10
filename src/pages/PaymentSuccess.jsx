import { useLocation, Link } from 'react-router-dom';
import '../style/success.css';

const PaymentSuccess = () => {
  const { state } = useLocation();
  const movie = state?.movie;
  const seats = state?.seats || [];

  const ticketCount = seats.length;
  const seatPrice = 150;
  const totalAmount = ticketCount * seatPrice;

  // Determine poster path: local asset or TMDB
  const getPosterSrc = (path) => {
    return path?.startsWith('/assets/')
      ? path // local image in public/assets/
      : `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div className="payment-success-page">
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

        <p className="enjoy-text">🎬 Enjoy your show!</p>

        <Link to="/" className="home-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
