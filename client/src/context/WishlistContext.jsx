import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync with backend on login/logout
  useEffect(() => {
    const syncWishlist = async () => {
      if (user) {
        try {
          const { data } = await api.get('/users/wishlist');
          if (data.status === 'success') {
            setWishlist(data.data.wishlist);
          }
        } catch (error) {
          console.error('Failed to fetch wishlist', error);
        }
      } else {
        // Clear wishlist on logout
        setWishlist([]);
        localStorage.removeItem('wishlist');
      }
    };
    syncWishlist();
  }, [user]);

  // Push changes to backend
  useEffect(() => {
    const pushWishlist = async () => {
      if (user && wishlist.length > 0) {
        try {
          await api.patch('/users/wishlist', { wishlist: wishlist.map(item => item._id) });
        } catch (error) {
          console.error('Failed to sync wishlist to server', error);
        }
      }
    };
    // Debounce this if needed, but for small wishlists it's fine
    if (user) pushWishlist();
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item._id === product._id);
      if (isExist) {
        toast.info(`${product.title} is already in your wishlist`);
        return prev;
      }
      toast.success(`${product.title} added to wishlist!`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
    toast.info('Removed from wishlist');
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

