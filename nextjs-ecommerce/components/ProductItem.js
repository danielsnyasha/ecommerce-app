/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function productItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <p>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </p>
      </Link>

      <div className="flex flex-col items-center justify-center">
        <Link href={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
