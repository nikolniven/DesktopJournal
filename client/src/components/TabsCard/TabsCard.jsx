import { useState, useContext } from 'react';
import { MoodContext } from '../../context/mood.context';

const moodOptions = {
  Positive: [
    'Energized',
    'Content',
    'Excited',
    'Confident',
    'Grateful',
    'Relaxed',
  ],
  Neutral: ['Indifferent', 'Reflective', 'Uncertain', 'Drained'],
  Negative: [
    'Anxious',
    'Overwhelmed',
    'Frustrated',
    'Sad',
    'Lonely',
    'Unmotivated',
  ],
};
const displayMapping = {
  'Somewhat up': 'Positive',
  Neutral: 'Neutral',
  'Somewhat down': 'Negative',
};

function TabsCard({ onMoodSelection, categories }) {
  const { categoryIds, extensiveMoodIds } = useContext(MoodContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [moodSelections, setMoodSelections] = useState({
    Positive: null,
    Neutral: null,
    Negative: null,
  });

  // console.log(categoryIds, extensiveMoodIds);
  const handleMoodSelection = (displayName, mood) => {
    // console.log(displayName, mood);
    // Convert display name to category name
    const categoryName = displayMapping[displayName];
    setMoodSelections({ ...moodSelections, [categoryName]: mood });

    // Debug logs
    // console.log('=----- Mood Selection Data -----=');
    // console.log('Display Name:', displayName);
    // console.log('Category Name:', categoryName);
    // console.log('Category ID:', categoryIds[categoryName]);
    // console.log('Mood:', mood);
    // console.log('Mood ID:', extensiveMoodIds[mood]);

    onMoodSelection({
      moodCategoryId: categoryIds[categoryName],
      moodExtensiveId: extensiveMoodIds[mood],
    });
    setTimeout(() => setActiveDropdown(null), 800);
  };

  const handleDropdownToggle = (displayName) => {
    setActiveDropdown(activeDropdown === displayName ? null : displayName);
  };

  return (
    <div className="inline-flex flex-col items-center rounded-md shadow-xs w-full">
      {['Somewhat up', 'Neutral', 'Somewhat down'].map((displayName, index) => {
        const categoryName = displayMapping[displayName];
        return (
          <div key={index} className="w-full flex flex-row flex-wrap">
            <button
              onClick={() => handleDropdownToggle(displayName)}
              className={`w-full px-4 py-4 text-sm font-medium text-lilac-700 bg-lilac-100 
                border border-lilac-300 rounded-lg hover:bg-lilac-200 focus:z-10 
                focus:ring-2 focus:ring-lilac-700 transition-colors duration-300 
                ${moodSelections[categoryName] ? 'bg-lilac-300' : ''}`}
            >
              {displayName}
            </button>
            {activeDropdown === displayName && (
              <div className="max-w-[600px] mx-auto">
                <div className="grid grid-cols-3 gap-4 m-8 bg-lilac-500 border border-lilac-300 rounded-lg">
                  {moodOptions[categoryName].map((mood, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleMoodSelection(displayName, mood)}
                      className={`w-full flex items-center justify-center h-16 px-10 py-8 text-lilac-700 
                      bg-[rgb(200,172,214)] border border-lilac-900 rounded-lg
                      ${
                        moodSelections[categoryName] === mood
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TabsCard;
