import React, { useEffect } from 'react';
import '../../styles/newCollection.css'; // Make sure to import the CSS file
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getProductsAsync,Product } from '../../store/allProducts';
import EachProduct from './eachProduct';



const product = () => {

  const product = useSelector((state:RootState) => state.product.products)

  const dispatch = useDispatch <AppDispatch>();

    useEffect(() => {
        dispatch(getProductsAsync())
      },[]);

  return (
    
    <div className="new-collection">
      <h2>New Collection</h2>
      <div className="product-grid">
        {product.map((product: Product) => (
          <Link to = {`/product/${product.product_name}`}>
            {/* <EachProduct 
            key={product.product_id}
            product_id={product.product_id}
            product_name= {product.product_name}
            discount={product.discount}
            price={product.price}
            sold_out = {true}
              /> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default product;
export {product}
