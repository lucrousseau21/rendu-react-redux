import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Wishlist from "./components/Widhlist";
import { RootState } from "./store/store";

const App = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);



  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].quantity) {
      let t = cartItems[i].quantity || 0;
      total += t;
    }else{
      total += 1;
    }
  }



  return (
    <Router>
      <div className="w-full mx-auto">
        <nav className="flex justify-center">
          <Link className="m-3" to="/">Accueil</Link>
          <Link className="m-3" to="/cart">
            Panier
            {cartItems.length > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {total}
              </span>
            )}
          </Link>
          <Link className="m-3" to="/wishlist">
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                {wishlistItems.length}
              </span>
            )}
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;