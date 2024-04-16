import React from 'react';
import SizeComponent from './sizeComponent';
import ColorComponent from './colorComponent';
import FootwearComponent from './categoriesComponent';
import  '../../styles/sorting.css';

type data = {
  color_id: number,
  size_id: number
}

interface props {
  getSortData: (datas: data)=> void
}

const Sorting:React.FC<props> = (props) => {
  
  let sortData : data = {color_id:-1, size_id:-1};
  const handleColorData = (data:number) =>{
    sortData.color_id = data
    props.getSortData(sortData);
  }

  const handleSizeData = (data: number)=>{
    sortData.size_id = data;
    props.getSortData(sortData);
  }

  return (
    <div className="sorting-container">
      <SizeComponent   getSize = {handleSizeData}/>
      <ColorComponent getColor = {handleColorData} />
      {/* <FootwearComponent /> */}
      {/* ProductTypeComponent can be added here if needed */}
    </div>
  );
};

export default Sorting;
