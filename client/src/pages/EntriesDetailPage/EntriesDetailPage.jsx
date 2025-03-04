import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function EntriesDetailPage(props) {
  const [specificEntry, setEntry] = useState('');
  const { entryId } = useParams();

  const fetchEntry = async (params = { props }) => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://localhost:5005/journal/${entryId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
          params,
        },
      );
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntry();
  }, [entryId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50 p-12">
      <div className="w-full max-w-xl bg-indigo-100 shadow-lg rounded-2xl p-8 text-center h-[600px] flex flex-col justify-between">
        <p className="text-gray-700 text-lg mb-6 overflow-y-auto flex-grow">
          {specificEntry.content}
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-2xl shadow-md px-4 py-2">
            Update
          </button>
          <button className="bg-indigo-300 hover:bg-indigo-400 text-white rounded-2xl shadow-md px-4 py-2">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntriesDetailPage;
