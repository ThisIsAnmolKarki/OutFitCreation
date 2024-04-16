import React, { useState } from 'react';
import {Product,Color,Measurement,CategoryWithParent} from '../../store/allProducts';

interface props {
    product_id: number ,
    product_name: string,
    sold_out:boolean,
    price: number,
    discount:number,
    M_C: Measurement[],
    category: CategoryWithParent | null
}

const discount = (prevPrice: number, discount:number) : number =>{
    return prevPrice-(discount/100)*prevPrice;
}


const eachProduct: React.FC<props> = (props) =>{

    let color_stock: Color[] = []
    props.M_C.forEach(mc =>{
        mc.color.forEach(colStock =>{
            color_stock.push(colStock);
        })
    })


    return (
        <>
        <div key={props.product_id} className={`product ${false ? 'sold-out' : ''}`}>
            <img  src = {"https://lp2.hm.com/hmgoepprod?set=source[/0e/2e/0e2e3d97cbfde59122c80a0eb360329d27e68897.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]"} alt={props.product_name} />
            {false && <span className="status-label">Sold Out</span>}
            <h3>{props.product_name}</h3>
            
            <p className="price">
              <span className="original-price">Rs {props.price}</span>
              <span className="discounted-price">Rs {discount(props.price,props.discount)}</span>
            </p>

            {
                props.M_C.map(mc =>{
                    return <div>
                        <p>{mc.size}</p>
                        
                    </div>                    
                })
            }


            {
                color_stock.map(colStock =>{
                    return <div>
                        <p>{colStock.color}</p>
                        {/* <p>{colStock.stock}</p> */}
                    </div>
                })
            }

          </div>
        </>
    )
}


export default eachProduct;


