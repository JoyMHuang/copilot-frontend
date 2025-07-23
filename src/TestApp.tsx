import { useState } from 'react';

function TestApp() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded mr-3"></div>
              <div>
                <h1 className="text-lg font-semibold">Manulife</h1>
                <p className="text-sm text-gray-300">Investment Management</p>
              </div>
            </div>
          </div>
          <nav className="p-4">
            <div className="space-y-2">
              <button className="w-full text-left py-2 px-4 bg-green-500 text-white rounded">
                Portfolio Dashboard
              </button>
              <button className="w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
                Transact
              </button>
              <button className="w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
                Profile
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Total Market Value</h2>
            <p className="text-3xl font-bold text-green-500 mb-2">PHP 14,485,393.54</p>
            <p className="text-sm text-gray-500">As of 08/07/2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Counter</h3>
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Count: {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestApp;
