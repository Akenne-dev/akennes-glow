import { useEffect, useReducer } from "react";
import { api } from "./api";

let products = [];
let productIds = new Set();
let status = "idle"; // idle | loading | loaded | error
let loadingPromise = null;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

function setProducts(nextProducts) {
  products = nextProducts;
  productIds = new Set(nextProducts.map((product) => product._id));
  status = "loaded";
  notify();
}

async function fetchWishlist() {
  if (loadingPromise) return loadingPromise;

  status = "loading";
  loadingPromise = api
    .get("/wishlist")
    .then((res) => {
      setProducts(res.data.products || []);
    })
    .catch(() => {
      status = "error";
      notify();
    })
    .finally(() => {
      loadingPromise = null;
    });

  return loadingPromise;
}

async function toggleWishlist(product) {
  const id = product._id;
  const wasWishlisted = productIds.has(id);
  const previousProducts = products;

  setProducts(
    wasWishlisted
      ? products.filter((item) => item._id !== id)
      : [...products, product]
  );

  try {
    await api.post("/wishlist/toggle", { productId: id });
  } catch (error) {
    setProducts(previousProducts);
    throw error;
  }

  return !wasWishlisted;
}

export function useWishlist() {
  const [, forceRender] = useReducer((count) => count + 1, 0);

  useEffect(() => {
    listeners.add(forceRender);
    if (status === "idle") {
      fetchWishlist();
    }
    return () => listeners.delete(forceRender);
  }, []);

  return {
    products,
    status,
    isWishlisted: (productId) => productIds.has(productId),
    toggleWishlist,
    refreshWishlist: fetchWishlist,
  };
}
