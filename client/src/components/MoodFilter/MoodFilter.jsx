import React, { useState, useContext } from 'react';
import { MoodContext } from '../../context/mood.context';

function MoodFilter({ handleMoodFilter }) {
  const context = useContext(MoodContext);
  const [selectedMood, setSelectedMood] = useState('');

  // Safely access context values with optional chaining
  const categoryIds = context?.categoryIds;
  const isLoading = context?.isLoading;

  const handleMoodChange = (value) => {
    if (value === '') {
      handleMoodFilter({ mood: '', categoryId: null });
      setSelectedMood(value);
      return;
    }
    const categoryId = categoryIds?.[value];
    handleMoodFilter({ mood: value, categoryId });
    setSelectedMood(value);
  };

  if (!context || isLoading) {
    return <div>Loading mood filters...</div>;
  }

  return (
    <div className="px-5 py-5 flex flex-col gap-4">
      <label className="text-sm font-medium text-gray-700">
        Filter by Mood
      </label>
      <select
        value={selectedMood}
        onChange={(e) => handleMoodChange(e.target.value)}
        className="rounded-md border-lilac-300 shadow-sm focus:border-lilac-500 focus:ring-lilac-500 p-2  dark:bg-indigo-700"
      >
        <option value="">All Moods</option>
        <option value="Positive">Somewhat Up</option>
        <option value="Neutral">Neutral</option>
        <option value="Negative">Somewhat Down</option>
      </select>
    </div>
  );
}

export default MoodFilter;
