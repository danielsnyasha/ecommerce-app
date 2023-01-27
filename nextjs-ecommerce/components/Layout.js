import { Store } from '../utils/Store';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  //   const [cartItemsCount, setCartItemsCount] = useState(0);

  return (
    <>
      <div>
        <Head>
          <title>
            {title ? title + ' - Ecommerce Shop' : 'Ecommerce Shop'}
          </title>
          <meta name="description" content="Ecommerce Website" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex min-h-screen flex-col justify-between bg-white">
          <header>
            <nav className="flex h-12 justify-between shadow-md items-center px-4 bg-blue-50">
              <Link href="/">
                <p className="text-lg font-bold">Phoenix</p>
              </Link>
              <div className="flex flex-row">
                <Link href="/cart">
                  <p className="p-2">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </span>
                    )}
                  </p>
                </Link>
                <Link href="/login">
                  <p className="p-2">Login</p>
                </Link>
              </div>
            </nav>
          </header>

          <main className="container m-auto mt-4 px-4">{children}</main>

          <footer className="flex justify-center items-center h-8 shadow-inner bg-blue-100">
            <p>Copyright © 2022 Ecommerce</p>
          </footer>
        </div>
      </div>
    </>
  );
}
