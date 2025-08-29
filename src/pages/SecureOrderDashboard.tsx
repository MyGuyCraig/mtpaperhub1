import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Phone,
  Mail,
  MapPin,
  Filter,
  Search,
  Eye,
  Printer,
  DollarSign,
  Calendar,
  User,
  Trash2,
  AlertTriangle,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';
import { Order } from '../types/order';
import { formatCustomPackageDetails, formatOrderItemDetails } from '../utils/orderUtils';
import toast from 'react-hot-toast';
import AdminOrderSync from '../components/AdminOrderSync';

const SecureOrderDashboard: React.FC = () => {
  const { orders, updateOrderStatus, updatePaymentStatus, removeOrder, clearAllOrders, loadOrders, isLoading, error } = useOrderStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const CORRECT_PASSCODE = '8227wasmykitnumber@CCH';

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      // Load orders from Supabase when authenticated
      loadOrders();
    }
  }, [loadOrders]);

  // Load orders when authentication is successful
  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated, loadOrders]);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      toast.success('Access granted');
    } else {
      toast.error('Invalid passcode');
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPasscode('');
    toast.success('Logged out successfully');
  };

  const toggleItemExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
    const matchesSearch = searchTerm === '' || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    
    return matchesStatus && matchesPaymentStatus && matchesSearch;
  });

  // Order statistics (excluding COD pending)
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    total_revenue: orders
      .filter(o => o.paymentStatus === 'paid' || o.status === 'delivered')
      .reduce((sum, o) => sum + o.total, 0)
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    
    // Auto-update payment status when delivered
    if (newStatus === 'delivered') {
      updatePaymentStatus(orderId, 'paid');
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    removeOrder(orderId);
    setShowDeleteConfirm(null);
    toast.success('Order deleted successfully');
  };

  const handleClearAllOrders = () => {
    clearAllOrders();
    setShowClearConfirm(false);
    toast.success('All orders cleared successfully');
  };

  const printDeliverySlip = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Delivery Slip - ${order.orderNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .section { margin-bottom: 15px; }
              .label { font-weight: bold; }
              .items { border-collapse: collapse; width: 100%; margin-top: 10px; }
              .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .items th { background-color: #f2f2f2; }
              .total { font-size: 18px; font-weight: bold; margin-top: 15px; }
              .item-details { font-size: 12px; color: #666; margin-top: 4px; white-space: pre-line; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>MTPaperhub</h1>
              <h2>Delivery Slip</h2>
              <p>Order #${order.orderNumber}</p>
            </div>
            
            <div class="section">
              <div class="label">Customer Information:</div>
              <p>${order.customer.firstName} ${order.customer.lastName}</p>
              <p>Phone: ${order.customer.phone}</p>
              ${order.customer.alternatePhone ? `<p>Alt Phone: ${order.customer.alternatePhone}</p>` : ''}
              <p>Email: ${order.customer.email}</p>
            </div>
            
            <div class="section">
              <div class="label">Delivery Address:</div>
              <p>${order.delivery.address}</p>
              <p>${order.delivery.city}</p>
              ${order.delivery.landmark ? `<p>Landmark: ${order.delivery.landmark}</p>` : ''}
              ${order.delivery.deliveryInstructions ? `<p>Instructions: ${order.delivery.deliveryInstructions}</p>` : ''}
            </div>
            
            <div class="section">
              <div class="label">Order Items:</div>
              <table class="items">
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                ${order.items.map(item => `
                  <tr>
                    <td>
                      ${item.name}
                      <div class="item-details">${formatOrderItemDetails(item)}</div>
                    </td>
                    <td>${item.quantity}</td>
                    <td>PKR ${item.price}</td>
                    <td>PKR ${item.price * item.quantity}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
            
            <div class="section">
              <div class="label">Payment Information:</div>
              <p>Method: ${order.payment.type.toUpperCase()}</p>
              <p>Subtotal: PKR ${order.subtotal}</p>
              <p>Delivery: PKR ${order.deliveryCharges}</p>
              <div class="total">Total Amount: PKR ${order.total}</div>
            </div>
            
            <div class="section">
              <p>Order Date: ${new Date(order.createdAt).toLocaleDateString('en-PK')}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
              <p className="text-gray-600 mt-2">Enter passcode to access order management</p>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="space-y-6">
              <div>
                <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-2">
                  Passcode
                </label>
                <input
                  type="password"
                  id="passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter admin passcode"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management Dashboard</h1>
            <p className="text-gray-600">Manage and track all your orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-indigo-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Shipped Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.shipped}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">PKR {stats.total_revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <AdminOrderSync />
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Order number, customer name, phone..."
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              >
                <option value="all">All Payment Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedStatus('all');
                  setSelectedPaymentStatus('all');
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Orders ({filteredOrders.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            #{order.orderNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.length} item(s)
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customer.phone}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.delivery.city}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          {order.items.map((item, index) => (
                            <div key={item.id} className="mb-2 last:mb-0">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {item.name} (x{item.quantity})
                                </div>
                                {item.type === 'custom' && (
                                  <button
                                    onClick={() => toggleItemExpansion(`${order.id}-${item.id}`)}
                                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                                  >
                                    {expandedItems.has(`${order.id}-${item.id}`) ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </button>
                                )}
                              </div>
                              {expandedItems.has(`${order.id}-${item.id}`) && item.type === 'custom' && item.details && (
                                <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                                  <div><strong>Level:</strong> {item.details.level}</div>
                                  <div><strong>Subjects:</strong> {item.details.subjects?.length || 0}</div>
                                  {item.details.subjects?.map((subject: any, subIndex: number) => (
                                    <div key={subIndex} className="ml-2 mt-1">
                                      • {subject.name}
                                      {subject.papers && (
                                        <div className="ml-2 text-gray-500">
                                          Papers: {subject.papers.map((paperInfo: any) => {
                                            if (typeof paperInfo === 'string') {
                                              return paperInfo;
                                            }
                                            return `${paperInfo.paper} (${paperInfo.yearRange})`;
                                          }).join(', ')}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                  <div><strong>Binding:</strong> {item.details.binding}</div>
                                  {item.details.notes && (
                                    <div><strong>Notes:</strong> {item.details.notes}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          PKR {order.total.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.payment.type.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-PK')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => printDeliverySlip(order)}
                          className="text-green-600 hover:text-green-900"
                          title="Print Delivery Slip"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(order.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Order Details - #{selectedOrder.orderNumber}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                      <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                      <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                      {selectedOrder.customer.alternatePhone && (
                        <p><strong>Alt Phone:</strong> {selectedOrder.customer.alternatePhone}</p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Delivery Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Address:</strong> {selectedOrder.delivery.address}</p>
                      {selectedOrder.delivery.area && (
                        <p><strong>Area:</strong> {selectedOrder.delivery.area}</p>
                      )}
                      <p><strong>City:</strong> {selectedOrder.delivery.city}</p>
                      {selectedOrder.delivery.postalCode && (
                        <p><strong>Postal Code:</strong> {selectedOrder.delivery.postalCode}</p>
                      )}
                      {selectedOrder.delivery.landmark && (
                        <p><strong>Landmark:</strong> {selectedOrder.delivery.landmark}</p>
                      )}
                      {selectedOrder.delivery.deliveryInstructions && (
                        <p><strong>Instructions:</strong> {selectedOrder.delivery.deliveryInstructions}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              <div>
                                <div className="font-medium">{item.name}</div>
                                {item.type === 'custom' && item.details && (
                                  <div className="text-xs text-gray-500 mt-1 whitespace-pre-line">
                                    {formatOrderItemDetails(item)}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">PKR {item.price}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">PKR {item.price * item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Payment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>PKR {selectedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges:</span>
                      <span>PKR {selectedOrder.deliveryCharges}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>PKR {selectedOrder.total}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <p><strong>Payment Method:</strong> {selectedOrder.payment.type.toUpperCase()}</p>
                      <p><strong>Payment Status:</strong> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                          {selectedOrder.paymentStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => printDeliverySlip(selectedOrder)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Delivery Slip
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Delete Order</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteOrder(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clear All Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Clear All Orders</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete ALL orders? This action cannot be undone and will permanently remove all order history.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAllOrders}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Clear All Orders
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureOrderDashboard;