interface Activity {
  date: string;
  type: string;
  status: 'Selesai' | 'Ditangguhkan';
}

interface ActivityTableProps {
  activities: Activity[];
}

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Aktivitas Terakhir</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tanggal</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Jenis Surat</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{activity.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{activity.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      activity.status === 'Selesai'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
