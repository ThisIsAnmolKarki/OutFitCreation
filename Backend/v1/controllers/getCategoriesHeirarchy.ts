import { Request, Response } from 'express';
import { QueryResult } from 'pg';
// Import the PostgreSQL connection pool from database.ts
import pool from '../models/connect';

type Category = {
    category_id: number;
    category_name: string;
    parent_id: number | null;
}

export type CategoryWithParent = {
    id: number;
    name: string;
    parent: CategoryWithParent | null;
}

const findParent = (categories: Category[], categoryId: number | null): CategoryWithParent | null => {
    if (categoryId === null) return null;
    const category = categories.find(c => c.category_id === categoryId);
    if (!category) return null;
    return {
        id: category.category_id,
        name: category.category_name,
        parent: findParent(categories, category.parent_id)  // Recursive call to find the parent's parent
    };
};

export const getCategoriesHeirarchy = async (id: number): Promise<CategoryWithParent | null> => {
    // Extract task details from the request body
    //(title, description, completed)
        try{    
            const response: QueryResult = await pool.query('SELECT * FROM categories');
            const categories: Category[] = response.rows as Category[];
            // console.log(categories[0].category_id);
            let i =0
            return findParent(categories, id)
        }
        catch(ex){
            console.log(ex);
            console.log("something went wrong on get categories heirarchy")
            return null;
        }
    }


export const getCategoryHeirarchy = async (id:number): Promise<CategoryWithParent | null> =>{
     return await getCategoriesHeirarchy(id) 
}
