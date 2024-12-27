import React from 'react';
import "./style.css"

function Infographics({ data = [] }) {
  return (
    <div className="InfographicGrid">
      {data.map((pack, index) => (
        <div key={index} className="InfographicChild">
          <h4 className="poppins poppins-x-large poppins-bold">
            {pack.dataHead}
          </h4>
          {pack.description && <p className='poppins poppins-small'>{pack.description}</p>}
        </div>
      ))}
    </div>
  );
}

export default Infographics;
