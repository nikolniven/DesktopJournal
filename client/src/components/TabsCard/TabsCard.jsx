import { Link } from 'react-router-dom';
// import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useState } from 'react';

function TabsCard() {
  // const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="inline-flex rounded-md shadow-xs">
      <a
        href="#"
        aria-current="page"
        className="flex items-center justify-center px-6 text-sm font-medium text-lilac-700 bg-white border border-lilac-300 rounded-s-lg hover:bg-lilac-100 focus:z-10 focus:ring-2 focus:ring-lilac-700 focus:text-lilac-700 dark:bg-lilac-800 dark:border-lilac-600 dark:text-white dark:hover:text-white dark:hover:bg-lilac-700 dark:focus:ring-lilac-500 dark:focus:text-white h-[60px] w-[150px] whitespace-nowrap"
      >
        Somewhat up
      </a>
      <a
        href="#"
        className="flex items-center justify-center px-6 text-sm font-medium text-lilac-900 bg-white border-t border-b border-lilac-300 hover:bg-lilac-100 hover:text-lilac-700 focus:z-10 focus:ring-2 focus:ring-lilac-700 focus:text-lilac-700 dark:bg-lilac-800 dark:border-lilac-600 dark:text-white dark:hover:text-white dark:hover:bg-lilac-700 dark:focus:ring-lilac-500 dark:focus:text-white h-[60px] w-[150px] whitespace-nowrap"
      >
        Neutral
      </a>
      <a
        href="#"
        className="flex items-center justify-center px-6 text-sm font-medium text-lilac-900 bg-white border border-lilac-300 rounded-e-lg hover:bg-lilac-100 hover:text-lilac-700 focus:z-10 focus:ring-2 focus:ring-lilac-700 focus:text-lilac-700 dark:bg-lilac-800 dark:border-lilac-600 dark:text-white dark:hover:text-white dark:hover:bg-lilac-700 dark:focus:ring-lilac-500 dark:focus:text-white h-[60px] w-[150px] whitespace-nowrap"
      >
        Somewhat down
      </a>
    </div>
  );
}

export default TabsCard;
