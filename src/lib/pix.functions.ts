import { createServerFn } from "@tanstack/react-start";

export type PixPayload = {
  amount: number; // em reais
  description: string;
  customer: { name: string; email: string; cpf: string };
};

export type PixResponse = {
  id: string;
  brCode: string;
  brCodeBase64: string | null;
  amount: number;
  expiresAt: string;
  provider: "duttyfy" | "mock";
};

function genFallback(amount: number): PixResponse {
  const val = amount.toFixed(2);
  const id = Math.random().toString(36).slice(2, 10).toUpperCase();
  const code = `00020126580014BR.GOV.BCB.PIX0136pix@gta6store.com.br0210GTA6-${id}5204000053039865406${val}5802BR5913GTA VI STORE6009SAO PAULO62100506${id}6304A1B2`;
  return {
    id: `mock_${id}`,
    brCode: code,
    brCodeBase64: null,
    amount,
    expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
    provider: "mock",
  };
}

export const createPixCharge = createServerFn({ method: "POST" })
  .inputValidator((data: PixPayload) => data)
  .handler(async ({ data }): Promise<PixResponse> => {
    const url = process.env.PIX_GATEWAY_URL;
    if (!url) return genFallback(data.amount);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(data.amount * 100),
          description: data.description,
          paymentMethod: "PIX",
          item: {
            title: data.description,
            quantity: 1,
            price: Math.round(data.amount * 100),
          },
          customer: {
            name: data.customer.name,
            document: data.customer.cpf.replace(/\D/g, ""),
            email: data.customer.email,
            phone: "11999999999",
          },
          utm: "",
        }),
      });
      const json = (await res.json()) as {
        pixCode?: string;
        transactionId?: string;
        status?: string;
        message?: unknown;
      };
      if (!res.ok || !json.pixCode || !json.transactionId) {
        console.error("PIX gateway error", res.status, json);
        return genFallback(data.amount);
      }
      return {
        id: json.transactionId,
        brCode: json.pixCode,
        brCodeBase64: null,
        amount: data.amount,
        expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
        provider: "duttyfy",
      };
    } catch (err) {
      console.error("PIX gateway request failed", err);
      return genFallback(data.amount);
    }
  });

export const checkPixStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<{ paid: boolean; status: string }> => {
    const url = process.env.PIX_GATEWAY_URL;
    if (!url || data.id.startsWith("mock_")) return { paid: false, status: "PENDING" };
    try {
      const res = await fetch(`${url}?transactionId=${encodeURIComponent(data.id)}`);
      const json = (await res.json()) as { status?: string };
      const status = (json.status ?? "PENDING").toUpperCase();
      return { paid: status === "PAID" || status === "APPROVED" || status === "COMPLETED", status };
    } catch {
      return { paid: false, status: "ERROR" };
    }
  });
