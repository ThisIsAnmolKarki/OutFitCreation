import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getProductsAsync } from "../../store/allProducts";

const ColorComponent = () => {

  const product = useSelector((state:RootState) => state.product.products)

  const dispatch = useDispatch <AppDispatch>();

    useEffect(() => {
        dispatch(getProductsAsync())
      },[]);


    return (
      <div className="filter color-filter">
        <label>COLOR</label>
        <select>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>
    );
  };
  
  export default ColorComponent;
  