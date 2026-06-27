// Store local de pedidos (somente cliente) — usado pelo checkout e pelo admin.
export type OrderStatus = "pendente" | "pago" | "expirado";

export type Order = {
  id: string;
  pixId: string;
  edition: "standard" | "ultimate";
  title: string;
  amount: number;
  customer: { name: string; email: string; cpf: string };
  status: OrderStatus;
  provider: string;
  createdAt: string;
  paidAt?: string;
};

const KEY = "gta6_orders_v1";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Order[];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event("orders:updated"));
}

export function addOrder(order: Order) {
  const all = loadOrders();
  all.unshift(order);
  saveOrders(all);
}

export function updateOrder(id: string, patch: Partial<Order>) {
  const all = loadOrders().map((o) => (o.id === id ? { ...o, ...patch } : o));
  saveOrders(all);
}

export function trackVisit() {
  if (typeof window === "undefined") return;
  const k = "gta6_visits_v1";
  const today = new Date().toISOString().slice(0, 10);
  try {
    const data = JSON.parse(localStorage.getItem(k) || "{}") as Record<string, number>;
    data[today] = (data[today] || 0) + 1;
    localStorage.setItem(k, JSON.stringify(data));
  } catch { /* noop */ }
}

export function loadVisits(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem("gta6_visits_v1") || "{}"); } catch { return {}; }
}
