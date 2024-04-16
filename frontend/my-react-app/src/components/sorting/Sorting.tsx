import React from 'react';
import SizeComponent from './sizeComponent';
import ColorComponent from './colorComponent';
import FootwearComponent from './categoriesComponent';
import  '../../styles/sorting.css';
const Sorting = () => {
  return (
    <div className="sorting-container">
      <SizeComponent />
      <ColorComponent />
      {/* <FootwearComponent /> */}
      {/* ProductTypeComponent can be added here if needed */}
    </div>
  );
};

export default Sorting;
