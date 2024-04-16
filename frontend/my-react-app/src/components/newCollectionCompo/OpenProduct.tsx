import React from 'react';
import { useParams } from 'react-router-dom';

const OpenProduct: React.FC = () =>{
        const { productName } = useParams();

    return (
        <div>
            <h1>Product Name: {productName}</h1>
        </div>
    )
}

export default OpenProduct;