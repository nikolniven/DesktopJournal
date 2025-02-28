import { Link } from 'react-router-dom';
// import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';

function TabsCard() {
  // const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <div className="inline-flex rounded-md shadow-xs">
        <a
          href="#"
          aria-current="page"
          className="px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-indigo-500 dark:focus:text-white"
        >
          Profile
        </a>
        <a
          href="#"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-indigo-500 dark:focus:text-white"
        >
          Settings
        </a>
        <a
          href="#"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-indigo-500 dark:focus:text-white"
        >
          Messages
        </a>
      </div>
    </div>
  );
}

export default TabsCard;
