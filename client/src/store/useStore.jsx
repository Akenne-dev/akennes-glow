import create from "zustand";

export const useStore = create((set) => ({
  authToken: null,
  user: null,
  cart: [],
  wishlist: [],
  setAuth: (token, user) => set({ authToken: token, user }),
  clearAuth: () => set({ authToken: null, user: null }),
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  addToWishlist: (product) =>
    set((state) => ({ wishlist: [...state.wishlist, product] })),
  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== id),
    })),
}));
