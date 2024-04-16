import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import {getProductsFeatures} from "../../store/csc"

interface props{
     getColor: (data:number)=> void 
}
const ColorComponent: React.FC<props> = (props) => {

  const color = useSelector((state:RootState) => state.colorSizeCategory.state.color)
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColorId = event.target.value;

    props.getColor(Number(selectedColorId));
  };

  const dispatch = useDispatch <AppDispatch>();

    useEffect(() => {
        dispatch(getProductsFeatures())
      },[]);

    return (
      <div className="filter color-filter">
        <label>COLOR</label>
        <select onChange={handleSelectChange}>
          {
            color.map(col =>{
                return <option key={col.color_id}  value={col.color_id}>{col.color}</option>
            })
          }
        </select>
      </div>
    );
  };
  
  export default ColorComponent;
  