import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/homepage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [activeSection, setActiveSection] = useState('movies');
  const navigate = useNavigate();

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const customMovies = [
    {
      id: 201,
      title: 'Interstellar',
      release_date: '2014-11-07',
      vote_average: 8.6,
      poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    },
    {
      id: 202,
      title: 'Inception',
      release_date: '2010-07-16',
      vote_average: 8.8,
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    },
    {
      id: 203,
      title: 'The Dark Knight',
      release_date: '2008-07-18',
      vote_average: 9.0,
      poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      id: 204,
      title: 'Avatar',
      release_date: '2009-12-18',
      vote_average: 7.9,
      poster_path: '/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg',
    },
    {
      id: 205,
      title: 'Your Name',
      release_date: '2016-08-26',
      vote_average: 8.5,
      poster_path: '/xq1Ugd62d23K2knRUx6xxuALTZB.jpg',
    },
    {
      id: 206,
      title: 'Avengers: Endgame',
      release_date: '2019-04-26',
      vote_average: 8.4,
      poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    },
    {
      id: 207,
      title: 'Spider-Man: No Way Home',
      release_date: '2021-12-17',
      vote_average: 8.3,
      poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    },
    {
      id: 208,
      title: 'Parasite',
      release_date: '2019-05-30',
      vote_average: 8.6,
      poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    },
    {
      id: 209,
      title: 'Joker',
      release_date: '2019-10-04',
      vote_average: 8.5,
      poster_path: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    },
    {
      id: 210,
      title: 'Tenet',
      release_date: '2020-08-26',
      vote_average: 7.5,
      poster_path: '/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
    },
    {
      id: 211,
      title: '1917',
      release_date: '2019-12-25',
      vote_average: 8.2,
      poster_path: '/iZf0KyrE25z1sage4SYFLCCrMi9.jpg',
    },
    {
      id: 212,
      title: 'Ford v Ferrari',
      release_date: '2019-11-15',
      vote_average: 8.1,
      poster_path: '/6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg',
    },
    {
      id: 213,
      title: 'Dune',
      release_date: '2021-10-22',
      vote_average: 8.1,
      poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    },
    {
      id: 214,
      title: 'The Batman',
      release_date: '2022-03-04',
      vote_average: 8.0,
      poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    },
    {
      id: 215,
      title: 'RRR',
      release_date: '2022-03-25',
      vote_average: 8.2,
      poster_path: '/npW9nfPfA3tzC3V9MGiZP5tA4fZ.jpg',
    },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const apiMovies = response.data.results.slice(0, 5); // Optionally fetch top 5 from TMDB
        setMovies([...customMovies, ...apiMovies]);
      } catch (error) {
        console.error('TMDB fetch failed:', error);
        setMovies(customMovies);
      }
    };

    fetchMovies();
  }, [TMDB_API_KEY]);

  const handleBooking = (movie) => {
    navigate(`/book/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="home-container">
      <Header setActiveSection={setActiveSection} />
      <main className="content-area">
        <section className="movie-grid">
          <h2>Popular {activeSection}</h2>
          <div className="grid-container">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => handleBooking(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                  <div className="rating">⭐ {movie.vote_average}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
