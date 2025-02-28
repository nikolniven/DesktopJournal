import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TabsCard from '../../components/TabsCard';

function ReflectionPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return navigate('/login');
  }

  const tabsContent = [
    {
      label: 'HTML',
      value: 'html',
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: 'React',
      value: 'react',
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: 'Vue',
      value: 'vue',
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <div>
      {/* <div>
        <div class="inline-flex rounded-md shadow-xs" role="group">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Positive
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Neutral
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Negative
          </button>
        </div>
      </div> */}
      <TabsCard data={tabsContent} />
      <form className="mt-[8vh] w-[55vh]">
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
            className="w-full h-60 p-3 bg-indigo-50 border-none rounded-lg dark:bg-indigo-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
    </div>
  );
}

export default ReflectionPage;
