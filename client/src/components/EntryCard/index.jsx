import React from 'react';
import { Link } from 'react-router-dom';

export default function EntryCard({ entry, isDreamPage }) {
  return (
    <div className="bg-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        {!isDreamPage && (
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-lilac-100 text-lilac-700 rounded-full text-sm">
              {entry.moodCategoryId.name}
            </span>
            <span className="px-3 py-1 bg-lilac-50 text-lilac-600 rounded-full text-sm">
              {entry.moodExtensiveId.mood}
            </span>
          </div>
        )}
        <time className="text-sm text-gray-500">
          {new Date(entry.createdAt).toLocaleDateString()}
        </time>
        {isDreamPage && (
          <p className="text-gray-700 mb-4 line-clamp-3">{entry.transcript}</p>
        )}
      </div>

      {entry.audio && (
        <audio controls className="w-full mt-4">
          <source src={entry.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {entry.content && (
        <p className="text-gray-700 mb-4 line-clamp-3 ">{entry.content}</p>
      )}

      <Link to={`/${isDreamPage ? 'dreams-entries' : 'entries'}/${entry._id}`}>
        <button className="text-lilac-600 hover:text-lilac-700 text-sm font-medium">
          Read more →
        </button>
      </Link>
    </div>
  );
}
