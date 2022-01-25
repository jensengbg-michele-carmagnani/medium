import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
const Header = () => {
  const { data: session } = useSession();
  console.log(`header ----${session?.user?.name}  `);
  return (
    <header className="flex justify-between p-5 max-w-7xl ">
      <div className="flex items-center  space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt=""
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contanct</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600 ">
        {!session ? (
          <Link href="/login">
            <h3 className="cursor-pointer hover:text-black">Sign In</h3>
          </Link>
        ) : (
          <button onClick={() => signOut()}>
            <h3 className="cursor-pointer hover:text-red-800">Sign Out</h3>
          </button>
        )}
        {!session ? <h3 className="border px-4 py-1 rounded-full border-green-600 cursor-pointer hover:bg-green-600 hover:text-white ">
          Get Started
        </h3>: session?.user?.name}
      </div>
    </header>
  );
};

export default Header;
