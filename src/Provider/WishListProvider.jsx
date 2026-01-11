import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { WishListContext } from "./WishListContext";

const STORAGE_KEY = "pawmart_wishlist_v1";

const safeParse = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() =>
    safeParse(localStorage.getItem(STORAGE_KEY))
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isInWishlist = (id) => items.some((x) => x._id === id);

  const add = (service) => {
    if (!service?._id) return;

    if (isInWishlist(service._id)) {
      toast("Already in wishlist", { icon: "💜" });
      return;
    }

    setItems((prev) => [service, ...prev]);
    toast.success("Added to wishlist");
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((x) => x._id !== id));
    toast.success("Removed from wishlist");
  };

  const toggle = (service) => {
    if (!service?._id) return;
    isInWishlist(service._id) ? remove(service._id) : add(service);
  };

  const clear = () => {
    setItems([]);
    toast.success("Wishlist cleared");
  };

  const value = {
    items,
    add,
    remove,
    toggle,
    clear,
    isInWishlist,
  };

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishlistProvider;
