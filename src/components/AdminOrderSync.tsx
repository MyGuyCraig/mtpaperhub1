import React, { useEffect } from 'react';
import { useOrderStore } from '../stores/orderStore';
import { RefreshCw, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

const AdminOrderSync: React.FC = () => {
  const { loadOrders, isLoading, error } = useOrderStore();

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleRefresh = () => {
    loadOrders();
  };

  const openSupabaseDatabase = () => {
    window.open('https://supabase.com/dashboard/project/jrhwjvaresmejwjfenup/editor', '_blank');
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className={`w-3 h-3 rounded-full mr-2 ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {error ? 'Database Connection Error' : 'Connected to Cloud Database'}
            </span>
          </div>
          {error && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Syncing...' : 'Refresh Orders'}
        </button>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          All orders are automatically synced to the cloud database and accessible from anywhere in the world.
        </div>
        <button
          onClick={openSupabaseDatabase}
          className="flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View Database
        </button>
      </div>
    </div>
  );
};

export default AdminOrderSync;