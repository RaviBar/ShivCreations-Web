export default async function handler(req, res) {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        headers: {
          apikey: ANON_KEY,
        },
      });
  
      if (response.ok) {
        res.status(200).json({ message: "Keep-alive request successful" });
      } else {
        throw new Error("Failed to send keep-alive request");
      }
    } catch (error) {
      console.error("Error sending keep-alive request:", error);
      res.status(500).json({ error: "Failed to send keep-alive request" });
    }
  }