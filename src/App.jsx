import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Cart from "./components/Cart";
import "./App.css";
import Checkout from "./components/checkout";

function App() {
  // 1. Travel destination data
  const trips = [
    {
      id: 1,
      name: "Bali",
      country: "Indonesia",
      price: 11100,
      duration: "5 Days",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
      description: "Explore beautiful beaches..."
    },
    {
      id: 2,
      name: "Paris",
      country: "France",
      price: 45000,
      duration: "6 Days",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
      description: "Discover the city of love and its beauty."
    },
    {
      id: 3,
      name: "Maldives",
      country: "Maldives",
      price: 35000,
      duration: "4 Days",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
      description: "Enjoy crystal-clear water and luxury resorts."
    },
    {
      id: 4,
      name: "Switzerland",
      country: "Europe",
      price: 55000,
      duration: "7 Days",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600",
      description: "Experience mountains and amazing landscapes."
    },
    {
      id: 5,
      name: "Dubai",
      country: "UAE",
      price: 30000,
      duration: "4 Days",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
      description: "Enjoy shopping, adventure and modern architecture."
    },
    {
      id: 6,
      name: "Manali",
      country: "India",
      price: 15000,
      duration: "3 Days",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
      description: "Enjoy snowy mountains and peaceful nature."
    }
  ];

  const [cart, setCart] = useState([]);
  //add trip to cart
  const addToCart = (trip) => {
    const alreadyAdded = cart.find((item) => item.id === trip.id);

    if (!alreadyAdded) {
      setCart((prevCart) => [...prevCart, trip]);
    }
  };

  //remove the trip
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  //total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price, 0
  );

  return (
    <div className="app">

      <nav className="navbar">
        <h2>✈️ Travel Explorer</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="/#destinations">Destination</a>
          <Link to="/cart">
            My Trips ({cart.length})
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/*main section*/}
              <section className="hero" id="home">
                <h1>Explore The World 🌎</h1>
                <p>Discover beautiful destinations and plan
                  your next unforgettable adventure.</p>
                <a href="#destinations">Explore Trips ✈️</a>
              </section>

              {/*trips cards */}
              <section className="destinations" id="destinations">

                <h2>Popular Destinations</h2>
                <p>Choose Your Dream Destination!</p>

                <div className="trip-container">
                  {trips.map((trip) => (
                    <div className="trip-card" key={trip.id}>

                      <img src={trip.image} alt={trip.name} />
                      <div className="trip-info">
                        <h3>{trip.name}</h3>
                        <p>{trip.country}</p>
                        <p>{trip.description}</p>
                        <p>🗓️{trip.duration}</p>
                        <h3>₹{trip.price.toLocaleString("en-IN")}</h3>
                        <button onClick={() => addToCart(trip)}
                          disabled={cart.some((item) => item.id === trip.id)}>
                          {cart.some((item) => item.id === trip.id)
                            ? "Added ✓"
                            : "Add to Cart +"
                          }
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              totalPrice={totalPrice}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              totalPrice={totalPrice}
            />
          }
        />
      </Routes>

      <footer>
        <p>© 2026 Travel Explorer | Explore the world 🌍</p>
      </footer>
    </div>
  );
}
export default App;