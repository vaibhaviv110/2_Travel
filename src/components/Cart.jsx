
import { useNavigate } from "react-router-dom";

function Cart({ cart, removeFromCart, totalPrice }) {

    const navigate = useNavigate();

    return (
        <section className="cart-section">
            <h2>🛒 My Travel Cart</h2>

            {cart.length === 0 ? (
                <p className="empty-cart">
                    Your cart is empty. Select your favourite trips! ✈️
                </p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.name} />

                            <div className="cart-info">
                                <h3>{item.name}</h3>
                                <p>{item.country}</p>
                                <p>{item.duration}</p>
                            </div>

                            <h3>
                                ₹{item.price.toLocaleString("en-IN")}
                            </h3>

                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove ✕
                            </button>
                        </div>
                    ))}

                    <div className="cart-total">
                        <h3>
                            Total: ₹{totalPrice.toLocaleString("en-IN")}
                        </h3>

                        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                            Proceed to Checkout →
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default Cart;
