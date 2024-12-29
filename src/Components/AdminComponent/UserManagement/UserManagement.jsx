import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import SearchBar from '../SearchBar/SearchBar';
import AddDataForm from '../AddDataForm/AddDataForm';
import Modal from '../../Functional/Modal/Modal';
import Cookies from 'js-cookie';
import "./style.css";

const options = [
    { text: "Edit", callbackFn: (row) => console.log("Edit", row) },
    { text: "Delete", callbackFn: (row) => console.log("Delete", row) }
];

const UserManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [usersData, setUsersData] = useState([]);


    const toggleModal = () => { setShowModal(!showModal); };
    const toggleSubModal = () => { setShowSubModal(!showSubModal); };
    const handleOkay = () => { setShowModal(false); setShowSubModal(false); };

    let data = {
        Title: "User Management",
        Table: {
            cols: ["UserID","Username", "Email", "Role"]
        },
        Data: usersData,
        SearchBar: {
            SearchBy: ["Username", "Email"]
        },
        AddDataForm: {
            Data: {
                Username: { inputType: "input", DataType: "text" },
                Email: { inputType: "input", DataType: "email" },
                Password: { inputType: "input", DataType: "password" },
            }
        }
    };

    async function loadUsers() {
        const adm_id = Cookies.get('uid');
        const adm_token = Cookies.get('token');

        try {
            const response = await fetch(`http://localhost:8888/admin/get_users_data?adm_token=${adm_token}&adm_id=${adm_id}`);
            if (response.ok) {
                const users = await response.json();
                setUsersData(users.map(user => ({
                    UserID: user.uid,
                    Username: user.username,
                    Email: user.email,
                    Role: user.role
                })));
            } else {
                console.error('Failed to load users data');
            }
        } catch (error) {
            console.error('Error loading users data:', error);
        }
    }
    async function addUser(e, fd = { Email: "", Username: "", Password: "" }) {
        const response = await fetch('http://localhost:8888/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: fd.Email, username: fd.Username, password: fd.Password, role: "Listener" })
        });
        const data = await response.json();
        if (response.ok) {
            alert(`User registered with UID: ${data.uid}.`);
            // navigate('/login');
            toggleModal();
            loadUsers();
        } else {
            alert(`Error: ${data.detail}`);
        }
    };
    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="user-management">
            <h1 className='poppins'>{data.Title}</h1>
            <div className="headBar">
                <SearchBar searchBy={data.SearchBar.SearchBy} />
                <button className='AddDataButton' onClick={toggleModal}>+</button>
            </div>

            <DataTable columns={data.Table.cols} rows={data.Data} options={options} />
            <Modal show={showModal} onClose={toggleSubModal} title="Add new user">
                <AddDataForm fields={data.AddDataForm.Data} callback={addUser} />
            </Modal>
            <Modal show={showSubModal} onClose={toggleSubModal} title="Confirm Cancel">
                <p className='poppins'>Are you sure to cancel?</p>
                <div style={{ display: "flex" }}>
                    <button onClick={handleOkay} style={{ width: "50%", height: "2rem", backgroundColor: "#43A047", outline: "none", border: "none", marginRight: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>Yes</button>
                    <button onClick={toggleSubModal} style={{ width: "50%", height: "2rem", backgroundColor: "#E53935", outline: "none", border: "none", marginLeft: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>No</button>
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;
