import { AppDispatch, RootState } from '../../store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getProductsAsync,Product} from "../../store/allProducts";

interface IProduct{
    productId : number
}

const CartProducts: React.FC = () =>{


const cartPro = useSelector((state: RootState) => state.cart.products)
const products = useSelector ((state: RootState) => state.product.products)


// product.find(1);

// product.map(p=>{

// })









// const dispatch = useDispatch();


    return (
        <>
            {

                // console.log(cartPro)
                
                  cartPro.map((product: IProduct) =>(
                    products.map((prod: Product) =>(
                        product.productId == prod.product_id ? <h1>{prod.product_name}</h1> : null
                    ))
                ))

                
            }

        </>
    )
}

export default CartProducts;