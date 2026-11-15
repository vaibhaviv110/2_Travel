
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, totalPrice }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    travellers: "1",
  });

  const [bookingDone, setBookingDone] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingDone(true);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty!</h2>
        <button onClick={() => navigate("/")}>
          Explore Destinations
        </button>
      </div>
    );
  }

  if (bookingDone) {
    return (
      <div className="success-page">
        <div className="success-card">
          <h1>🎉 Booking Successful!</h1>
          <h2>Thank You, {formData.name}!</h2>
          <p>Your trip booking has been confirmed.</p>
          <p>Total Amount: ₹{totalPrice.toLocaleString("en-IN")}</p>

          <button onClick={() => navigate("/")}>
            Explore More Trips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>✈️ Complete Your Booking</h1>

      <div className="checkout-container">

        <div className="checkout-form">
          <h2>Traveller Details</h2>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Travel Date</label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label>Number of Travellers</label>
            <select
              name="travellers"
              value={formData.travellers}
              onChange={handleChange}
            >
              <option value="1">1 Traveller</option>
              <option value="2">2 Travellers</option>
              <option value="3">3 Travellers</option>
              <option value="4">4 Travellers</option>
              <option value="5">5 Travellers</option>
            </select>

            <button type="submit" className="confirm-btn">
              Confirm Booking →
            </button>
          </form>
        </div>

        <div className="booking-summary">
          <h2>Booking Summary</h2>

          {cart.map((trip) => (
            <div className="summary-trip" key={trip.id}>
              <img src={trip.image} alt={trip.name} />
              <div>
                <h3>{trip.name}</h3>
                <p>{trip.country}</p>
                <p>{trip.duration}</p>
                <strong>
                  ₹{trip.price.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <h3>Total Amount</h3>
            <h2>₹{totalPrice.toLocaleString("en-IN")}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;
