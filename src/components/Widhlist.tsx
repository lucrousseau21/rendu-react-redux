import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
// import { removeFromWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import { toggleWishlist } from "../store/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Ma Wishlist
      </h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Votre wishlist est vide.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-2">Prix : {product.price} EUR</p>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {product.reviews.length} Avis
                </span>
                <span className="text-gray-500 text-sm">
                  Évaluation : {product.rating} / 5
                </span>
              </div>
              <Link
                to={`/products/${product.id}`}
                className="text-blue-500 underline hover:text-blue-700 mb-4 block"
              >
                Voir le produit
              </Link>
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              >
                Retirer de la wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;