import { useContext } from 'react';
import { MoodContext } from '../../context/mood.context';

function MoodFilter({ onFilterChange }) {
  const { categoryIds } = useContext(MoodContext);

  return (
    <div className="flex gap-4 items-center mb-6">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="rounded-md border-lilac-300 shadow-sm focus:border-lilac-500 focus:ring-lilac-500"
        defaultValue=""
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
