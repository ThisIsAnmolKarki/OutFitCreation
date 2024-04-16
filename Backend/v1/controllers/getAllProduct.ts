import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { getCategoriesHeirarchy,CategoryWithParent } from './getCategoriesHeirarchy';
// Import the PostgreSQL connection pool from database.ts
import pool from '../models/connect';
import { Console } from 'console';


let getProductCategory = async(product_id:number): Promise<number>  =>{

  const response: QueryResult = await pool.query(`SELECT category_id FROM product_categories WHERE PRODUCT_ID = ${product_id}`);

  let categoryIds: number = -1;

  response.rows.map(pro =>{
    categoryIds = pro.category_id;
  })
  return categoryIds;

}


export const getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    // Extract task details from the request body
    //(title, description, completed)

      type Color = {
        color: number;
        stock: number;
      }

      type Measurement = {
        size: number;
        color: Color[];
      }

      type Product = {
        product_id: number;
        M_C: Measurement[];
        product_name: string;
        discount: number;
        description: string;
        price: number;
        is_new: boolean;
        categories: CategoryWithParent|null;
      }

      

    let products = new Map<number , Product>();

    
    try {

        const response1: QueryResult = await pool.query('SELECT * FROM PRODUCTS JOIN PRODUCT_AVAILABILITY ON PRODUCT_KEY = PRODUCT_ID ORDER BY PRODUCT_KEY ASC;');

        for (let pro of response1.rows) {
          let product_category : number = -1;
          await getProductCategory(pro.product_key).then(cate => {product_category = cate})
          let gch:CategoryWithParent|null = await getCategoriesHeirarchy(product_category);

          getProductCategory(1).then(catego => console.log(catego));
          if(products.has(pro.product_key)){

            let getPro:Product = products.get(pro.product_key) as Product;
          
            let i : number = 0;
            let flag: boolean = false;

            getPro?.M_C.map(mcd =>{
                if(pro.size_id == mcd.size){
                  
                  flag= true;
                  if (getPro) {
                      // console.log(getPro)
                      let mc:Measurement = mcd;
                      mc.color.push({
                          color: pro.color_id,
                          stock: pro.product_stock
                      })
                  }                          
                }
                i++;
            })  

            if(!flag &&getPro){
              let color: Color = {
                color: pro.color_id,
                stock:pro.product_stock
              }
              getPro.M_C.push({size:pro.size_id, color: [color] })
            }                  

            products.set(pro.product_key, getPro);

        }else{
  
            products.set(pro.product_key,{
            product_id: parseInt(pro.product_key),
        
            product_name: pro.product_name,
            discount: parseInt(pro.discount),
            description:"yellow",
            price: pro.product_price,
            is_new : pro.is_new,

            M_C:[{
              size:pro.size_id,
              color:[
                {
                  color:pro.color_id,
                  stock: pro.product_stock
                }
              ]
            }]
,
            categories:gch
          }) 

        }

        }
        const valuesArray = Array.from(products.values());
        console.log(valuesArray);

        return res.status(200).json(valuesArray); //--------------------->

      } catch (error) {
        // Handle errors, log them, and return an internal server error response
        console.error(error);
        return res.status(500).json('Internal Server error');
      }
  };