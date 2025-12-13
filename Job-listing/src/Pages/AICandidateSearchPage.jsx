import React, { useState } from 'react';
import { FaSearch, FaUserTie, FaStar } from 'react-icons/fa';

const AICandidateSearchPage = () => {
  const [query, setQuery] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // Simulate an AI search for candidates
    setTimeout(() => {
      const mockCandidates = [
        { id: 1, name: 'Alice Johnson', role: 'Senior React Developer', match: 92, summary: 'Expert in React, 5+ years in fintech.', skills: ['React', 'TypeScript', 'Fintech'] },
        { id: 2, name: 'Bob Williams', role: 'Full-Stack Engineer', match: 85, summary: 'Strong Node.js and AWS experience.', skills: ['Node.js', 'AWS', 'MongoDB'] },
        { id: 3, name: 'Charlie Brown', role: 'Junior Developer', match: 78, summary: 'Recent graduate with a passion for clean code.', skills: ['JavaScript', 'HTML', 'CSS'] },
      ];
      setCandidates(mockCandidates);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="bg-[#f5f7fa] bg-opacity-50 min-h-screen">
      <div className="container m-auto max-w-4xl py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#1a2f4e] sm:text-5xl">
            AI Candidate Search
          </h1>
          <p className="mt-4 text-xl text-[#4a5f7f]">
            Find the perfect talent for your role using natural language.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Show me candidates with 5+ years of Node.js experience...'"
              className="w-full py-4 pl-12 pr-4 text-lg text-[#1a2f4e] bg-white border-2 border-[#d4a574] rounded-full focus:outline-none focus:ring-4 focus:ring-[#d4a574] transition"
            />
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-[#4a5f7f] text-xl" />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3 text-white bg-[#1a2f4e] rounded-full hover:bg-[#2A5A8C] transition-all duration-200 shadow-md hover:shadow-lg text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Find Talent'}
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

          {!isLoading && candidates.map(candidate => (
            <div key={candidate.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#4a5f7f]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-[#1a2f4e]">{candidate.name}</h3>
                  <p className="text-lg text-[#4a5f7f]">{candidate.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#1a2f4e]">{candidate.match}%</p>
                  <p className="text-sm text-[#4a5f7f]">Match Score</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#d4a574]">
                <p className="text-[#4a5f7f] flex items-center mb-3">
                  <FaUserTie className="mr-2 text-[#1a2f4e]" />
                  <span className="font-semibold mr-1">AI Summary:</span> {candidate.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(skill => (
                    <span key={skill} className="bg-[#d4a574] text-[#1a2f4e] px-3 py-1 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICandidateSearchPage;
