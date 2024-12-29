import React, { useState } from 'react';
import "./style.css";

const AddDataForm = ({ fields, callback=(e, fd)=>{},  handleFileUpload=(e)=>{}}) => {
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, ""]))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if(e.target.type == "file"){
    //   setFormData({ ...formData, [name]: e.target.files[0]});
    // }else{
      setFormData({ ...formData, [name]: value });
    // }
  };
  const hdFile = (e) => {
    console.log("File being handle...")
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleFileUpload(e);
    console.log("Called hd file uplaod.")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Data:', formData);
    callback(e, formData);
  };

  return (
    <form className="add-data-form" onSubmit={handleSubmit}>
      {Object.keys(fields).map((field, index) => {
        const fieldData = fields[field];
        return (
          <div key={index} className="form-group">
            <label className="poppins poppins-small">{field}</label>
            {fieldData.inputType === "input" ? (
              fieldData.DataType === "file" ? (
                <input
                  className="poppins"
                  type={fieldData.DataType}
                  name={field}
                  value={formData[field]}
                  onChange={hdFile}
                />
              ):(
                <input
                  className="poppins"
                  type={fieldData.DataType}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              )
              
            ) : fieldData.inputType === "dropdown" ? (
              <select
                className="poppins"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              >
                {fieldData.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        );
      })}
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddDataForm;
