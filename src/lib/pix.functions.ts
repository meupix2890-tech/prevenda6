import { createServerFn } from "@tanstack/react-start";

export type PixPayload = {
  amount: number;
  description: string;
  customer: { name: string; email: string; cpf: string };
};

export type PixResponse = {
  id: string;
  brCode: string;
  brCodeBase64: string | null;
  amount: number;
  expiresAt: string;
  provider: "abacatepay" | "mock";
};

function genFallback(amount: number, description: string): PixResponse {
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
    const key = process.env.ABACATEPAY_API_KEY;
    if (!key) return genFallback(data.amount, data.description);

    try {
      const res = await fetch("https://api.abacatepay.com/v1/pixQrCode/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(data.amount * 100),
          expiresIn: 900,
          description: data.description,
          customer: {
            name: data.customer.name,
            email: data.customer.email,
            taxId: data.customer.cpf.replace(/\D/g, ""),
          },
        }),
      });
      const json = (await res.json()) as {
        data?: { id: string; brCode: string; brCodeBase64?: string; amount: number; expiresAt: string };
        error?: string | null;
      };
      if (!res.ok || !json.data) {
        console.error("AbacatePay error", res.status, json);
        return genFallback(data.amount, data.description);
      }
      return {
        id: json.data.id,
        brCode: json.data.brCode,
        brCodeBase64: json.data.brCodeBase64 ?? null,
        amount: json.data.amount / 100,
        expiresAt: json.data.expiresAt,
        provider: "abacatepay",
      };
    } catch (err) {
      console.error("AbacatePay request failed", err);
      return genFallback(data.amount, data.description);
    }
  });

export const checkPixStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<{ paid: boolean; status: string }> => {
    const key = process.env.ABACATEPAY_API_KEY;
    if (!key || data.id.startsWith("mock_")) return { paid: false, status: "PENDING" };
    try {
      const res = await fetch(`https://api.abacatepay.com/v1/pixQrCode/check?id=${encodeURIComponent(data.id)}`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      const json = (await res.json()) as { data?: { status: string } };
      const status = json.data?.status ?? "PENDING";
      return { paid: status === "PAID", status };
    } catch {
      return { paid: false, status: "ERROR" };
    }
  });
