import { Link } from 'react-router-dom';

const Header = () => {
  // A placeholder for authentication state
  const isAuthenticated = false; // This would be replaced with actual auth state
  const isAdmin = false; // This would be replaced with actual admin state

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          PixelPulse
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/saved-posts">Saved Posts</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              <li>
                <button>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;