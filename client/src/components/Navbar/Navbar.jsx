import { Link } from 'react-router-dom';
import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import './index.css';
import { IoMoon } from 'react-icons/io5';
import { IoSunny } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

// function Navbar() {
//   // Subscribe to the AuthContext to gain access to
//   // the values from AuthContext.Provider's `value` prop

//   return (
//     <nav className="bg-indigo-400 p-4 flex justify-between items-center w-full">
//       {/* Hamburger Button (for mobile) */}
//       <button className="lg:hidden text-white focus:outline-none">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </button>

//       {/* Links */}
//       <div className="flex space-x-4 w-full">
//         <Link to="/">
//           <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//             Home
//           </button>
//         </Link>

//         {isLoggedIn && (
//           <>
//             <Link to="/profile">
//               <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 Profile
//               </button>
//             </Link>
//             <Link to="/entries">
//               <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap">
//                 My entries
//               </button>
//             </Link>

//             <span className="text-white flex justify-center items-center w-full">
//               Hi {user && user.name}, welcome back
//             </span>

//             <div>
//               <button
//                 onClick={logOutUser}
//                 className="bg-indigo-300 text-purple font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 Logout
//               </button>
//             </div>
//           </>
//         )}

//         {!isLoggedIn && (
//           <>
//             <Link to="/signup">
//               <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 Sign Up
//               </button>
//             </Link>
//             <Link to="/login">
//               <button className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 Login
//               </button>
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dark, setDark] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userLinks = [
    { to: '/', title: 'Home' },
    { to: '/profile', title: 'Profile' },
    { to: '/entries', title: 'My Entries' },
    { to: '/reflection', title: 'Reflection Log' },
    { to: '/dream-page', title: 'Dreams Log' },
    { to: '/dreams-entries', title: 'Dreams Entries' },
  ];

  const guestLinks = [
    { to: '/', title: 'Home' },
    { to: '/login', title: 'Login' },
    { to: '/signup', title: 'Sign Up' },
  ];

  const activeLinks = isLoggedIn ? userLinks : guestLinks;

  const renderLogout = () => {
    return (
      <li>
        <button
          onClick={logOutUser}
          className="block py-2 px-3 text-white bg-indigo-700 rounded-sm md:bg-transparent md:text-indigo-700 md:p-0 dark:text-white md:dark:text-indigo-500 w-full"
          aria-current="page"
        >
          Logout
        </button>
      </li>
    );
  };
  function darkModeHandler() {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
    // console.log('Dark mode toggled:', document.documentElement.classList);
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 pr-10 dark:text-white">
      <div
        className="nav-container max-w-screen-xl flex flex-wrap items-baseline justify-between mx-auto p-6 py-7 pr-5"
        style={{
          all: 'unset',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '1em',
        }}
      >
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {activeLinks.map((link, i) => (
              <li key={i + link.title}>
                <Link
                  to={link.to}
                  className="block py-2 px-3 text-white bg-indigo-700 rounded-sm md:bg-transparent md:text-indigo-700 md:p-0 dark:text-white md:dark:text-indigo-500"
                  aria-current="page"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            {isLoggedIn && renderLogout()}
          </ul>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse pt-4 pl-20">
          {user && !isMenuOpen && (
            <p
              className="self-center font-semibold whitespace-nowrap dark:text-white mr-4 text-indigo-300 md:text-right text-base"
              style={{ whiteSpace: 'initial' }}
            >
              Welcome back, {user.name} ✨
            </p>
          )}
          <button onClick={() => darkModeHandler()}>
            {
              dark && <IoSunny /> // render sunny when dark is true
            }
            {
              !dark && <IoMoon /> // render moon when dark is false
            }
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
