import React from 'react';
import "./style.css"
const SearchBar = ({ searchBy }) => {
  return (
    <div className="searchBar poppins">
      <input type="text" className='poppins poppins-small' placeholder={`Search by ${searchBy.join(', ')}`} />
    </div>
  );
};

export default SearchBar;
