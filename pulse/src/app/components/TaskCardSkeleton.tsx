export default function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow animate-pulse">
      <div className="flex justify-between items-start mb-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-12"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
    </div>
  );
}