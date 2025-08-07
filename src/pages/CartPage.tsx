import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  ShoppingBag,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useCartStore, CartItem } from '../stores/cartStore';
import { formatCustomPackageDetails } from '../utils/orderUtils';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();
  const navigate = useNavigate();
  
  // Calculate totals (removed tax calculation)
  const subtotal = totalPrice();
  const total = subtotal; // No automatic shipping charges
  
  // Handle quantity updates
  const handleIncreaseQuantity = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };
  
  // Render empty cart state
  const renderEmptyCart = () => (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingCart className="h-10 w-10 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Looks like you haven't added any study materials to your cart yet. Build your custom package to get started.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/build-your-own"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Build Your Package
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
  
  // Render product item
  const renderCartItem = (item: CartItem) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row py-6 border-b border-gray-200"
    >
      <div className="sm:w-24 sm:h-24 h-full w-full flex-shrink-0 mb-4 sm:mb-0">
        {item.type === 'product' && item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-indigo-100 rounded-md flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-indigo-500" />
          </div>
        )}
      </div>
      
      <div className="flex-1 sm:ml-6">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
            {item.type === 'custom' && item.details && (
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p><strong>Level:</strong> {item.details.level}</p>
                <p><strong>Subjects:</strong> {item.details.subjects?.length || 0}</p>
                <div className="max-w-md">
                  <p><strong>Details:</strong></p>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.details.subjects?.map((subject: any, index: number) => (
                      <div key={index} className="mb-1">
                        {subject.name} ({subject.papers?.join(', ') || 'No papers'})
                      </div>
                    ))}
                  </div>
                </div>
                <p><strong>Years:</strong> {item.details.yearRange}</p>
                <p><strong>Binding:</strong> {item.details.binding}</p>
                {item.details.notes && (
                  <p><strong>Notes:</strong> {item.details.notes}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-2 sm:mt-0 flex items-center">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                onClick={() => handleDecreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-gray-800 border-l border-r border-gray-300">
                {item.quantity}
              </span>
              <button
                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                onClick={() => handleIncreaseQuantity(item.id)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <button
              className="ml-4 text-gray-400 hover:text-red-500"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Rs. {item.price} x {item.quantity}
          </div>
          <div className="text-lg font-medium text-indigo-600">
            Rs. {(item.price * item.quantity)}
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <Link to="/build-your-own" className="flex items-center text-indigo-600 hover:text-indigo-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Continue Building</span>
          </Link>
        </div>
        
        {items.length === 0 ? renderEmptyCart() : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">Cart Items ({items.reduce((total, item) => total + item.quantity, 0)})</h2>
                    <button
                      className="text-sm text-gray-500 hover:text-red-500"
                      onClick={() => clearCart()}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200 px-6">
                  {items.map(renderCartItem)}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Order Summary</h2>
                </div>
                
                <div className="px-6 py-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">Rs. {subtotal}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium">Total</span>
                      <span className="text-indigo-600 font-bold">Rs. {total}</span>
                    </div>
                  </div>
                  
                  <button
                    className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    onClick={() => navigate('/checkout')}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span>Proceed to Checkout</span>
                  </button>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Secure Checkout</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>All transactions are secure and encrypted. We accept bank transfers and mobile payments.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Build Your Own CTA */}
        {items.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-xl p-6 md:p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Want to add more subjects?</h2>
                <p className="text-white/90 max-w-xl">
                  Build another custom package with exactly the subjects, papers, and years you need for your exams.
                </p>
              </div>
              <Link
                to="/build-your-own"
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors shadow-md"
              >
                <span>Build Another Package</span>
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;