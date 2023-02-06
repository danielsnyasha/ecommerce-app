import Layout from '../components/Layout';
import React from 'react';
import Link from 'next/link';

export default function LoginScreen() {
  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen">
        <h1 className="mb-4 text">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" className="w-full" id="email" autoFocus></input>
        </div>
        <div className="mb-4">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autofocus
          ></input>
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
