import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DateFilter from '../../components/DateFilter/DateFilter';
import MoodFilter from '../../components/MoodFilter/MoodFilter';

function EntriesPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: null,
    moodCategory: '',
  });

  const fetchEntries = async (params = {}) => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5005/journal', {
        headers: { Authorization: `Bearer ${storedToken}` },
        params,
      });
      setEntries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = { ...filters.dateRange, ...filters.moodCategory };
    fetchEntries(params);
  }, [filters]); // Re-fetch when filters change

  const handleDateFilter = (dateRange) => {
    setFilters((prev) => ({
      ...prev,
      dateRange,
    }));
  };

  const handleMoodFilter = (moodCategory) => {
    setFilters((prev) => ({
      ...prev,
      moodCategory,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Journal Entries
      </h1>
      <DateFilter onFilterChange={handleDateFilter} />
      <MoodFilter handleMoodFilter={handleMoodFilter} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="bg-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-lilac-100 text-lilac-700 rounded-full text-sm">
                  {entry.moodCategoryId.name}
                </span>
                <span className="px-3 py-1 bg-lilac-50 text-lilac-600 rounded-full text-sm">
                  {entry.moodExtensiveId.mood}
                </span>
              </div>
              <time className="text-sm text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </time>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">{entry.content}</p>

            <Link to={`/entries/${entry._id}`}>
              <button
                className="text-lilac-600 hover:text-lilac-700 text-sm font-medium"
                onClick={() => {
                  /* Add view detail handler */
                }}
              >
                Read more →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntriesPage;
