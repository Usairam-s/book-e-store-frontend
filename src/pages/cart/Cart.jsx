import { useDispatch, useSelector } from "react-redux";
import { getImgUrl } from "../../utils/getImgUrl";
import { loadStripe } from "@stripe/stripe-js"; // Add this import statement

import { emptyCart, removeFromCart } from "../../store/features/Cart/cart";
import { useState } from "react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    try {
      if (!email) {
        alert("Please enter your email");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            email: email,
          }), // Removed client-side subtotal calculation
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const session = await response.json();

      if (session.id) {
        const stripe = await loadStripe(
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error("Stripe redirect error:", error);
          alert("Checkout failed: " + error.message);
        }
      } else {
        throw new Error("Invalid session response from server");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed: " + error.message);
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.newPrice, 0);

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleEmpty = () => {
    dispatch(emptyCart());
  };

  return (
    <div className="max-w-3xl mt-10 border mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Clear Cart Button */}
      {cartItems.length === 0 ? (
        <p className="w-full text-center p-2 mt-2 text-gray-500">
          Cart is Empty...
        </p>
      ) : (
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => handleEmpty()}
          >
            Clear Cart
          </button>
        </div>
      )}
      {/* Cart Items List */}
      {cartItems.map((item) => (
        <div key={item.id} className="border-b border-gray-200 py-4">
          <div className="flex justify-between items-center">
            {/* Left Side - Image and Title */}
            <div className="flex items-center space-x-4">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <h3 className="text-lg font-medium">{item.title}</h3>
            </div>

            {/* Right Side - Price and Remove Button */}
            <div className="text-right">
              <p className="text-lg font-semibold">${item?.newPrice}</p>
              <button
                className="mt-2 text-red-500 hover:text-red-600 text-sm"
                onClick={() => handleRemove(item)}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Subtotal Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Subtotal:</span>
          <span className="text-xl font-bold">
            ${subtotal ? subtotal.toFixed(2) : 0}
          </span>
        </div>
      </div>

      <div className="w-full mt-6 flex flex-col gap-4">
        <input
          type="email"
          className="w-full p-2 rounded-lg shadow-md"
          placeholder="Please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          onClick={() => handleCheckout()}
          className="w-full bg-primary text-black px-4 py-2 "
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
