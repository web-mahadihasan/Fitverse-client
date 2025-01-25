
export default function InfoCard({ title, value, icon, gradient }) {
    return (
      <div className={`bg-gradient-to-br ${gradient} rounded-lg shadow-lg p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="text-white opacity-80">{icon}</div>
        </div>
      </div>
    )
  }
  
  