"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getProRoute_1 = __importDefault(require("./getProRoute"));
const addProRoute_1 = __importDefault(require("./addProRoute"));
const getProductsFeature_1 = __importDefault(require("./getProductsFeature"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use('/v1/getAllPro', getProRoute_1.default);
app.use('/v1/author/addPro', addProRoute_1.default);
app.use('/v1/getproductsfeature', getProductsFeature_1.default);
exports.default = app;
