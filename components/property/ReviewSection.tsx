import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
}

interface Props {
  propertyId: number;
}

const ReviewSection = ({ propertyId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) fetchReviews();
  }, [propertyId]);

  if (loading) return <p className="text-gray-500">Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (reviews.length === 0) return <p className="text-gray-400">No reviews yet.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Guest Reviews</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-gray-200 pb-3 mb-3"
        >
          <p className="font-semibold">{review.reviewer}</p>
          <p className="text-sm text-yellow-500">Rating: {review.rating} / 5</p>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
