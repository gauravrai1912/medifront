import React from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

function Home() {
    // Sample data for demonstration
    const inventoryData = {
        totalProducts: 1500,
        nearlyEmpty: 50,
        nearingExpiration: 20
    };

    // Component to render the inventory summary card
    const InventorySummaryCard = ({ totalProducts, nearlyEmpty, nearingExpiration }) => (
        <div className="bg-white rounded-md shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Inventory Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Total Products</h3>
                    <p className="text-3xl font-bold">{totalProducts}</p>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Nearly Empty</h3>
                    <p className="text-3xl font-bold">{nearlyEmpty}</p>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Nearing Expiration</h3>
                    <p className="text-3xl font-bold">{nearingExpiration}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div>
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
                    {/* Include the Inventory Summary Card */}
                    <InventorySummaryCard {...inventoryData} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
