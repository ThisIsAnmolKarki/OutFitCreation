const SizeComponent = () => {
    return (
      <div className="filter size-filter">
        <label>SIZE</label>
        <select>
          {/* Options would be dynamically generated from a state or props */}
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    );
  };
  
  export default SizeComponent;
  