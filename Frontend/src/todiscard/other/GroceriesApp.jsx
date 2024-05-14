// Main GroceriesApp component, shows main interface

// first load sub-components
import LoggedBar from "./loggedBar"
import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
// now libraries needed
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import {jwtDecode} from "jwt-decode"
// import Cookies from "js-cookie";
import { getProducts, removeProduct } from "./utilities/dbFunctions";

export default function GroceriesApp() {

  const location=useLocation()    // to receive states from other componentes
  
  // const login = jwtDecode(Cookies.get("jwt-cookie")).id  // decodes cookie to get user id

  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState([])          // hook for products
  const [postResponse, setPostResponse] = useState("")  // hook for API responses

  useEffect(() => {
    getProducts().then((result)=>setProducts(result))
  }, [postResponse, location]);

  /// ---------------- CART FUNCTIONS, OUT OF FINAL PROJECT SCOPE ---------------
  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

  const handleEmptyCart = () => {
    setCartList([]);
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };
/// ------------------------ CART FUNCTIONS END HERE ---------------------------

  const handleProductDelete = async (product) => {    //  calls removeProduct in API and get's the result
    removeProduct(product)
      .then((result) => setPostResponse(<p>{result}</p>))
  }
  
  return (
    <>
      <LoggedBar /* login={login} */ />
      <div>
        <h1>Groceries App</h1>
        <Link to="/addProduct" ><button>Add Product</button></Link>
        {postResponse}
        <div className="GroceriesApp-Container">
          <InventoryCard
            list={products}
            onClick={handleAddToCart}
            handleProductDelete={handleProductDelete}
          />
          <CartList
            cartList={cartList}
            onClickEmpty={handleEmptyCart}
            onClickRemove={handleRemoveItem}
          />
        </div>
      </div>
    </>
  );
}

