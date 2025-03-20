import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EntryEditPage() {
  const [specificEntry, setEntry] = useState('');
  const { entryId } = useParams();

  const navigate = useNavigate();

  const fetchEntry = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://localhost:5005/journal/${entryId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        },
      );
      setEntry(response.data.content);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntry();
  }, [entryId]);
  const updateEntry = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      await axios.put(
        `http://localhost:5005/journal/${entryId}`,
        { content: specificEntry },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        },
      );
      navigate(-1);
    } catch (error) {
      console.error('Error submitting update journal entry:', error);
      console.log('Error details:', error.response?.data);
    }
  };

  const deleteEntry = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5005/journal/${entryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      navigate(-2);
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      console.log('Error details:', error.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50 p-12">
      <div className="w-full max-w-xl bg-indigo-100 shadow-lg rounded-2xl p-8 text-center h-[600px] flex flex-col justify-between">
        <textarea
          value={specificEntry}
          onChange={(e) => setEntry(e.target.value)}
          className="text-gray-700 text-lg mb-6 overflow-y-auto flex-grow"
        />
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={updateEntry}
            className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-2xl shadow-md px-4 py-2"
          >
            Update
          </button>
          <button
            onClick={deleteEntry}
            className="bg-indigo-300 hover:bg-indigo-400 text-white rounded-2xl shadow-md px-4 py-2"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-300 hover:bg-indigo-400 text-white rounded-2xl shadow-md px-4 py-2"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
