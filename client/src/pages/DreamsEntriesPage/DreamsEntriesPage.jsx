import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import DateFilter from '../../components/DateFilter/DateFilter';
import EntryCard from '../../components/EntryCard';

function DreamsEntriesPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: null,
  });

  const fetchEntries = async (params = {}) => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5005/dream-audio', {
        headers: { Authorization: `Bearer ${storedToken}` },
        params,
      });
      setEntries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dream entries:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = { ...filters.dateRange };
    fetchEntries(params);
  }, [filters]);

  const handleDateFilter = (dateRange) => {
    console.log(dateRange);
    setFilters((prev) => ({
      ...prev,
      dateRange,
    }));
  };

  if (!isLoggedIn) {
    return navigate('/login');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // console.log(filters);
  return (
    <div className="flex flex-col mt-[8vh] px-4 lg:px-10 space-y-6 w-full max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">
        My Dream Journal Entries
      </h1>

      <DateFilter onFilterChange={handleDateFilter} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <EntryCard key={entry._id} entry={entry} isDreamPage />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* {entries.map((entry) => (
          <div
            key={entry._id}
            className="bg-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <time className="text-sm text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </time>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">
              {entry.transcript}
            </p>

            {entry.audio && (
              <audio controls className="w-full mt-4">
                <source src={entry.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))} */}
      </div>

      {entries.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No dream entries found. Start recording your dreams!
        </div>
      )}
    </div>
  );
}

export default DreamsEntriesPage;
