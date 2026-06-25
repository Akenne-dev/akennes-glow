import { useEffect, useReducer } from "react";

let items = [];
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

function addToCart(product) {
  items = [...items, product];
  notify();
}

export function useCart() {
  const [, forceRender] = useReducer((count) => count + 1, 0);

  useEffect(() => {
    listeners.add(forceRender);
    return () => listeners.delete(forceRender);
  }, []);

  return {
    items,
    addToCart,
  };
}
