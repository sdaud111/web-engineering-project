import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaRobot, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AISearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [extractedParams, setExtractedParams] = useState(null);
  const navigate = useNavigate();

  // Fetch suggestions on mount
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ai/suggestions');
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      }
    };
    fetchSuggestions();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResults([]);
    setExtractedParams(null);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/search', { query });
      setResults(res.data.jobs || []);
      setExtractedParams(res.data.extractedParams);
      
      if (res.data.jobs && res.data.jobs.length === 0) {
        setError('No jobs found matching your criteria. Try rephrasing your query.');
      }
    } catch (err) {
      console.error('AI Search Error:', err);
      setError(err.response?.data?.message || 'AI search failed. Please check if the API key is configured.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <section className="bg-[#f5f7fa] min-h-screen px-4 md:px-8 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#1a2f4e] mb-2 flex items-center justify-center gap-3">
            <FaRobot className="text-[#d4a574]" />
            AI Job Search
          </h1>
          <p className="text-gray-600 text-lg">Ask in natural language and let AI find the perfect jobs for you</p>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-[#4a5f7f]" />
              <input
                type="text"
                placeholder='Try: "Find remote React jobs in Lahore" or "Show full-time positions with 100k+ salary"'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 outline-none focus:border-[#d4a574] text-sm md:text-base"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-[#1a2f4e] hover:bg-[#0f1e35] text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
            >
              <FaRobot />
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && !results.length && !isLoading && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <FaLightbulb className="text-[#d4a574]" />
                Try these:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 4).map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSuggestionClick(sug)}
                    className="text-xs px-3 py-1 bg-[#f5f7fa] text-[#1a2f4e] rounded-full hover:bg-[#d4a574] hover:text-white transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* AI Understanding */}
        {extractedParams && (
          <div className="bg-white rounded-lg shadow p-4 mb-6 border-l-4 border-[#d4a574]">
            <p className="text-sm text-gray-600 mb-2">🤖 AI understood:</p>
            <div className="flex flex-wrap gap-3 text-sm">
              {extractedParams.jobType && (
                <span className="px-3 py-1 bg-[#1a2f4e] text-white rounded-full">
                  {extractedParams.jobType}
                </span>
              )}
              {extractedParams.workArrangement && (
                <span className="px-3 py-1 bg-[#4a5f7f] text-white rounded-full">
                  {extractedParams.workArrangement}
                </span>
              )}
              {extractedParams.city && (
                <span className="px-3 py-1 bg-[#d4a574] text-white rounded-full">
                  📍 {extractedParams.city}
                </span>
              )}
              {extractedParams.minSalary && (
                <span className="px-3 py-1 bg-green-600 text-white rounded-full">
                  💰 ${extractedParams.minSalary}+
                </span>
              )}
              {extractedParams.keywords && extractedParams.keywords.length > 0 && (
                extractedParams.keywords.map((kw, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-200 text-[#1a2f4e] rounded-full">
                    {kw}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#1a2f4e] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">AI is analyzing your query and searching the database...</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <p className="text-gray-600 font-semibold">
              Found {results.length} job{results.length !== 1 ? 's' : ''} matching your criteria
            </p>
            {results.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#d4a574] hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1a2f4e] mb-1">{job.jobName}</h3>
                    <p className="text-gray-600">{job.companyName || 'Company Name'}</p>
                  </div>
                  {job.salary && (
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#d4a574]">
                        {job.currency || '$'} {job.salary}
                      </p>
                      <p className="text-xs text-gray-500">per year</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mb-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <FaBriefcase className="text-[#1a2f4e]" />
                    {job.jobType}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <FaMapMarkerAlt className="text-[#d4a574]" />
                    {job.workArrangement} • {job.city}
                  </span>
                </div>

                <p className="text-gray-700 line-clamp-2 mb-4">
                  {job.jobDescription}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/jobs/${job._id}`);
                  }}
                  className="inline-block bg-[#1a2f4e] text-white px-6 py-2 rounded-lg hover:bg-[#0f1e35] transition-colors"
                >
                  View Details & Apply
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty state after search */}
        {!isLoading && !error && results.length === 0 && query && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaRobot className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No results yet. Try searching above!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AISearchPage;
