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
    <div>
      <p className="text-gray-700 mb-4 line-clamp-3">{specificEntry.content}</p>
    </div>
  );
}

export default EntriesDetailPage;
