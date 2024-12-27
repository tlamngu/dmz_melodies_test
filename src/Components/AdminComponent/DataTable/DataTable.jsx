import React, { useState } from 'react';
import errorSign from "/src/assets/404.svg";
import "./style.css";

const DataTable = ({ columns, rows, options }) => {
  const noData = rows.length === 0;
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="tableContainer">
      <table className="dataTable poppins">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
              {options && (
                <td>
                  <div className="options-container" onMouseLeave={() => setHoveredRow(null)}>
                    <button className="poppins options-button" onMouseEnter={() => setHoveredRow(index)} >...</button>
                    {hoveredRow === index && (
                      <div className="options-menu" >
                        {options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className="options-item poppins"
                            onClick={() => option.callbackFn(row)}
                            
                          >
                            {option.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {noData && (
        <div className="Table404">
          <img src={errorSign} alt="No data available" />
          <p className="poppins poppins-large">There's no data available.</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;
