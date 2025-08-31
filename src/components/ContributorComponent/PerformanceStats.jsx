import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const PerformanceStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const userId = Cookies.get("id");
      const token = Cookies.get("token");
      
      if (!userId) {
        setError('User ID is required');
        setLoading(false);
        return;
      }

      if (!token) {
        setError('Authentication token is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Get base URL from environment or use localhost as fallback
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/collaborators/contributer-dashboard/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API response to stats format
        const transformedStats = [
          { 
            label: "Gigs Completed", 
            value: data.completed_gigs  || 0 
          },
          { 
            label: "Draft Gigs", 
            value: data.draft_gigs ? data.draft_gigs : '0'
          },
          { 
            label: "Total Gigs", 
            value: data.total_gigs ? data.total_gigs : '0'
          },
             { 
            label: "Active Gigs", 
            value: data.active_gigs ? data.active_gigs : '0'
          },
        ];
        
        setStats(transformedStats);
      } catch (err) {
        console.error('Error fetching performance stats:', err);
        setError('Failed to load performance data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); // Removed userId dependency since it's now inside the effect

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
        {[1, 2, 3,4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow text-center border animate-pulse"
          >
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
        <p className="text-red-600 text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-red-600 hover:text-red-800 underline block mx-auto"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl shadow text-center border hover:shadow-md transition-shadow"
        >
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceStats;