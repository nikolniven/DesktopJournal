import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-indigo-400 p-4 flex justify-between items-center">
      {/* Hamburger Button (for mobile) */}
      <button className="lg:hidden text-white focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Links */}
      <div className="flex space-x-4">
        <Link to="/">
          <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Home
          </button>
        </Link>

        {isLoggedIn && (
          <>
            <button
              onClick={logOutUser}
              className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Logout
            </button>

            <Link to="/profile">
              <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Profile
              </button>
            </Link>
            <Link to="/entries">
              <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                My entries
              </button>
            </Link>

            <span className="text-white">
              Hi {user && user.name}, welcome back
            </span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
