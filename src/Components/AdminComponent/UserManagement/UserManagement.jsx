import React from 'react';
import { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import SearchBar from '../SearchBar/SearchBar';
import AddDataForm from '../AddDataForm/AddDataForm';
import Modal from '../../Functional/Modal/Modal';
import "./style.css"
const data = {
    Title: "User Management",
    Table: {
        cols: ["UserID", "UserName", "Email", "Role", "Status"]
    },
    Data: [
        {
            UserID: "SEVN19122024USR",
            UserName: "Nguyen Thanh Lam",
            Email: "tlamngu@outlook.com",
            Role: "User",
            Status: "Verified"
        }
    ],
    SearchBar: {
        SearchBy: ["UserID", "UserName", "Email"]
    },
    AddDataForm: {
        Data: {
            Username: { inputType: "input", DataType: "text" },
            Email: { inputType: "input", DataType: "email" },
            Password: { inputType: "input", DataType: "password" },
            Status: { inputType: "dropdown", options: ["Verified", "Unverified"] }
        }
    }
};
const options = [ { text: "Edit", callbackFn: (row) => console.log("Edit", row) }, { text: "Delete", callbackFn: (row) => console.log("Delete", row) }];
const UserManagement = () => {
    // const [showModal, setShowModal] = useState(false); const [showSubModal, setShowSubModal] = useState(false); const toggleModal = () => { setShowModal(!showModal); }; const toggleSubModal = () => { setShowSubModal(!showSubModal); }; const handleOkay = () => { setShowModal(false); setShowSubModal(false); };
    const [showModal, setShowModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const toggleModal = () => { setShowModal(!showModal); };
    const toggleSubModal = () => { setShowSubModal(!showSubModal); };
    const handleOkay = () => { setShowModal(false); setShowSubModal(false); };
    return (
        <div className="user-management">
            <h1 className='poppins'>{data.Title}</h1>
            <div className="headBar">
                <SearchBar searchBy={data.SearchBar.SearchBy} />
                <button className='AddDataButton' onClick={toggleModal}>+</button>
            </div>

            <DataTable columns={data.Table.cols} rows={data.Data} options={options}/>
            <Modal show={showModal} onClose={toggleSubModal} title="Add new user">
                <AddDataForm fields={data.AddDataForm.Data} />
            </Modal>
            <Modal show={showSubModal} onClose={toggleSubModal} title="Confirm Cancel">
                <p className='poppins'>Are you sure to cancel?</p>
                <div style={{ display: "flex" }}>
                    <button onClick={handleOkay} style={{ width: "50%", height: "2rem", backgroundColor: "#43A047", outline: "none", border: "none", marginRight: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>Yes</button>
                    <button onClick={toggleSubModal} style={{ width: "50%", height: "2rem", backgroundColor: "#E53935", outline: "none", border: "none", marginLrft: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>No</button>
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;
