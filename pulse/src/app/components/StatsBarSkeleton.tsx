export default function StatsBarSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow">
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
}