import { Request, Response } from 'express';
import { QueryResult } from 'pg';
// Import the PostgreSQL connection pool from database.ts
import pool from '../models/connect';

interface color {
    color_id: number,
    color: string
}

interface size {
    size_id:number,
    size: string
}

interface category{
    category_id: number,
    category_name: string
}

interface csc{
    color : color[],
    size: size[]
}




const getProductsFeature = async (req: Request, res: Response): Promise<Response> => {
    // Extract task details from the request body
    //(title, description, completed)

    try{

        const response1: QueryResult = await pool.query('SELECT * FROM COLOR;');

        let col: color[] = response1.rows;

        const response2: QueryResult = await pool.query("SELECT * FROM SIZE;");

        let size: size[] = response2.rows;

        let csc_data : csc =  {
            color: col,
            size: size
        }

        console.log(csc_data);

        return res.status(200).json(csc_data);



    }catch(err){
        console.log("problem in getProductsFeatures");
        return res.status(400).json("cannot select product features");
    }

    

}


export default getProductsFeature;