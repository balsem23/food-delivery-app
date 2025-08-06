import { useEffect, useState } from "react";
import axios from "axios";
import { initializeEcho } from "../echo"; // 👈 make sure this path is correct

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = () => {
    axios.get("http://127.0.0.1:8000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders", err));
  };

  useEffect(() => {
    fetchOrders();

    const echo = initializeEcho(); // 👈 Echo instance from echo.js

    echo.channel('orders')
      .listen('.new-order', (e) => {
        console.log('📡 New order received via WebSocket:', e.order);
        setOrders(prev => [e.order, ...prev]); // insert new order at the top
      });

    return () => {
      echo.leave('orders');
    };
  }, []);

  // Update status of an order
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/orders/${id}/status`, { status });
      alert("✅ Status updated!");
      fetchOrders();
    } catch (err) {
      alert("❌ Failed to update status");
    }
  };

  // Delete an order
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/orders/${id}`);
      alert("🗑️ Order deleted");
      fetchOrders();
    } catch (err) {
      alert("❌ Failed to delete order");
    }
  };

  // Logout admin
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>📦 Admin Dashboard — Orders</h1>
        <button onClick={handleLogout} style={{ backgroundColor: "#ccc", padding: "6px 12px" }}>
          🚪 Logout
        </button>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: 20, width: "100%", fontSize: "14px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>
                <ul style={{ paddingLeft: 16 }}>
                  {Array.isArray(order.items) &&
                    order.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={`http://127.0.0.1:8000${item.img}`}
                          alt={item.name}
                          width="40"
                          style={{ marginRight: 8 }}
                        />
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                </ul>
              </td>
              <td>{order.total} DT</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => deleteOrder(order.id)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px'
                  }}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
