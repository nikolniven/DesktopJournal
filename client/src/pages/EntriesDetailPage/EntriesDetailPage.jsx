import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EntriesDetailPage(props) {
  const [specificEntry, setEntry] = useState('');
  const [updatedEntry, setUpdatedEntry] = useState('');
  const { entryId } = useParams();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER_URL;

  const fetchEntry = async (params = { props }) => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.get(`${baseURL}/journal/${entryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params,
      });
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntry();
  }, [entryId]);

  // const modEntry = async (params = { props }) => {
  //   try {
  //     const storedToken = localStorage.getItem('authToken');
  //     const response = await axios.put(
  //       `http://localhost:5005/journal/${entryId}`,
  //       { content: updatedEntry },
  //       {
  //         headers: { Authorization: `Bearer ${storedToken}` },
  //         params,
  //       },
  //     );
  //     if (response.status === 201) {
  //       console.log('Journal entry updated successfully!');
  //       setUpdatedEntry(updatedEntry);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting update journal entry:', error);
  //     console.log('Error details:', error.response?.data);
  //   }
  // };

  // useEffect(() => {
  //   modEntry();
  // }, [updatedEntry]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50 p-12">
      <div className="w-full max-w-xl bg-indigo-100 shadow-lg rounded-2xl p-8 text-center h-[600px] flex flex-col justify-between">
        <p className="text-gray-700 text-lg mb-6 overflow-y-auto flex-grow">
          {specificEntry.content}
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <Link to={`/entries/${entryId}/edit`}>
            <button
              // onClick={modEntry}
              className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-2xl shadow-md px-4 py-2"
            >
              Edit
            </button>
          </Link>
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

export default EntriesDetailPage;
