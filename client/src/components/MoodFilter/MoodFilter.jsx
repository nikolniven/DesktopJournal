import React, { useState, useContext } from 'react';
import { MoodContext } from '../../context/mood.context';

function MoodFilter({ handleMoodFilter }) {
  const context = useContext(MoodContext);
  const [selectedMood, setSelectedMood] = useState('');

  // Safely access context values with optional chaining
  const categoryIds = context?.categoryIds;
  const isLoading = context?.isLoading;

  const handleMoodChange = (value) => {
    setSelectedMood(value);
    if (value === '') {
      handleMoodFilter({ mood: '', categoryId: null });
      return;
    }
    const categoryId = categoryIds?.[value];
    handleMoodFilter({ mood: value, categoryId });
  };

  if (!context || isLoading) {
    return <div>Loading mood filters...</div>;
  }

  return (
    <div className="px-4 py-5 flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Filter by Mood
      </label>
      <select
        value={selectedMood}
        onChange={(e) => handleMoodChange(e.target.value)}
        className="rounded-md border-lilac-300 shadow-sm focus:border-lilac-500 focus:ring-lilac-500 p-2"
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
