import express from "express";
import getProRoute from "./getProRoute" ;
import addProRoute from "./addProRoute" ;

const app = express();

app.disable("x-powered-by");

app.use('/v1/getAllPro',getProRoute);
app.use('/v1/author/addPro',addProRoute);


export default app;