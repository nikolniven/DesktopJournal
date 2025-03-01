import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TabsCard from '../../components/TabsCard/TabsCard';

function ReflectionPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return navigate('/login');
  }

  return (
    <div className="flex flex-col lg:flex-row mt-[8vh] px-4 lg:px-10 space-y-6 lg:space-y-0 lg:space-x-10 w-full max-w-screen-lg mx-auto">
      <form className="w-full lg:w-[55vh]">
        <div className="w-full mb-4 border border-indigo-200 rounded-lg bg-indigo-100 dark:bg-indigo-700 dark:border-indigo-600">
          <div className="flex items-center justify-between px-3 py-2 border-b border-indigo-200 dark:border-indigo-600">
            <div className="flex flex-wrap items-center divide-indigo-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-indigo-600">
              <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                {[
                  { icon: '📎', tooltip: 'Attach file' },
                  { icon: '📍', tooltip: 'Embed map' },
                  { icon: '🖼️', tooltip: 'Upload image' },
                  { icon: '</>', tooltip: 'Format code' },
                  { icon: '😊', tooltip: 'Add emoji' },
                ].map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="p-2 text-indigo-600 rounded-sm cursor-pointer hover:text-indigo-700 hover:bg-indigo-200 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-600"
                  >
                    {item.icon}
                    <span className="sr-only">{item.tooltip}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <textarea
            className="w-full h-60 lg:h-80 p-3 bg-indigo-50 border-none rounded-lg dark:bg-indigo-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Write something..."
          ></textarea>
          <div className="flex justify-end p-2">
            <button
              type="submit"
              className="bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="flex flex-col items-center space-y-6">
        <TabsCard />
      </div>
    </div>
  );
}

export default ReflectionPage;
