import { useState } from 'react';

function DateFilter({ onFilterChange }) {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  const handleFilter = () => {
    if (month) {
      // Create date range for selected month
      const startDate = new Date(year, parseInt(month) - 1, 1);
      const endDate = new Date(year, parseInt(month), 0);

      onFilterChange({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  };

  return (
    <div>
      <div className="flex basis-full gap-4 items-end mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-lilac-500 focus:ring-lilac-500"
          >
            <option value="">Select month</option>
            {Array.from({ length: 12 }, (_, i) => {
              const monthNum = i + 1;
              return (
                <option key={monthNum} value={monthNum}>
                  {new Date(2000, i).toLocaleString('default', {
                    month: 'long',
                  })}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-lilac-500 focus:ring-lilac-500"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const yearNum = new Date().getFullYear() - i;
              return (
                <option key={yearNum} value={yearNum}>
                  {yearNum}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={handleFilter}
          className="px-4 py-1 rounded-lg border-2 border-indigo-400 text-indigo-700 bg-indigo-100 hover:bg-indigo-200 hover:text-indigo-900 transition duration-300"
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default DateFilter;
