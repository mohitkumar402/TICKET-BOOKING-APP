import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import '../style/booking.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BookingPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = state?.movie;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  const [message, setMessage] = useState('');

  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;
  const seatPrice = 150;

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      setMessage('');
    } else {
      if (selectedSeats.length >= ticketCount) {
        setMessage(`You can only select ${ticketCount} seat(s).`);
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
      setMessage('');
    }
  };

  const handlePayment = () => {
    if (selectedSeats.length !== ticketCount) {
      alert(`Please select ${ticketCount} seat(s) to continue.`);
      return;
    }

    navigate('/payment-success', {
      state: {
        movie,
        seats: selectedSeats,
      },
    });
  };

  if (!movie) return <h2 className="error-msg">Movie not found.</h2>;

  return (
    <>
      <Header />

      <div className="booking-wrapper">
        <div className="booking-container">
          <h1>🎟 Book Tickets for <span className="movie-name">{movie.title}</span></h1>

          <div className="movie-details">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="poster"
            />
            <div className="info">
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
              <p><strong>Price per seat:</strong> ₹{seatPrice}</p>

              <label>
                <strong>Number of Tickets:</strong>
                <select
                  value={ticketCount}
                  onChange={(e) => {
                    setTicketCount(Number(e.target.value));
                    setSelectedSeats([]);
                  }}
                >
                  <option value={0}>Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {ticketCount > 0 && (
            <>
              <h3 className="seat-title">Select {ticketCount} Seat(s)</h3>
              {message && <p className="error-msg">{message}</p>}

              <div className="hall">
                {seatRows.map((row) => (
                  <div key={row} className="seat-row">
                    {[...Array(seatsPerRow)].map((_, i) => {
                      const seat = `${row}${i + 1}`;
                      return (
                        <button
                          key={seat}
                          className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                          onClick={() => toggleSeat(seat)}
                        >
                          {seat}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="summary">
                <p><strong>Selected Seats:</strong> {selectedSeats.join(', ') || 'None'}</p>
                <p><strong>Total:</strong> ₹{selectedSeats.length * seatPrice}</p>
                <button className="pay-button" onClick={handlePayment}>
                  Proceed to Pay
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookingPage;
