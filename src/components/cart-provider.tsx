"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type QuoteItem = {
  slug: string;
  nameAr: string;
  nameFr: string;
  image: string;
  quantity: number;
};

type QuoteContextValue = {
  items: QuoteItem[];
  ready: boolean;
  count: number;
  add: (item: Omit<QuoteItem, "quantity">, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "atc-quote-list-v1";

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as QuoteItem[];
        if (Array.isArray(parsed)) setItems(parsed.filter((entry) => entry && entry.slug));
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota errors */
    }
  }, [items, ready]);

  const add = useCallback((item: Omit<QuoteItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.slug === item.slug);
      if (existing) {
        return current.map((entry) =>
          entry.slug === item.slug
            ? { ...entry, quantity: Math.min(99, entry.quantity + quantity) }
            : entry,
        );
      }
      return [...current, { ...item, quantity: Math.max(1, quantity) }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((current) => current.filter((entry) => entry.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((current) =>
      current
        .map((entry) =>
          entry.slug === slug ? { ...entry, quantity: Math.max(0, Math.min(99, quantity)) } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<QuoteContextValue>(() => {
    const count = items.reduce((sum, entry) => sum + entry.quantity, 0);
    return { items, ready, count, add, remove, setQuantity, clear };
  }, [items, ready, add, remove, setQuantity, clear]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used inside QuoteProvider");
  return context;
}
