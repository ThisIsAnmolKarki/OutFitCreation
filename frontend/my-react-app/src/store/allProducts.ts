import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

  type Color = {
    color: number;
    stock: number;
  }

  type Measurement = {
    size: number;
    color: Color[];
  }

  type CategoryWithParent = {
    id: number;
    name: string;
    parent: CategoryWithParent | null;
  }

  type Product = {
    product_id: number;
    M_C: Measurement[];
    product_name: string;
    discount: number;
    description: string;
    price: number;
    is_new: boolean;
    category: CategoryWithParent|null;
  }

 
   type allProductState = {
        products : Product[]
   }


    const state : allProductState = {
        products:[
            
        ]
        // count : "1"
    }

const productSlice = createSlice({
    name:"products",
    initialState:{
    ...state,
    loading: false,
    error: null
    },
    reducers:{},

    extraReducers: (builder) => {
        builder.addCase(getProductsAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
            // Assuming action.payload is Product[], replace the existing products array with the new one
            state.products =  action.payload // Replace, or use .push() for appending
        });
    }
})

export const getProductsAsync = createAsyncThunk<Product[]>(
    "getAllProducts/productAsync",
    async () => {
        try{
            const response = await axios.get("http://localhost:5005/v1/getAllPro/get");
            
            return response.data; // Assuming this is Product[]
        }
        catch(error){
            console.log("unable to get all products");
            return error;
        }
    }
);

export default productSlice.reducer;
export type {Product,Color,Measurement,CategoryWithParent};