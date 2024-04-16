import exp from 'constants';
import { NextFunction, Request, Response } from 'express';
import { Int32 } from 'mongodb';


const verify_add_product = (req:Request, res:Response, next: NextFunction ) =>{

    const {product_name, product_id, 
        product_price} = req.body;

    let errorField: number = 0;
    let errMessage : String = "";
    

    //lets validate product each thing!
    //1. product_name // cannot be special character, numbers , more than 10 characters long

    if(!containsOnlyAZ(product_name)){
      errorField =1
    errMessage = "product name is in_valid"
    }

    if(!parseInt(product_id)){
        errorField=2
        errMessage= "product id is in_valid"
    }

    if(!parseInt(product_price)){
        errMessage = "product price is in_valid"
        errorField = 3;
    }
    if(errorField >0){
        res.status(400).json({
            errorField: errorField,
            errMessage : errMessage
        })
    }else{

        next();
    }


}

function containsOnlyAZ(input: string): boolean {
    // This regular expression matches strings that have only a-z characters
    const regex = /^[a-z ]+$/;
    return regex.test(input);
  }
  

  export default verify_add_product;