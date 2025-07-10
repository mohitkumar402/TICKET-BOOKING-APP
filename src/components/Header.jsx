import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ setActiveSection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <header className="main-header">
      <div className="header-top">
        <div className="logo">QUICKETT</div>
        <nav className="nav-links">
          <button onClick={() => setActiveSection('movies')}>Movies</button>
          <button onClick={() => setActiveSection('shows')}>TV Shows</button>
          <button onClick={() => setActiveSection('cricket')}>Cricket</button>
        </nav>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search movies, shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>

        </form>
        <form className="auth-links">
          <button onClick={() => navigate('/AuthForm')}>Login</button>
            <button onClick={() => navigate('/AuthForm')}>Sign Up</button>
        </form>

      </div>
      <div className="header-bottom">
        <nav className="sub-nav">
          <button>Trending</button>
          <button>New Releases</button>
          <button>Genres</button>
          <button>Upcoming</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
