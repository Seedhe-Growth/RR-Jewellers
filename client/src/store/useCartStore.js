import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product, quantity = 1) => {
        const existingItem = get().cart.find((item) => item._id === product._id);
        if (existingItem) {
          set({
            cart: get().cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item._id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
