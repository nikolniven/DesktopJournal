import { useState, useEffect } from 'react';
import axios from 'axios';
import DateFilter from '../../components/DateFilter/DateFilter';
import MoodFilter from '../../components/MoodFilter/MoodFilter';
import EntryCard from '../../components/EntryCard';

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
          <EntryCard key={entry._id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default EntriesPage;
