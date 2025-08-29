import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types/order';
import { OrderService } from '../services/orderService';

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  addOrder: (order: Order) => void;
  loadOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  removeOrder: (orderId: string) => void;
  clearAllOrders: () => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,

      addOrder: async (order) => {
        set({ isLoading: true, error: null });
        
        try {
          // Save to Supabase first
          const result = await OrderService.createOrder(order);
          
          if (result.success) {
            // Add to local state on success
            set((state) => ({
              orders: [order, ...state.orders],
              currentOrder: order,
              isLoading: false
            }));
            console.log('Order saved to Supabase successfully');
          } else {
            set({ 
              error: result.error || 'Failed to save order',
              isLoading: false 
            });
            // Still add to local state as fallback for offline functionality
            set((state) => ({
              orders: [order, ...state.orders],
              currentOrder: order
            }));
            console.warn('Failed to save to Supabase, saved locally only:', result.error);
          }
        } catch (error) {
          console.error('Error in addOrder:', error);
          set({ 
            error: 'Network error while saving order',
            isLoading: false 
          });
          // Still add to local state as fallback
          set((state) => ({
            orders: [order, ...state.orders],
            currentOrder: order
          }));
        }
      },

      loadOrders: async () => {
        set({ isLoading: true, error: null });
        
        const result = await OrderService.getAllOrders();
        
        if (result.success && result.data) {
          set({
            orders: result.data,
            isLoading: false
          });
        } else {
          set({
            error: result.error || 'Failed to load orders',
            isLoading: false
          });
        }
      },

      updateOrderStatus: async (orderId, status) => {
        // Update in Supabase
        const result = await OrderService.updateOrderStatus(orderId, status);
        
        if (!result.success) {
          console.error('Failed to update order status in Supabase:', result.error);
        }
        
        // Update local state regardless
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        }));
      },

      updatePaymentStatus: async (orderId, paymentStatus) => {
        // Update in Supabase
        const result = await OrderService.updatePaymentStatus(orderId, paymentStatus);
        
        if (!result.success) {
          console.error('Failed to update payment status in Supabase:', result.error);
        }
        
        // Update local state regardless
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, paymentStatus } : order
          )
        }));
      },

      removeOrder: async (orderId) => {
        // Delete from Supabase
        const result = await OrderService.deleteOrder(orderId);
        
        if (!result.success) {
          console.error('Failed to delete order from Supabase:', result.error);
        }
        
        // Remove from local state regardless
        set((state) => ({
          orders: state.orders.filter(order => order.id !== orderId)
        }));
      },

      clearAllOrders: () => {
        // Note: This only clears local storage, not Supabase data
        set({
          orders: [],
          currentOrder: null
        });
      },

      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter(order => order.status === status);
      },

      clearCurrentOrder: () => {
        set({ currentOrder: null });
      }
    }),
    {
      name: 'order-storage'
    }
  )
);