import React, { useEffect } from 'react';
import {Color,Measurement,CategoryWithParent} from '../../store/allProducts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProductsFeatures } from '../../store/csc';

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
    let color_set = new Set<number>();

    props.M_C.forEach(e=>{
        e.color.forEach(f=>{ 
            let curCulsize = {color :f.color, stock :f.stock}   
            color_stock.push(curCulsize);
        })
    })

    color_stock.map(colStock =>{
        color_set.add(colStock.color);
    })

    type ColorMap = {
        [key: number]: string;
    };

    type Size_color = {
        [size_id: number]: Color[];
    }

    // it will be used in entering inside product  
    const sizeColorHashMap = props.M_C.reduce((acc, current) => {
        const size: number = Number(current.size); // Ensure 'size' is a number
        if (!acc[size]) {
            acc[size] = []; // Initialize if not already present
        }
    
        const colors: Color[] = current.color.reduce<Color[]>((ac, cur) => {
            ac.push({ color: cur.color, stock: cur.stock });
            return ac;
        }, []);
    
        acc[size].push(...colors);
        return acc;
    }, {} as Size_color);


    const csc = useSelector((state:RootState) => state.colorSizeCategory.state)

    const dispatch = useDispatch <AppDispatch>();
        useEffect(() => {
            dispatch(getProductsFeatures())
        },[]);

        
    const colorHashMap: ColorMap = csc.color.reduce((acc, current) => {
        acc[current.color_id] = current.color;
        return acc;
    }, {} as ColorMap);


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
                Array.from(color_set).map(colStock =>{
                    return <div>
                        
                        <p>{colorHashMap[colStock]}</p>
                        {/* <p>{colStock.stock}</p> */}
                    </div>
                })
            }

          </div>
        </>
    )
}


export default eachProduct;


