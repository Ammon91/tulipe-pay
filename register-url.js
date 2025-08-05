import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
} = process.env;

const baseUrl = "https://api.safaricom.co.ke";

async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");

  const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();
  if (!data.access_token) throw new Error(`❌ Failed to get access token: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function registerURLs() {
  const accessToken = await getAccessToken();

  const body = {
    ShortCode: MPESA_SHORTCODE,
    ResponseType: "Completed",
    ConfirmationURL: "https://tulipe-pay.onrender.com/webhook",
    ValidationURL: "https://tulipe-pay.onrender.com/webhook",
  };

  const response = await fetch(`${baseUrl}/mpesa/c2b/v1/registerurl`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log("✅ Safaricom Response:", result);
}

registerURLs().catch((error) => console.error("❌ Error registering URLs:", error));
