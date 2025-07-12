import { NextApiRequest, NextApiResponse } from "next";

const mockProperties = [
  {
    id: 1,
    name: "Sunset Villa",
    location: "Accra",
    price: "GHS 300/night",
    image: "https://via.placeholder.com/600x400",
    description: "A beautiful villa with ocean views.",
    amenities: ["Wi-Fi", "AC", "Pool"]
  },
  {
    id: 2,
    name: "Mountain Cabin",
    location: "Kumasi",
    price: "GHS 200/night",
    image: "https://via.placeholder.com/600x400",
    description: "Cozy cabin with mountain view.",
    amenities: ["Fireplace", "Hiking Trails", "Private Parking"]
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const property = mockProperties.find(p => p.id === Number(id));

  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }

  res.status(200).json(property);
}
