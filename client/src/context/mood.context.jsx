import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MoodContext = createContext({
  categoryIds: {},
  extensiveMoodIds: {},
  isLoading: true,
});

export function MoodProviderWrapper({ children }) {
  const [categoryIds, setCategoryIds] = useState({});
  const [extensiveMoodIds, setExtensiveMoodIds] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        setIsLoading(true);
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
          throw new Error('No auth token found');
        }

        const [categoriesRes, moodsRes] = await Promise.all([
          axios.get('http://localhost:5005/mood-categories', {
            headers: { Authorization: `Bearer ${storedToken}` },
          }),
          axios.get('http://localhost:5005/moods-extensive', {
            headers: { Authorization: `Bearer ${storedToken}` },
          }),
        ]);

        const categoryMapping = {};
        categoriesRes.data.forEach((category) => {
          categoryMapping[category.name] = category._id;
        });

        const moodMapping = {};
        moodsRes.data.forEach((mood) => {
          moodMapping[mood.mood] = mood._id;
        });

        setCategoryIds(categoryMapping);
        setExtensiveMoodIds(moodMapping);
      } catch (error) {
        console.error('Error fetching mood data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoodData();
  }, []);

  return (
    <MoodContext.Provider
      value={{
        categoryIds,
        extensiveMoodIds,
        isLoading,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
}
