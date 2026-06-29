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
  provider: "duttyfy";
};

function getGatewayConfig() {
  const rawUrl = process.env.PIX_GATEWAY_URL || process.env.DUTTYFY_GATEWAY_URL;
  const token = process.env.DUTTYFY_API_TOKEN || process.env.PIX_GATEWAY_TOKEN;

  if (!rawUrl && !token) {
    throw new Error("Duttyfy não configurada no ambiente de produção.");
  }

  const url = new URL(rawUrl || "https://app.duttyfy.com/api/v1/transactions");
  if (token && !url.searchParams.has("api_token")) {
    url.searchParams.set("api_token", token);
  }

  return {
    url: url.toString(),
    authToken: process.env.DUTTYFY_BEARER_TOKEN || token || "",
  };
}

function readString(source: unknown, paths: string[][]): string | undefined {
  for (const path of paths) {
    let current: unknown = source;
    for (const key of path) {
      if (!current || typeof current !== "object" || !(key in current)) {
        current = undefined;
        break;
      }
      current = (current as Record<string, unknown>)[key];
    }
    if (typeof current === "string" && current.trim()) return current;
  }
  return undefined;
}

function statusUrl(baseUrl: string, id: string) {
  const url = new URL(baseUrl);
  url.searchParams.set("transactionId", id);
  return url.toString();
}

export const createPixCharge = createServerFn({ method: "POST" })
  .inputValidator((data: PixPayload) => data)
  .handler(async ({ data }): Promise<PixResponse> => {
    const gateway = getGatewayConfig();
    try {
      const headers: Record<string, string> = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
      if (gateway.authToken) headers.Authorization = `Bearer ${gateway.authToken}`;

      const res = await fetch(gateway.url, {
        method: "POST",
        headers,
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
      const text = await res.text();
      const json = text ? JSON.parse(text) as unknown : {};
      const pixCode = readString(json, [["pixCode"], ["pix_code"], ["brCode"], ["qrCode"], ["qrcode"], ["data", "pixCode"], ["data", "pix_code"], ["data", "brCode"], ["data", "qrCode"], ["data", "qrcode"], ["pix", "code"], ["data", "pix", "code"]]);
      const transactionId = readString(json, [["transactionId"], ["transaction_id"], ["id"], ["data", "transactionId"], ["data", "transaction_id"], ["data", "id"]]);

      if (!res.ok || !pixCode || !transactionId) {
        console.error("PIX gateway error", res.status, json);
        const message = json && typeof json === "object" ? (json as Record<string, unknown>).message : undefined;
        const msg = Array.isArray(message) ? message.join(", ") : (typeof message === "string" ? message : "Falha ao gerar PIX na Duttyfy");
        throw new Error(msg);
      }

      return {
        id: transactionId,
        brCode: pixCode,
        brCodeBase64: null,
        amount: data.amount,
        expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
        provider: "duttyfy",
      };
    } catch (err) {
      console.error("PIX gateway request failed", err);
      throw err instanceof Error ? err : new Error("Falha ao conectar com a Duttyfy");
    }
  });

export const checkPixStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<{ paid: boolean; status: string }> => {
    try {
      const gateway = getGatewayConfig();
      const headers: Record<string, string> = { "Accept": "application/json" };
      if (gateway.authToken) headers.Authorization = `Bearer ${gateway.authToken}`;
      const res = await fetch(statusUrl(gateway.url, data.id), { headers });
      const json = (await res.json()) as { status?: string };
      const status = (json.status ?? "PENDING").toUpperCase();
      return { paid: status === "PAID" || status === "APPROVED" || status === "COMPLETED", status };
    } catch {
      return { paid: false, status: "ERROR" };
    }
  });
