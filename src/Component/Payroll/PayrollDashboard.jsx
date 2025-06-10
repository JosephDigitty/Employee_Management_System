import React from 'react';
import { Link } from 'react-router-dom';

const PayrollDashboard = () => {
  const cards = [
    {
      title: 'Generate Payrolls',
      link: '/payrolls/generate',
      bg: 'bg-blue-500',
    },
    {
      title: 'View Payrolls',
      link: '/payrolls/view',
      bg: 'bg-green-500',
    },
    {
      title: 'Temporary Salary Modifiers',
      link: '/admin-dashboard/payrolls/modifiers/temporary',
      bg: 'bg-yellow-500',
    },
    {
      title: 'Permanent Salary Modifiers',
      link: '/payrolls/modifiers/permanent',
      bg: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Payroll Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`p-6 rounded-xl shadow-md text-white font-semibold text-lg hover:scale-105 transform transition duration-200 ${card.bg}`}
          >
            {card.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PayrollDashboard;
