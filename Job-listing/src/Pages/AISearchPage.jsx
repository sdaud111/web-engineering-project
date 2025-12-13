import React, { useState } from 'react';
import { FaSearch, FaUserAstronaut } from 'react-icons/fa';

const AISearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // Simulate an AI search with a delay
    setTimeout(() => {
      // This is where you would integrate with your LangChain RAG backend
      const mockResults = [
        { id: 1, title: 'AI-Matched Frontend Developer', company: 'Innovate Inc.', match: 95, summary: 'Excellent match based on your React and Tailwind CSS skills.' },
        { id: 2, title: 'Remote UI/UX Designer', company: 'Creative Solutions', match: 88, summary: 'Strong alignment with your design portfolio and remote work preference.' },
      ];
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="bg-[#f5f7fa] bg-opacity-50 min-h-screen">
      <div className="container m-auto max-w-4xl py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#1a2f4e] sm:text-5xl">
            AI-Powered Job Search
          </h1>
          <p className="mt-4 text-xl text-[#4a5f7f]">
            Describe your ideal job, and let our AI find it for you.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Find remote software roles that use React...'"
              className="w-full py-4 pl-12 pr-4 text-lg text-[#1a2f4e] bg-white border-2 border-[#d4a574] rounded-full focus:outline-none focus:ring-4 focus:ring-[#d4a574] transition"
            />
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-[#4a5f7f] text-xl" />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3 text-white bg-[#1a2f4e] rounded-full hover:bg-[#2A5A8C] transition-all duration-200 shadow-md hover:shadow-lg text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Ask AI'}
          </button>
        </form>

        {/* Results Section */}
        <div className="space-y-6">
          {isLoading && (
            <div className="text-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-[#1a2f4e]" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!isLoading && results.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#4a5f7f]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-[#1a2f4e]">{job.title}</h3>
                  <p className="text-lg text-[#4a5f7f]">{job.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#1a2f4e]">{job.match}%</p>
                  <p className="text-sm text-[#4a5f7f]">Match</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#d4a574]">
                <p className="text-[#4a5f7f] flex items-center">
                  <FaUserAstronaut className="mr-2 text-[#1a2f4e]" />
                  <span className="font-semibold mr-1">AI Note:</span> {job.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISearchPage;
