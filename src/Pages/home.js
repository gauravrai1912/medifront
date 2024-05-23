import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import axios from 'axios';

function Home() {
    const [inventoryData, setInventoryData] = useState({
        totalUniqueProducts: 0,
        productsBelowQuantity: 0,
        productsExpiringWithinAWeek: 0
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await axios.get('http://localhost:8090/inventory/summary');
                setInventoryData(response.data);
                setMessage('');
            } catch (error) {
                console.error('Error fetching inventory data:', error);
                setMessage('Error fetching inventory data');
            }
        };

        fetchInventoryData();
    }, []);

    // Component to render the inventory summary card
    const InventorySummaryCard = ({ totalUniqueProducts, productsBelowQuantity, productsExpiringWithinAWeek }) => (
        <div className="bg-white rounded-md shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Inventory Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Total Unique Products</h3>
                    <p className="text-3xl font-bold">{totalUniqueProducts}</p>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Products Below Quantity (100)</h3>
                    <p className="text-3xl font-bold">{productsBelowQuantity}</p>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Products Expiring Within a Week</h3>
                    <p className="text-3xl font-bold">{productsExpiringWithinAWeek}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex justify-center">
                <div className="w-3/4">
                    <h1 className="text-3xl font-bold mb-4">Welcome to Our Medical Inventory Management System!</h1>
                    <p className="text-lg mb-4">
                        Welcome to our medical inventory management system. This system is designed to help healthcare facilities efficiently manage their inventory of medical supplies, equipment, and pharmaceuticals.
                    </p>
                    <p className="text-lg mb-4">
                        Whether you're a hospital, clinic, pharmacy, or other healthcare provider, our system provides comprehensive tools and features to streamline inventory management processes, track stock levels, manage orders, generate reports, and more.
                    </p>
                    <p className="text-lg mb-4">
                        Use the navigation menu on the left to access different sections of the system, including inventory management, orders, reports, and more. If you have any questions or need assistance, feel free to reach out to our support team.
                    </p>
                    {message && <p className="text-red-500">{message}</p>}
                    {/* Include the Inventory Summary Card */}
                    <InventorySummaryCard {...inventoryData} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
