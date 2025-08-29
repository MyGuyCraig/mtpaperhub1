import { supabase } from '../lib/supabase';
import { Order } from '../types/order';

export class OrderService {
  // Create a new order in Supabase
  static async createOrder(order: Order): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          order_number: order.orderNumber,
          customer_info: order.customer,
          delivery_info: order.delivery,
          payment_info: order.payment,
          items: order.items,
          subtotal: order.subtotal,
          delivery_charges: order.deliveryCharges,
          total: order.total,
          status: order.status,
          payment_status: order.paymentStatus,
          promo_code: order.promoCode,
          promo_discount: order.promoDiscount || 0,
          notes: order.notes
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, error: 'Failed to create order' };
    }
  }

  // Get all orders
  static async getAllOrders(): Promise<{ success: boolean; data?: Order[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return { success: false, error: error.message };
      }

      // Transform Supabase data back to Order format
      const orders: Order[] = data.map(row => ({
        id: row.id,
        orderNumber: row.order_number,
        customer: row.customer_info,
        delivery: row.delivery_info,
        payment: row.payment_info,
        items: row.items,
        subtotal: row.subtotal,
        deliveryCharges: row.delivery_charges,
        codCharges: 0, // Legacy field
        total: row.total,
        status: row.status,
        paymentStatus: row.payment_status,
        createdAt: row.created_at,
        estimatedDelivery: '', // Legacy field
        notes: row.notes,
        promoCode: row.promo_code,
        promoDiscount: row.promo_discount
      }));

      return { success: true, data: orders };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: 'Failed to fetch orders' };
    }
  }

  // Update order status
  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: 'Failed to update order status' };
    }
  }

  // Update payment status
  static async updatePaymentStatus(orderId: string, paymentStatus: Order['paymentStatus']): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: paymentStatus })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating payment status:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { success: false, error: 'Failed to update payment status' };
    }
  }

  // Delete an order
  static async deleteOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) {
        console.error('Error deleting order:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting order:', error);
      return { success: false, error: 'Failed to delete order' };
    }
  }

  // Get order by order number
  static async getOrderByNumber(orderNumber: string): Promise<{ success: boolean; data?: Order; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        return { success: false, error: error.message };
      }

      const order: Order = {
        id: data.id,
        orderNumber: data.order_number,
        customer: data.customer_info,
        delivery: data.delivery_info,
        payment: data.payment_info,
        items: data.items,
        subtotal: data.subtotal,
        deliveryCharges: data.delivery_charges,
        codCharges: 0,
        total: data.total,
        status: data.status,
        paymentStatus: data.payment_status,
        createdAt: data.created_at,
        estimatedDelivery: '',
        notes: data.notes,
        promoCode: data.promo_code,
        promoDiscount: data.promo_discount
      };

      return { success: true, data: order };
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, error: 'Failed to fetch order' };
    }
  }

  // Get orders by status
  static async getOrdersByStatus(status: Order['status']): Promise<{ success: boolean; data?: Order[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders by status:', error);
        return { success: false, error: error.message };
      }

      const orders: Order[] = data.map(row => ({
        id: row.id,
        orderNumber: row.order_number,
        customer: row.customer_info,
        delivery: row.delivery_info,
        payment: row.payment_info,
        items: row.items,
        subtotal: row.subtotal,
        deliveryCharges: row.delivery_charges,
        codCharges: 0,
        total: row.total,
        status: row.status,
        paymentStatus: row.payment_status,
        createdAt: row.created_at,
        estimatedDelivery: '',
        notes: row.notes,
        promoCode: row.promo_code,
        promoDiscount: row.promo_discount
      }));

      return { success: true, data: orders };
    } catch (error) {
      console.error('Error fetching orders by status:', error);
      return { success: false, error: 'Failed to fetch orders by status' };
    }
  }
}