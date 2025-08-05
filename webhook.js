import fetch from "node-fetch";

export default async (req, res) => {
  console.log("📥 Incoming M-Pesa webhook:", req.body);

  try {
    const forward = await fetch(process.env.BASE44_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const result = await forward.text();
    console.log("✅ Forwarded to Base44:", result);
    res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Failed to forward:", err);
    res.status(500).send("Error");
  }
};
