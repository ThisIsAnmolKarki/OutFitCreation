import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IProduct{
    productId : number
    product_size: number
    product_quantity: number
    product_color: number
}

type CartState = {
    products: IProduct[]
}

const initialState : CartState = {
    products:[
    {
        productId : 54,
        product_size: 5,
        product_quantity:2,
        product_color: 2
    }
    ]
    // count : "1"
}

const cartSlice = createSlice({ // so internally we cannot directly change data of initial state in redux
    //so we need to make copy of the data and add something to it and replace data 
    // but react toolkit will automatically do it for us do not need to worry
    name:"cart",
    initialState,
    reducers:{
        add:(state,
            action: PayloadAction<{
                productId : number
                product_size: number
                product_quantity: number
                product_color: number}>
            ) =>{
            state.products.concat(action.payload)
            // state.count. action.payload 
        },

        remove:(state,
             action: PayloadAction<{ProductId: number}>) =>{
                // delete from the state
             }
    }

})


export const{add} = cartSlice.actions;

export default cartSlice.reducer




// type DispatchType = (args: CartAction) => CartAction


