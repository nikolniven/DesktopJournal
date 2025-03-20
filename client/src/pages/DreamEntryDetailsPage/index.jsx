import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function DreamEntryDetailsPage(props) {
  const [specificDreamEntry, setSpecificDream] = useState('');
  const { dreamId } = useParams();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const fetchDreamEntry = async (params = { props }) => {
    const url = `${baseURL}/dream-audio/${dreamId}`;
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params,
      });
      console.log('Server response:', response.data);
      setSpecificDream(response.data);
    } catch (error) {
      console.error('Error fetching dream entries:', error);
    }
  };

  useEffect(() => {
    fetchDreamEntry();
  }, [dreamId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50 p-12">
      <div className="w-full max-w-xl bg-indigo-100 shadow-lg rounded-2xl p-8 text-center h-[600px] flex flex-col justify-between">
        <p className="text-gray-700 text-lg mb-6 overflow-y-auto flex-grow">
          {specificDreamEntry.transcript}
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <Link to={`/dream-entries/${dreamId}`}></Link>
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
