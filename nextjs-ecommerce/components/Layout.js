import { Store } from '../utils/Store';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  //   const [cartItemsCount, setCartItemsCount] = useState(0);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

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

        <ToastContainer position="bottom-center" limit={1} />

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
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                        {cartItemsCount}
                      </span>
                    )}
                  </p>
                </Link>

                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-600">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <p
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </p>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <p className="p-2">Login</p>
                  </Link>
                )}
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
