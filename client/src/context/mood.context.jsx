import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MoodContext = createContext();

export function MoodProviderWrapper({ children }) {
  const [categoryIds, setCategoryIds] = useState({});
  const [extensiveMoodIds, setExtensiveMoodIds] = useState({}); // Fixed naming

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

  useEffect(() => {
    const fetchExtensiveMoodIds = async () => {
      // Fixed function name
      try {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(
          'http://localhost:5005/moods-extensive',
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          },
        );

        const moodMapping = {};
        response.data.forEach((mood) => {
          moodMapping[mood.mood] = mood._id;
        });
        setExtensiveMoodIds(moodMapping); // Fixed setter name

        console.log('Extensive Moods mapping:', moodMapping);
        console.log('Raw response data:', response.data);
      } catch (error) {
        console.error('Error fetching extensive moods:', error);
      }
    };

    fetchExtensiveMoodIds();
  }, []);

  return (
    <MoodContext.Provider value={{ categoryIds, extensiveMoodIds }}>
      {' '}
      {/* Fixed prop name */}
      {children} {/* Destructured from props */}
    </MoodContext.Provider>
  );
}
