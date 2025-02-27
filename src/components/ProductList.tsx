import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState, useEffect } from "react";
import { fetchProducts, Product, setPage } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

import { toggleWishlist } from "../store/wishlistSlice";


import { setProducts } from "../store/productSlice";

const ProductList = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { items, isLoading, currentPage, total } = useSelector(
    (state: RootState) => state.products
  );

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const searchTerm = useSelector((state: RootState) => state.products.searchTerm);
  const products = useSelector((state: RootState) => state.products.items);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (error) {
        console.error("Erreur lors de la recherche des produits:", error);
      }
    } else {
      dispatch(fetchProducts(currentPage || 1));
    }
  };
  // console.log(items.length);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, dispatch, currentPage]);

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (product: Product) => {
    dispatch(toggleWishlist(product));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    dispatch(fetchProducts(currentPage || 1));
  }, [dispatch, currentPage]);

  if (isLoading)
    return <p className="text-center text-gray-500 mt-8">Chargement...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Liste des Produits
      </h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher un produit"
        className="border border-gray-300 p-2 rounded-lg w-1/2 mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* {items.map((product: Product) => ( */}
        {filteredProducts.map((product) => (
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
              onClick={() => dispatch(addToCart(product))}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              Ajouter au panier
            </button>
            <button
              onClick={() => handleToggleWishlist(product)}
              className="mt-4"
            >
              {isInWishlist(product.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-red-500 w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.998 21.35l-1.448-1.32C5.4 15.368 2 12.273 2 8.497 2 5.421 4.42 3 7.497 3c1.74 0 3.409.81 4.501 2.09C13.093 3.81 14.762 3 16.502 3 19.58 3 22 5.421 22 8.497c0 3.776-3.4 6.871-8.55 11.534l-1.452 1.319z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className="text-gray-500 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 
                    7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <div className="px-2 gap-2 flex flex-wrap justify-center">
          {Array.from({ length: Math.ceil(total! / 15) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => dispatch(setPage(i + 1))}
              className={`px-4 py-2 m-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage * 15 >= total!}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;