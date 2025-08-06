import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  DollarSign,
  Smartphone,
  Building,
  ChevronDown
} from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { pakistaniCities, paymentMethods, countryCodes } from '../data/cities';
import { 
  generateOrderNumber, 
  calculateDeliveryCharges, 
  formatPhoneNumber,
  validatePhoneNumber,
  sendOrderEmail,
  validatePromoCode
} from '../utils/orderUtils';
import { Order, CustomerInfo, DeliveryAddress, PaymentMethod } from '../types/order';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface CheckoutFormData extends CustomerInfo, DeliveryAddress {
  paymentType: 'easypaisa' | 'bank';
  agreeToTerms: boolean;
  countryCode: string;
  promoCode: string;
}

const CheckoutPage: React.FC = () => {
  const { items, clearCart, totalPrice } = useCartStore();
  const { addOrder } = useOrderStore();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+92');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      countryCode: '+92'
    }
  });
  
  const paymentType = watch('paymentType');
  const city = watch('city');
  const phone = watch('phone');
  const countryCode = watch('countryCode');
  const promoCode = watch('promoCode');
  
  // Calculate totals
  const subtotal = totalPrice();
  const total = subtotal + deliveryCharges - promoDiscount;
  
  // Update delivery charges when subtotal changes
  useEffect(() => {
    const charges = calculateDeliveryCharges(subtotal);
    setDeliveryCharges(charges);
  }, [subtotal]);

  // Update city selection
  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

  // Update selected country code
  useEffect(() => {
    if (countryCode) {
      setSelectedCountryCode(countryCode);
    }
  }, [countryCode]);

  const handleApplyPromoCode = () => {
    if (!promoCode) {
      toast.error('Please enter a promo code');
      return;
    }

    const validation = validatePromoCode(promoCode, subtotal);
    
    if (validation.valid) {
      setPromoDiscount(validation.discount);
      setPromoMessage(validation.message);
      setAppliedPromoCode(promoCode);
      toast.success(validation.message);
    } else {
      setPromoDiscount(0);
      setPromoMessage(validation.message);
      setAppliedPromoCode('');
      toast.error(validation.message);
    }
  };

  const handleRemovePromoCode = () => {
    setPromoDiscount(0);
    setPromoMessage('');
    setAppliedPromoCode('');
    setValue('promoCode', '');
    toast.success('Promo code removed');
  };
  
  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/build-your-own"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Build Your Package</span>
          </Link>
        </div>
      </div>
    );
  }
  
  const onSubmit = async (data: CheckoutFormData) => {
    if (!data.agreeToTerms) {
      toast.error('Please agree to terms and conditions');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create order object
      const order: Order = {
        id: crypto.randomUUID(),
        orderNumber: generateOrderNumber(),
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: formatPhoneNumber(data.phone, data.countryCode),
          alternatePhone: data.alternatePhone ? formatPhoneNumber(data.alternatePhone, data.countryCode) : undefined
        },
        delivery: {
          address: data.address,
          area: data.area || '',
          city: data.city,
          postalCode: data.postalCode,
          landmark: data.landmark,
          deliveryInstructions: data.deliveryInstructions
        },
        payment: {
          type: data.paymentType,
          details: {}
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
          details: item.details
        })),
        subtotal,
        deliveryCharges,
        codCharges: 0,
        total,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: '',
        notes: data.deliveryInstructions,
        promoCode: appliedPromoCode,
        promoDiscount
      };
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send email
      const emailSent = await sendOrderEmail(order);
      
      if (!emailSent) {
        console.warn('Failed to send order email');
      }
      
      // Add order to store
      addOrder(order);
      
      // Clear cart and show success
      clearCart();
      setCompletedOrder(order);
      setOrderComplete(true);
      setShowConfetti(true);
      
      toast.success('Order placed successfully!');
      
      // Hide confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
      
    } catch (error) {
      console.error('Order processing error:', error);
      toast.error('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Order success page
  if (orderComplete && completedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-6">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Success Header */}
            <div className="bg-green-500 text-white p-6 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-green-100">Order #{completedOrder.orderNumber}</p>
            </div>
            
            {/* Order Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                    Delivery Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    {completedOrder.delivery.address}<br />
                    {completedOrder.delivery.city}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-indigo-600" />
                    Payment Method
                  </h3>
                  <p className="text-sm text-gray-600">
                    {completedOrder.payment.type.toUpperCase()}
                  </p>
                </div>
              </div>
              
              {/* Payment Instructions */}
              {completedOrder.payment.type === 'easypaisa' && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">EasyPaisa Payment Instructions</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Account Name:</strong> AQSA NOOR MALIK</p>
                    <p><strong>Account Number:</strong> 03297899451</p>
                    <p><strong>Amount to Send:</strong> PKR {completedOrder.total}</p>
                    <p className="text-blue-600 font-medium mt-2">Please send the payment and share the transaction ID with us via WhatsApp at +92 329 7899451</p>
                  </div>
                </div>
              )}
              
              {completedOrder.payment.type === 'bank' && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">Bank Transfer Instructions</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Account Title:</strong> ABDULLAH AZEEM MALIK (M) SHAZIA QADIR MALIK (G)</p>
                    <p><strong>Bank:</strong> Meezan Bank - Askari X Branch</p>
                    <p><strong>Account Number:</strong> 11460106540188</p>
                    <p><strong>IBAN:</strong> PK75MEZN0011460106540188</p>
                    <p><strong>Amount to Transfer:</strong> PKR {completedOrder.total}</p>
                    <p className="text-blue-600 font-medium mt-2">Please transfer the amount and share the transaction receipt with us via WhatsApp at +92 329 7899451</p>
                  </div>
                </div>
              )}
              
              {/* Contact Information */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Complete the payment using the details above</li>
                  <li>• Share the transaction ID/receipt via WhatsApp</li>
                  <li>• Your order will be prepared and shipped</li>
                  <li>• You'll receive updates on your order status</li>
                </ul>
              </div>
              
              {/* Order Summary */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {completedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>PKR {item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span>Subtotal</span>
                    <span>PKR {completedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Charges</span>
                    <span>PKR {completedOrder.deliveryCharges}</span>
                  </div>
                  {completedOrder.promoDiscount && completedOrder.promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Promo Discount ({completedOrder.promoCode})</span>
                      <span>-PKR {completedOrder.promoDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>PKR {completedOrder.total}</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="bg-gray-50 p-4 rounded-lg mt-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📞 +92 329 7899451</p>
                  <p>📧 web.mtpaperhub@gmail.com</p>
                  <p>📍 Askari X, Lahore</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link
                  to="/"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-center"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/build-your-own"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  Build Another Package
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <Link to="/cart" className="flex items-center text-indigo-600 hover:text-indigo-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Cart</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <User className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-800">Customer Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <div className="relative">
                        <select
                          {...register('countryCode')}
                          className="appearance-none bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {countryCodes.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone', { 
                          required: 'Phone number is required',
                          validate: (value) => validatePhoneNumber(value, selectedCountryCode) || 'Please enter a valid phone number'
                        })}
                        className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                    {phone && validatePhoneNumber(phone, selectedCountryCode) && (
                      <p className="mt-1 text-sm text-green-600">✓ {formatPhoneNumber(phone, selectedCountryCode)}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Alternate Phone (Optional)
                    </label>
                    <div className="flex">
                      <div className="relative">
                        <select
                          value={selectedCountryCode}
                          onChange={(e) => setSelectedCountryCode(e.target.value)}
                          className="appearance-none bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {countryCodes.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                      <input
                        type="tel"
                        id="alternatePhone"
                        {...register('alternatePhone', {
                          validate: (value) => !value || validatePhoneNumber(value, selectedCountryCode) || 'Please enter a valid phone number'
                        })}
                        className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter alternate phone"
                      />
                    </div>
                    {errors.alternatePhone && (
                      <p className="mt-1 text-sm text-red-600">{errors.alternatePhone.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-800">Delivery Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <select
                        id="city"
                        {...register('city', { required: 'City is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select City</option>
                        {pakistaniCities.map(city => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                        Area/Neighborhood
                      </label>
                      <input
                        type="text"
                        id="area"
                        {...register('area')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your area"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Complete Address *
                    </label>
                    <textarea
                      id="address"
                      {...register('address', { required: 'Address is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      placeholder="House/Flat number, Street name, etc."
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code (Optional)
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        {...register('postalCode')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="54000"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
                        Nearby Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        {...register('landmark')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Near XYZ Mall"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      id="deliveryInstructions"
                      {...register('deliveryInstructions')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={2}
                      placeholder="Special delivery instructions, gate code, etc."
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-800">Payment Method</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="cursor-pointer">
                      <input
                        type="radio"
                        value={method.id}
                        {...register('paymentType', { required: 'Please select a payment method' })}
                        className="sr-only"
                      />
                      <div className={`border-2 rounded-lg p-4 transition-colors ${
                        paymentType === method.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{method.icon}</span>
                            <div>
                              <span className="font-medium">{method.name}</span>
                              <p className="text-sm text-gray-500">{method.description}</p>
                            </div>
                          </div>
                          {paymentType === method.id && (
                            <CheckCircle className="h-5 w-5 text-indigo-500" />
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                {errors.paymentType && (
                  <p className="mt-2 text-sm text-red-600">{errors.paymentType.message}</p>
                )}
                
                {/* Payment Details */}
                {paymentType === 'easypaisa' && (
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">EasyPaisa Payment Details</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Send Payment To:</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Account Name:</strong> AQSA NOOR MALIK</p>
                        <p><strong>Account Number:</strong> 03297899451</p>
                        <p><strong>Amount:</strong> PKR {total}</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg mt-3">
                      <p className="text-sm text-amber-800">
                        <strong>Instructions:</strong> After placing your order, send PKR {total} to the above EasyPaisa account and share the transaction ID with us via WhatsApp at +92 329 7899451.
                      </p>
                    </div>
                  </div>
                )}
                
                {paymentType === 'bank' && (
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">Bank Transfer Details</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Transfer To:</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Account Title:</strong> ABDULLAH AZEEM MALIK (M) SHAZIA QADIR MALIK (G)</p>
                        <p><strong>Bank:</strong> Meezan Bank - Askari X Branch</p>
                        <p><strong>Account Number:</strong> 11460106540188</p>
                        <p><strong>IBAN:</strong> PK75MEZN0011460106540188</p>
                        <p><strong>Amount:</strong> PKR {total}</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg mt-3">
                      <p className="text-sm text-amber-800">
                        <strong>Instructions:</strong> After placing your order, transfer PKR {total} to the above bank account and share the transaction receipt with us via WhatsApp at +92 329 7899451.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-800">Promo Code</h2>
                </div>
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    {...register('promoCode')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter promo code"
                    disabled={!!appliedPromoCode}
                  />
                  {appliedPromoCode ? (
                    <button
                      type="button"
                      className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      onClick={handleRemovePromoCode}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={handleApplyPromoCode}
                    >
                      Apply
                    </button>
                  )}
                </div>
                {promoMessage && (
                  <p className={`mt-2 text-sm ${appliedPromoCode ? 'text-green-600' : 'text-red-600'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>
              
              {/* Terms and Conditions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    {...register('agreeToTerms', { required: 'You must agree to terms and conditions' })}
                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-indigo-600 hover:text-indigo-700 underline">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 underline">
                        Privacy Policy
                      </Link>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center px-6 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    <span>Place Order - PKR {total.toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-indigo-600" />
                  Order Summary
                </h2>
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        {item.type === 'custom' && item.details && (
                          <p className="text-xs text-gray-400">
                            {item.details.level} • {item.details.subjects?.length} subjects
                          </p>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="text-gray-800">
                      PKR {deliveryCharges}
                    </span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Promo Discount ({appliedPromoCode})</span>
                      <span className="text-green-600">-PKR {promoDiscount}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-800">Total</span>
                      <span className="text-xl font-bold text-indigo-600">
                        PKR {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Secure Checkout</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Your information is encrypted and secure. We offer multiple payment options for your convenience.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-800 mb-2">Contact Us</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      +92 329 7899451
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      web.mtpaperhub@gmail.com
                    </p>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Askari X, Lahore
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;