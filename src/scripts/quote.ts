// Client-side quote list persisted in localStorage.
export interface QuoteItem {
  id: string; // product id + optional model, e.g. "clear-cornea-blade:190CC"
  product: string;
  model?: string;
  spec?: string;
  qty: number;
}

const KEY = "wf-quote";
const EVENT = "quote:change";

export function getQuote(): QuoteItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QuoteItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: QuoteItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode); list lives only in memory for this page
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: items }));
}

export function addToQuote(item: Omit<QuoteItem, "qty">, qty = 1) {
  const items = getQuote();
  const existing = items.find((i) => i.id === item.id);
  if (existing) existing.qty += qty;
  else items.push({ ...item, qty });
  save(items);
}

export function setQty(id: string, qty: number) {
  save(getQuote().map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
}

export function removeFromQuote(id: string) {
  save(getQuote().filter((i) => i.id !== id));
}

export function clearQuote() {
  save([]);
}

export function onQuoteChange(cb: (items: QuoteItem[]) => void) {
  window.addEventListener(EVENT, (e) => cb((e as CustomEvent<QuoteItem[]>).detail));
  window.addEventListener("storage", (e) => e.key === KEY && cb(getQuote()));
}

export function quoteToText(items: QuoteItem[]) {
  return items
    .map((i) => `• ${i.qty} × ${i.product}${i.model ? ` — model ${i.model}` : ""}${i.spec ? ` (${i.spec})` : ""}`)
    .join("\n");
}
