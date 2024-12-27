import React from 'react';
import { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import SearchBar from '../SearchBar/SearchBar';
import AddDataForm from '../AddDataForm/AddDataForm';
import Modal from '../../Functional/Modal/Modal';
import "./style.css"
const data = {
    Title: "Report Management",
    Table: {
        cols: ["ReportID", "Title", "Reason", "ReporterID", "Note"]
    },
    Data: [
        {
            ReportID: "RP20203403",
            Title: "Fake artist",
            Reason: "Fake artist / Copyright",
            Note: "Track: kahiloma - JX Stavior",
            ReporterID: "USDVN12020022",
            Conversations:[
                {
                    Sender: "Admin",
                    Content: "Hi, thanks for your report. We will get back on this soon."
                },
                {
                    Sender: "USDVN12020022",
                    Content: "Hi, Im the original artist for that track."
                },{
                    Sender: "Admin",
                    Content: "Hi, we have reviewed the track and removed it from our platform, Thanks for your report and hopefully in the near future, you can choose us as an collabrator for you to distribute musics."
                },
                {
                    Sender: "USDVN12020022",
                    Content: "Hi, Thanks. I will speak to manager for that offer."
                }
            ]
        }
    ],
    SearchBar: {
        SearchBy: ["..."]
    },
    AddDataForm: {
        Data: {
            
        }
    }
};

const ReportManagement = () => {
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

            <DataTable columns={data.Table.cols} rows={data.Data} />
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

export default ReportManagement;
