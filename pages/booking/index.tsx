import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Simple validation (optional enhancement)
    if (!formData.firstName || !formData.email || !formData.cardNumber) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/bookings", formData);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Booking Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "email", label: "Email" },
          { name: "phoneNumber", label: "Phone Number" },
          { name: "cardNumber", label: "Card Number" },
          { name: "expirationDate", label: "Expiration Date" },
          { name: "cvv", label: "CVV" },
          { name: "billingAddress", label: "Billing Address" },
        ].map(({ name, label }) => (
          <input
            key={name}
            name={name}
            placeholder={label}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {success && <p className="text-green-600">Booking confirmed!</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
