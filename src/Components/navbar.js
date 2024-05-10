import React, { useState, useEffect, useRef } from "react";
import Logo from "../Assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const submenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMenuClick = (menuName, event) => {
    event.preventDefault();
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const renderSubMenu = (menuName, subMenuOptions) => {
    if (activeMenu === menuName) {
      return (
        <div ref={submenuRef} className="absolute bg-gray-800 rounded-md shadow-lg">
          <div className="pt-2 w-48 h-fit">
            {subMenuOptions.map((option, index) => (
              <Link key={index} to={`/product/${option.toLowerCase().replace(/\s/g, '-')}`} className="block px-4 py-3 text-white hover:bg-gray-700">
                {option}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <img src={Logo} alt="Logo" className="h-8 mr-2" />
              <span className="text-white font-bold text-lg">Medical Inventory</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <a href="/" className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={(e) => handleMenuClick('home', e)}>
                  Home
                </a>
                
              </div>
              <div className="relative">
                <a href="/product" className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={(e) => handleMenuClick('product', e)}>
                  Products
                </a>
                {renderSubMenu('product', ['View Products', 'Add Product', 'Edit Product', 'Delete Product'])}
              </div>
              <div className="relative">
                <a href="/inventory" className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={(e) => handleMenuClick('inventory', e)}>
                  Inventory
                </a>
                {renderSubMenu('inventory', ['Check Inventory', 'Add Inventory', 'Update Inventory', 'Delete Inventory'])}
              </div>
              <div className="relative">
                <a href="/orders" className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={(e) => handleMenuClick('orders', e)}>
                  Orders
                </a>
                {renderSubMenu('orders', ['View Orders', 'Create Order', 'Edit Order', 'Delete Order'])}
              </div>
              <div className="relative">
                <a href="/suppliers" className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={(e) => handleMenuClick('suppliers', e)}>
                  Suppliers
                </a>
                {renderSubMenu('suppliers', ['View Suppliers', 'Add Supplier', 'Edit Supplier', 'Delete Supplier'])}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
