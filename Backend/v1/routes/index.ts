import express from "express";
import getProRoute from "./getProRoute" ;
import addProRoute from "./addProRoute" ;
import getProductFeature from "./getProductsFeature";

const app = express();

app.disable("x-powered-by");

app.use('/v1/getAllPro',getProRoute);
app.use('/v1/author/addPro',addProRoute);
app.use('/v1/getproductsfeature',getProductFeature);


export default app;