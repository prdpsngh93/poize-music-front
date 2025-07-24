const PerformanceStats = () => {
  const stats = [
    { label: "Gigs Completed", value: 25 },
    { label: "Average Rating", value: 4.8 },
    { label: "Average Rating", value: 4.8 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl shadow text-center border"
        >
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceStats;