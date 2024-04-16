import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


interface color {
    color_id: number,
    color_name: string
}

interface size {
    size_id:number,
    size_name: string
}

interface category{
    category_id: number,
    category_name: string
}

interface csc{
    color : color[],
    size: size[]
}



const state: csc = {
    color: [],
    size: []
}


const cscSlice = createSlice({
    name:"csc",
    initialState:{
    ...state,
    loading: false,
    error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getProductsFeatures.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getProductsFeatures.fulfilled, (state, action: PayloadAction<csc>) => {
            state.color =  action.payload.color;
            state.size = action.payload.size;  
            state.loading = false;
        })
        // .addCase(getProductsAsync.rejected, (state, action) => {
        //     // state.error = action.error.message;
        //     // state.loading = false;
        // });
    }
})

export const getProductsFeatures = createAsyncThunk<csc>(
    "getProductsFeatuers/featuresAsync",
    async () => {
        try{
            const response = await axios.get("http://localhost:5005/v1/getAllPro/get");
            
            return response.data; // Assuming this is Product[]

        } catch(error){
            console.log("unable to extract features of product");
            return error;
        }
    }
);

export default cscSlice.reducer;