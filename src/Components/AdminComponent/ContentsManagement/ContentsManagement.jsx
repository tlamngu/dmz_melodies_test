import React from 'react';
import { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import SearchBar from '../SearchBar/SearchBar';
import AddDataForm from '../AddDataForm/AddDataForm';
import Modal from '../../Functional/Modal/Modal';
import "./style.css"
const data = {
    Title: "Contents Management",
    Table: {
        cols: ["TrackID", "TrackName", "Artists", "AlbumID", "AlbumName"]
    },
    Data: [
        {
            TrackID: "TRCVN2024302030",
            TrackName: "Chào, đời.",
            Artists: "ZeakyD, Prod.D",
            AlbumID: "ALBBN202034",
            AlbumName: "Khởi, khải, tan.",
            Owner: ["SSDS2230", "PRD293939"],
        },
        {
            TrackID: "TRCVN2024303030",
            TrackName: "Khởi Vương Mộng",
            Artists: "ZeakyD, Prod.D",
            AlbumID: "ALBBN202034",
            AlbumName: "Khởi, khải, tan.",
            Owner: ["SSDS2230", "PRD293939"],
        },
        {
            TrackID: "TRCVN2024301030",
            TrackName: "Khải Hoàng Ca",
            Artists: "ZeakyD, Prod.D",
            AlbumID: "ALBBN202034",
            AlbumName: "Khởi, khải, tan.",
            Owner: ["SSDS2230", "PRD293939"],
        },{
            TrackID: "TRCVN2024503030",
            TrackName: "Tan Cửa Nát Nhà",
            Artists: "ZeakyD, Prod.D",
            AlbumID: "ALBBN202034",
            AlbumName: "Khởi, khải, tan.",
            Owner: ["SSDS2230", "PRD293939"],
        },{
            TrackID: "TRCVN2024307030",
            TrackName: "Mộ Vương",
            Artists: "ZeakyD, Prod.D",
            AlbumID: "ALBBN202034",
            AlbumName: "Khởi, khải, tan.",
            Owner: ["SSDS2230", "PRD293939"],
        },
    ],
    SearchBar: {
        SearchBy: ["TrackID", "TrackName", "AlbumID", "AlbumName", "Artists"]
    },
    AddDataForm: {
        Data: {
            TrackName: { inputType: "input", DataType: "text" },
            ArtistsID: { inputType: "input", DataType: "text" },
            AlbumID: { inputType: "input", DataType: "text" },
            MusicFile: { inputType: "input", DataType: "file" },
        }
    }
};
const options = [ { text: "Edit", callbackFn: (row) => console.log("Edit", row) }, { text: "Delete", callbackFn: (row) => console.log("Delete", row) }];

const ContentsManagement = () => {
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

export default ContentsManagement;
