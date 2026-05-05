export default function AuditLoading() {
  return (
    <main className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {Array.from({ length: 5 }).map((_, index) => (
                  <th
                    key={index}
                    className="text-right px-4 py-3 text-gray-600 font-medium"
                  >
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {Array.from({ length: 5 }).map((_, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
