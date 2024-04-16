import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getProductsAsync,Product } from "../store/allProducts";
import EachProduct from "../components/newCollectionCompo/eachProduct";
import "../styles/allProducts.css";
import Sorting from "../components/sorting/Sorting";

const allProducts = () => {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const product = useSelector((state:RootState) => state.product.products)

  const dispatch = useDispatch <AppDispatch>();

    useEffect(() => {
        dispatch(getProductsAsync())
      },[]);

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
    

  return (
    <>

        <Sorting />

        <div className="app-container">
            <button className="hamburger-button" onClick={toggleSidebar}>
                {/* Hamburger Icon */}
                <span className="hamburger-icon">&equiv;</span>
            </button>
            <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <h2>Categories</h2>
                {/* Add category links */}
                <a href="">Tshirt</a>
                <br />
                <a href="">shirt</a>
            </aside>
            <div className="products-grid">
                {product.map((product: Product) => (
                    <EachProduct 
                        key={product.product_id}
                        product_id={product.product_id}
                        product_name= {product.product_name}
                        discount={product.discount}
                        price={product.price}
                        sold_out = {true}
                        M_C = {product.M_C}
                        category = {product.category}
                    />
                ))}
            </div>
        </div>
        
    </>
  );
};

export default allProducts;
