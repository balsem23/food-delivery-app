import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    phone: '',
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price),
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          address: formData.address,
          phone: formData.phone,
          items: cartItems,
          total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Backend error:', errorData);
        alert('Something went wrong:\n' + (errorData.message || 'Unexpected error'));
        return;
      }

      const result = await response.json();
      console.log('✅ Order submitted:', result);

      setSubmitted(true);
      clearCart();
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('❌ Could not connect to backend.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">🛒 Your Order</h1>

      {submitted ? (
        <div className="bg-green-700 bg-opacity-20 text-green-300 p-5 rounded text-lg">
          ✅ Order placed successfully! Thank you, {formData.customer_name}.
        </div>
      ) : showForm ? (
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 rounded-xl shadow-md space-y-5">
          <h2 className="text-2xl font-semibold text-yellow-300">Delivery Information</h2>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="customer_name"
              required
              value={formData.customer_name}
              onChange={handleChange}
              className="w-full p-3 bg-[#2a2a2a] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 bg-[#2a2a2a] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-[#2a2a2a] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold transition"
          >
            ✅ Place Order
          </button>
        </form>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#1f1f1f] p-4 rounded-md border border-gray-700"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  ✖ Remove
                </button>
              </div>
            ))}
          </div>

          <div className="text-2xl font-bold mt-6 text-yellow-300">
            Total: {total.toFixed(2)}TND
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold transition"
          >
            ✅ Confirm Order
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
