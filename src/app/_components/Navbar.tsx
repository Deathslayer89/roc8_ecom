
import Link from 'next/link';
import React from 'react';
import { FaHome, FaTag, FaPercent, FaBoxOpen, FaFireAlt, FaQuestionCircle, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const Items = () => {
  const values = [
    { label: 'Categories', icon: <FaHome /> },
    { label: 'Sale', icon: <FaTag /> },
    { label: 'Clearance', icon: <FaPercent /> },
    { label: 'New Stock', icon: <FaBoxOpen /> },
    { label: 'Trending', icon: <FaFireAlt /> },
  ];

  return (
    <div className="flex space-x-6 justify-items-center">
      {values.map((item) => (
        <div key={item.label} className="flex items-center space-x-1">
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Personal = () => {
  const values = [
    { label: 'Help', icon: <FaQuestionCircle /> },
    { label: 'Orders & Returns', icon: <FaShoppingCart /> },
    { label: 'Hi, John', icon: <FaUser /> },
  ];

  return (
    <div className="flex space-x-4">
      {values.map((item) => (
        <div key={item.label} className="flex items-center space-x-1">
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href='/' >
            <div className="text-xl font-bold">ECOMMERCE</div>
          </Link>
          <Items />
          <div className="flex flex-col items-end justify-start space-x-4">
            <Personal />
            <div className="flex justify-items-end space-x-3">
              <span>
                <FaSearch />
              </span>
              <span>
                <FaShoppingCart />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 text-center py-2 flex justify-center">
        <span>Get 10% off on business sign up</span>
      </div>
    </div>
  );
};

export default Navbar;