import { NextApiRequest, NextApiResponse } from "next";

const reviewsDB = {
  1: [
    {
      id: 1,
      reviewer: "Joseph",
      rating: 5,
      comment: "Amazing stay with a great view!"
    },
    {
      id: 2,
      reviewer: "Ama",
      rating: 4,
      comment: "Very comfortable and quiet."
    }
  ],
  2: [
    {
      id: 3,
      reviewer: "Kwame",
      rating: 3,
      comment: "Nice place but could be cleaner."
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id }
  } = req;

  const reviews = reviewsDB[Number(id)] || [];
  res.status(200).json(reviews);
}
