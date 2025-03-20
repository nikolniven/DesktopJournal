import React, { AuthContext } from '../../context/auth.context';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

function ReflectionForm({ selectedMoods }) {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    console.log('selectedMoods in ReflectionForm:', selectedMoods);
  }, [selectedMoods]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMoods.moodCategoryId || !selectedMoods.moodExtensiveId) {
      console.error('Please select moods before submitting');
      return;
    }

    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.post(
        `${baseURL}/journal`,
        {
          content: text,
          moodCategoryId: selectedMoods.moodCategoryId,
          moodExtensiveId: selectedMoods.moodExtensiveId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );

      if (response.status === 201) {
        console.log('Journal entry submitted successfully!');
        setText('');
      }
    } catch (error) {
      console.error('Error submitting journal entry:', error);
      console.log('Error details:', error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-[65vh]">
      <div className="w-full mb-4 border border-indigo-200 rounded-lg bg-indigo-100 dark:bg-indigo-700 dark:border-indigo-600">
        <div className="flex items-center justify-between px-3 py-2 border-b border-indigo-200 dark:border-indigo-600">
          <div className="flex flex-wrap items-center justify-center w-full divide-indigo-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-indigo-600">
            <div className="flex items-center justify-center w-full sm:pe-4">
              <h3 className="text-indigo-800 h-7 text-center">
                Unfold Your Thoughts 😊
              </h3>
              {/* {[
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
              ))} */}
            </div>
          </div>
        </div>
        <textarea
          className="w-full h-96 lg:h-[25rem] p-3 bg-indigo-50 border-none rounded-lg dark:bg-indigo-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Write something..."
          value={text}
          onChange={handleChange}
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
  );
}

export default ReflectionForm;
