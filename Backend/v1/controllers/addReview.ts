import { Request, Response } from 'express';
import { QueryResult } from 'pg';
// Import the PostgreSQL connection pool from database.ts
import pool from '../models/connect';



const addReview = async (req: Request, res: Response): Promise<Response> => {
    // Extract task details from the request body
    //(title, description, completed)
    const {customer_name,  } = req.body;


        

        return res.status(400);

    }