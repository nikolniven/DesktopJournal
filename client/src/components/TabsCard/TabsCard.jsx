import { Link } from 'react-router-dom';
// import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useState } from 'react';

const moodOptions = {
  positive: [
    'Energized',
    'Content',
    'Excited',
    'Confident',
    'Grateful',
    'Relaxed',
  ],
  neutral: ['Indifferent', 'Reflective', 'Uncertain', 'Drained'],
  negative: [
    'Anxious',
    'Overwhelmed',
    'Frustrated',
    'Sad',
    'Lonely',
    'Unmotivated',
  ],
};

function TabsCard() {
  const [dropdown, setDropdown] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState({
    somewhatUp: null,
    neutral: null,
    somewhatDown: null,
  });

  const toggleDropdown = (type) => {
    setDropdown(dropdown === type ? null : type);
  };

  const selectMood = (type, mood) => {
    setSelectedMoods({ ...selectedMoods, [type]: mood });
    setTimeout(() => setDropdown(null), 800);
  };

  return (
    <div className="inline-flex flex-col items-center rounded-md shadow-xs w-full">
      {Object.keys(moodOptions).map((type, index) => (
        <div key={index} className="w-full">
          <button
            onClick={() => toggleDropdown(type)}
            className={`w-full px-4 py-4 text-sm font-medium text-lilac-700 bg-lilac-100 border border-lilac-300 rounded-lg hover:bg-lilac-200 focus:z-10 focus:ring-2 focus:ring-lilac-700 transition-colors duration-300 ${
              selectedMoods[type] ? 'bg-lilac-300' : ''
            }`}
          >
            {type === 'positive'
              ? 'Somewhat up'
              : type === 'neutral'
              ? 'Neutral'
              : 'Somewhat down'}
          </button>
          {dropdown === type && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-lilac-100 border border-lilac-300 rounded-lg transition-opacity duration-300">
              {moodOptions[type].map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => selectMood(type, mood)}
                  className={`flex items-center justify-center h-16 text-lilac-700 bg-white border border-lilac-300 rounded-lg 
                    ${
                      selectedMoods[type] === mood
                        ? 'bg-lilac-300 text-purple-300'
                        : 'hover:bg-lilac-50'
                    } 
                    transition-all duration-300 ease-in-out shadow-sm
                    hover:shadow-md hover:border-lilac-400`}
                >
                  {mood}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TabsCard;
