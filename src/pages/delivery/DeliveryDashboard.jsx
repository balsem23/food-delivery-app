import { useEffect, useState } from "react";
import axios from "axios";
import { initializeEcho } from "../../echo";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("deliveryToken");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const assignedOrders = res.data.filter(
        (order) => order.status === "assigned"
      );

      setOrders(assignedOrders);
    } catch (err) {
      setError(
        "Failed to fetch orders: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
  fetchOrders();

  const echo = initializeEcho(token);

  console.log("🟢 Subscribing to channel: orders");

  echo.channel("orders")
    .listen(".new-order", (e) => {
      console.log("📦 New order received via WebSocket:", e.order);

      if (e.order.status === "assigned") {
        setOrders((prev) => [e.order, ...prev]);
      }
    });

  return () => {
    echo.leave("orders");
  };
}, []);


  const markAsDelivered = async (orderId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/orders/${orderId}/status`,
        { status: "delivered" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      setError(
        "Failed to update order: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Delivery Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orders.length === 0 ? (
        <p>No assigned orders.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {orders.map((order) => {
            const items =
              typeof order.items === "string"
                ? JSON.parse(order.items)
                : order.items;

            return (
              <li
                key={order.id}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <strong>Order ID:</strong> {order.id}
                </div>
                <div>
                  <strong>Customer:</strong> {order.name}
                </div>
                <div>
                  <strong>Items:</strong>
                  <ul>
                    {items.map((item, i) => (
                      <li key={i}>
                        {item.name} — {item.quantity} × {item.price} dt
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Status:</strong> {order.status}
                </div>
                <button
                  onClick={() => markAsDelivered(order.id)}
                  style={{ marginTop: "10px", padding: "6px 12px" }}
                >
                  ✅ Mark as Delivered
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
