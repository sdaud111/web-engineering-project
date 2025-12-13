import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase, FaUserCheck, FaBell, FaLink } from "react-icons/fa";

const FeedPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id;

  useEffect(() => {
    const fetchFeed = async () => {
      if (!userId) return;
      try {
        // Fetch application status + connection updates
        const appsRes = await axios.get(`http://localhost:5000/api/applications/user/${userId}`);
        const connRes = await axios.get(`http://localhost:5000/api/connections/accepted/${userId}`);

        // applications endpoint returns { count, applications }
        const appList = appsRes.data?.applications || [];
        const appItems = appList.map((app) => ({
          type: "application",
          title: `Application to ${app.job?.jobName || "a job"}`,
          status: app.status || "pending",
          company: app.job?.companyName || "",
          timestamp: app.updatedAt || app.createdAt,
        }));

        // connections endpoint returns array
        const connList = connRes.data || [];
        const connItems = connList.map((c) => ({
          type: "connection",
          title: `Connected with ${c.requester?._id === userId ? c.recipient?.name : c.requester?.name}`,
          timestamp: c.updatedAt,
        }));

        const merged = [...appItems, ...connItems].sort(
          (a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
        );
        setItems(merged);
        setLoading(false);
      } catch (err) {
        console.error("Feed error:", err);
        setError("Unable to load feed right now.");
        setLoading(false);
      }
    };

    fetchFeed();
  }, [userId]);

  const renderIcon = (type) => {
    if (type === "application") return <FaBriefcase className="text-[#1a2f4e]" />;
    if (type === "connection") return <FaUserCheck className="text-[#d4a574]" />;
    return <FaBell className="text-[#1a2f4e]" />;
  };

  return (
    <section className="bg-[#f5f7fa] min-h-screen px-4 md:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-[#1a2f4e]">My Feed</h1>
          <p className="text-gray-600">Latest updates on your applications and connections.</p>
        </header>

        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">Loading feed...</div>
        ) : error ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            No updates yet. Apply to jobs, connect with employers, and check back here.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-4 flex items-start gap-4 border border-gray-100"
              >
                <div className="mt-1">{renderIcon(item.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-[#1a2f4e]">{item.title}</h3>
                    {item.type === "application" && item.status && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#1a2f4e] text-white capitalize">
                        {item.status}
                      </span>
                    )}
                  </div>
                  {item.company && (
                    <p className="text-sm text-gray-600 mt-1">{item.company}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {item.timestamp ? new Date(item.timestamp).toLocaleString() : "Just now"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow p-4 flex items-center gap-3 text-[#1a2f4e] border border-dashed border-gray-200">
          <FaLink />
          <div>
            <p className="font-semibold">Tip: Build connections</p>
            <p className="text-sm text-gray-600">Send connection requests to employers to unlock messaging and get faster responses.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedPage;
