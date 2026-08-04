export default function Home() {
  return (
    <div className="min-h-screen flex bg-blue-500 items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Fludesk
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Modern kanban board for project management
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
