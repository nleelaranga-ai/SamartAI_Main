const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://samartai-dup.onrender.com";

export async function sendMessageToAI(message: string): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  return data.reply;
}
