import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="flex justify-between p-5 max-w-7xl max-auto">
        <Link href="/post">
          <img
            className="w-44 object cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt=""
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
            <h3>About</h3>
            <h3>Contanct</h3>
            <h3 className='text-white bg-green-600'>Follow</h3>
        </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className='border px-4 py-1 rounded-full border-green-600'>Get Started</h3>
        
      </div>
      </div>
    </header>
  );
};

export default Header;
