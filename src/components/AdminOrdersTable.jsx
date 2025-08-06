import React, { useEffect, useState } from 'react';

const AdminOrdersTable = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error('Failed to load orders:', err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All Orders</h2>
            <table className="w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Address</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Total</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="p-2 border">{order.id}</td>
                            <td className="p-2 border">{order.name}</td>
                            <td className="p-2 border">{order.address}</td>
                            <td className="p-2 border">{order.phone}</td>
                            <td className="p-2 border">{order.total} DT</td>
                            <td className="p-2 border">{order.status}</td>
                            <td className="p-2 border">{new Date(order.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrdersTable;
