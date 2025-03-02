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

function TabsCard({ onMoodSelection }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [moodSelections, setMoodSelections] = useState({
    positive: null,
    neutral: null,
    negative: null,
  });

  const handleDropdownToggle = (category) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  const handleMoodSelection = (category, mood) => {
    setMoodSelections({ ...moodSelections, [category]: mood });
    // Call parent component's handler with proper IDs
    onMoodSelection({
      moodCategoryId: category,
      moodExtensiveId: mood,
    });
    setTimeout(() => setActiveDropdown(null), 800);
  };

  return (
    <div className="inline-flex flex-col items-center rounded-md shadow-xs w-full">
      {Object.keys(moodOptions).map((category, index) => (
        <div key={index} className="w-full">
          <button
            onClick={() => handleDropdownToggle(category)}
            className={`w-full px-4 py-4 text-sm font-medium text-lilac-700 bg-lilac-100 border border-lilac-300 rounded-lg hover:bg-lilac-200 focus:z-10 focus:ring-2 focus:ring-lilac-700 transition-colors duration-300 ${
              moodSelections[category] ? 'bg-lilac-300' : ''
            }`}
          >
            {category === 'positive'
              ? 'Somewhat up'
              : category === 'neutral'
              ? 'Neutral'
              : 'Somewhat down'}
          </button>
          {activeDropdown === category && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-lilac-100 border border-lilac-300 rounded-lg transition-opacity duration-300">
              {moodOptions[category].map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMoodSelection(category, mood)}
                  className={`flex items-center justify-center h-16 text-lilac-700 bg-white border border-lilac-300 rounded-lg 
                    ${
                      moodSelections[category] === mood
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

TabsCard.defaultProps = {
  onMoodSelection: () => {}, // Provides a default empty function if prop isn't passed
};

export default TabsCard;
