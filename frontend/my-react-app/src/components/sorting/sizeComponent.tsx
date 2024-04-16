import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getProductsFeatures } from "../../store/csc";


interface props{
  getSize : (data: number) => void
}
const SizeComponent:React.FC<props> = (props) => {

  const size = useSelector((state:RootState) => state.colorSizeCategory.state.size)

  const dispatch = useDispatch <AppDispatch>();

    useEffect(() => {
        dispatch(getProductsFeatures())
      },[]);


    return (
      <div className="filter size-filter">
        <label>SIZE</label>
        <select>
        {
          size.map(sze =>{
            return <option key={sze.size_id} value="" onClick={()=>{props.getSize(sze.size_id)}}>{sze.size}</option>
          })
        }
        
        </select>
      </div>
    );
  };
  
  export default SizeComponent;
  