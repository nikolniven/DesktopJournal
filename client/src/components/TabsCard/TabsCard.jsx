import { useState, useEffect } from 'react';
import axios from 'axios';

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

function TabsCard({ onMoodSelection }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [moodSelections, setMoodSelections] = useState({
    Positive: null,
    Neutral: null,
    Negative: null,
  });
  const [categoryIds, setCategoryIds] = useState({}); //moods stored +id stored here
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryIds = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(
          'http://localhost:5005/mood-categories',
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          },
        );

        setCategoryData(response.data);
        console.log('Category Data stored externally:', categoryData);

        const idMapping = {};
        response.data.forEach((category) => {
          idMapping[category.name] = category._id;
        });
        setCategoryIds(idMapping);
        console.log('Category IDs:', idMapping);
      } catch (error) {
        console.error('Error fetching category IDs:', error);
      }
    };

    fetchCategoryIds();
  }, []);

  const handleMoodSelection = (displayName, mood) => {
    // Convert display name to category name
    const categoryName = displayMapping[displayName];

    setMoodSelections({ ...moodSelections, [categoryName]: mood });

    // Debug logs
    console.log('=----- Mood Selection Data -----=');
    // console.log('Display Name:', displayName);
    // console.log('Category Name:', categoryName);
    // console.log('Category IDs available:', categoryIds);
    // console.log('Category ID for selection:', categoryIds[categoryName]);
    // console.log('Selected Mood:', mood);
    // console.log('Full category data:', categoryData);
    console.log('Current mood selections:', moodSelections);

    onMoodSelection({
      moodCategoryId: categoryIds[categoryName],
      moodExtensiveId: mood,
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
          <div key={index} className="w-full">
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
              <div className="grid grid-cols-3 gap-4 p-4 bg-lilac-100 border border-lilac-300 rounded-lg">
                {moodOptions[categoryName].map((mood, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMoodSelection(displayName, mood)}
                    className={`flex items-center justify-center h-16 text-lilac-700 
                      bg-white border border-lilac-300 rounded-lg 
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
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TabsCard;
