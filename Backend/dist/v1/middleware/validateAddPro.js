"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verify_add_product = (req, res, next) => {
    const { product_name, product_id, product_price } = req.body;
    let errorField = 0;
    let errMessage = "";
    //lets validate product each thing!
    //1. product_name // cannot be special character, numbers , more than 10 characters long
    if (!containsOnlyAZ(product_name)) {
        errorField = 1;
        errMessage = "product name is in_valid";
    }
    if (!parseInt(product_id)) {
        errorField = 2;
        errMessage = "product id is in_valid";
    }
    if (!parseInt(product_price)) {
        errMessage = "product price is in_valid";
        errorField = 3;
    }
    if (errorField > 0) {
        res.status(400).json({
            errorField: errorField,
            errMessage: errMessage
        });
    }
    else {
        next();
    }
};
function containsOnlyAZ(input) {
    // This regular expression matches strings that have only a-z characters
    const regex = /^[a-z ]+$/;
    return regex.test(input);
}
exports.default = verify_add_product;
