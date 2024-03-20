import React from 'react';

const Items = () => {
  const values = ['Categories', 'Sale', 'Clearance', 'New Stock']
  return (
    <div className='flex space-x-3'>
      {values.map((item) => (
        <div key={item}>
          {item}
        </div>
      ))}
    </div>
  );
};

const Personal = () => {
  const values = ['Help', 'Orders & Returns', 'Hi, John']

  return (
    <div className='flex space-x-4'>
      {
        values.map((item) => (
          <div key={item}>{item}</div>
        ))
      }
    </div>
  )
}
const Navbar = () => {
  return (
    <div className='flex flex-col h-20'>
      <div className='flex-grow'>
        <div className="grid grid-flow-col justify-between items-center justify-items-stretch">
          <div>ECOMMERCE</div>
          <Items />
          <div className='flex flex-col justify-end'>
            <Personal />
            <div>symbols</div>
          </div>
        </div>
      </div>
      <div className='text-center h-5 bg-gray-400'>
        Get 10% off on business sign up
      </div>
    </div>
  );
};

export default Navbar;
