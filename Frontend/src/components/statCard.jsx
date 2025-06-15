export default function StatCard({ label, value, Icon, color = "blue" }) {
  const bg = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
  }[color];

  return (
    <div
      className="bg-white rounded-xl shadow-md border p-5 flex items-center justify-between
                   hover:shadow-lg transition-all duration-300 ease-in-out animate-fade-in-up"
    >
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
      <div className={`p-3 rounded-full ${bg}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
