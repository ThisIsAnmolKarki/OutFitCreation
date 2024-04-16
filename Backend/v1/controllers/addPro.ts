import { Request, Response } from 'express';
import { QueryResult } from 'pg';
// Import the PostgreSQL connection pool from database.ts
import pool from '../models/connect';


 const addProduct = async (req: Request, res: Response): Promise<Response> => {
    // Extract task details from the request body
    //(title, description, completed)
    const {product_name, product_id, 
        product_price, is_new,
        size, color, product_description, discount,product_stock} = req.body;

    try {
        // Execute a PostgreSQL query to select all tasks
        await pool.query("INSERT INTO products (product_key, product_name, product_price, is_new) VALUES ($1,$2,$3,$4)", 
        [ product_id, product_name, product_price,is_new]);

        await pool.query("INSERT INTO product_availability (product_id, size_id, color_id, product_stock,discount) VALUES ($1, $2, $3,$4,$5)",
        [product_id, size,color,product_stock,discount])

        return res.status(201).json({
            // product Created successfully
            message: 'product created successfully',
            task: {
                product_id,product_name, product_price,is_new,size,color,product_stock,discount,product_description
            }
          });
      } catch (error) {
        // Handle errors, log them, and return an internal server error response
        console.error(error);
        return res.status(500).json('Internal Server error');
      }
    
  };

  export default addProduct;