import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getProductsAsync,Product } from "../store/allProducts";
import EachProduct from "../components/newCollectionCompo/eachProduct";
import "../styles/allProducts.css";
import Sorting from "../components/sorting/Sorting";
import SearchBox from "../components/search/SearchBox";

interface data {
  color_id: number,
  size_id: number;
}


const sortAlogrithm = (prod:Product[], sortData:data)=>{
  console.log(sortData);
  let sortDatas = new Map<number, Product>();
  prod.forEach((product:Product)=>{
    // console.log(product);
    if(sortData?.size_id!=-1 || sortData?.color_id!=-1){
      product.M_C.forEach((pro)=>{
        // console.log(sortData.color_id);
      if((sortData?.size_id!=-1 && sortData?.color_id==-1) || (sortData?.size_id == -1 && (sortData?.color_id!=-1))){
          if(sortData?.size_id!=-1 && sortData.size_id== pro.size){
            // console.log("size");
            sortDatas.set(product.product_id,product);
          }else{
            pro.color.forEach((col_stock)=>{
              if(sortData?.color_id == col_stock.color){
                // console.log(sortData.color_id);
                // console.log(product);
                sortDatas.set(product.product_id,product);
              }
            })
          }            
      }
      if(sortData?.size_id!=-1 && sortData?.color_id!=-1){

        if(sortData?.size_id== pro.size){
          pro.color.forEach((col_stock)=>{
            if(sortData?.color_id == col_stock.color){
              sortDatas.set(product.product_id,product);
            }
          })
        }
      }
      })
    } 
  }) 

  return sortDatas;
}

const allProducts: React.FC= () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortData, setSortData] = useState<data>({size_id: -1, color_id:-1});
  const [searchData, setSearchData] = useState<string>("");
  const [toBeRenderData, setToBeRenderData] = useState<Product[]>([]);
  const product = useSelector((state:RootState) => state.product.products)

  const filteredProductsByPartialName: Product[] = product.filter((product) =>
  product.product_name.toLowerCase().includes(searchData.toLowerCase() ?? "")
);



  const dispatch = useDispatch <AppDispatch>();

      useEffect ( () => {
        dispatch(getProductsAsync())
      },[]);

      useEffect(()=>{
        setToBeRenderData(product);
      },[product])
      
      useEffect(()=>{
        if(sortData.color_id ==0){
          setToBeRenderData(product);
        }else{
          
        setToBeRenderData(Array.from(sortAlogrithm(product, sortData).values()))
        }
        // console.log(toBeRenderData);
      },[sortData])

      useEffect(()=>{
        setToBeRenderData(filteredProductsByPartialName);

      },[searchData])

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
    
      const handleSortData = (datas:data)=>{
        // toBeRenderData = [];
        setSortData(datas)
      }

      const handleSearchData = (data: string)=>{
        
        setSearchData(data)

      }
        

  return (
    <>
        <Sorting getSortData = {handleSortData} />
        <SearchBox getSearchData = {handleSearchData}/>
        <div className="app-container">
            <button className="hamburger-button" onClick={toggleSidebar}>
                {/* Hamburger Icon */}
                <span className="hamburger-icon">&equiv;</span>
            </button>
            <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <h2>Categories</h2>
                {/* Add category links */}
                <a href="">Tshirt</a>
                <br />
                <a href="">shirt</a>
            </aside>
            <div className="products-grid">
                {/* } */}
                {
                  toBeRenderData[0] == null ? <p>cannot find anything</p>:null
                }
                {toBeRenderData.map((product: Product) => (

                    <EachProduct 
                        // key={product.product_id}
                        product_id={product.product_id}
                        product_name= {product.product_name}
                        discount={product.discount}
                        price={product.price}
                        sold_out = {true}
                        M_C = {product.M_C}
                        category = {product.category}
                    />
                ))}
            </div>
        </div>
        
    </>
  );
};

export default allProducts;
