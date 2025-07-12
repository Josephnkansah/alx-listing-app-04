import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const booking = req.body;

    // You can add basic validation here
    if (!booking.firstName || !booking.email || !booking.cardNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // In a real app, you would save to a database
    console.log("Booking received:", booking);

    return res.status(200).json({ message: "Booking successful" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
