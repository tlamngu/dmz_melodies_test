import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import SearchBar from '../SearchBar/SearchBar';
import AddDataForm from '../AddDataForm/AddDataForm';
import Modal from '../../Functional/Modal/Modal';
import Cookies from 'js-cookie';
import "./style.css";



const ContentsManagement = () => {
    const [data, setData] = useState({
        Title: "Contents Management",
        Table: {
            cols: ["TrackID", "TrackName", "Artists", "AlbumID", "AlbumName"]
        },
        Data: [],
        SearchBar: {
            SearchBy: ["TrackID", "TrackName", "AlbumID", "AlbumName", "Artists"]
        },
        AddDataForm: {
            Data: {}
        }
    });
    const [artists, setArtists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [addType, setAddType] = useState(null);
    const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);
    let imgFile;
    let musicFile;

    const addDataMusic = {
        MusicTitle: { inputType: "input", DataType: "text" },
        AuthorsID: { inputType: "input", DataType: "text" },
        MusicFile: { inputType: "input", DataType: "file" },
        MusicImgCover: { inputType: "input", DataType: "file" },
        AlbumID: { inputType: "input", DataType: "text" }
    };

    const addDataAlbum = {
        AlbumTitle: { inputType: "input", DataType: "text" },
        AuthorsID: { inputType: "input", DataType: "text" },
        MusicIDs: { inputType: "input", DataType: "text" },
        AlbumImgCover: { inputType: "input", DataType: "file" }
    };
    const findArtist = (aid, artists_l=artists) => {
        aid = aid.trim();
        for(let i = 0; i < artists_l.length; i++){
            console.log(`<${artists_l[i].uid}> || <${aid}>`)
            if(artists_l[i].uid == aid){
                return(artists_l[i].username)
            }
        }
        return "Error"
    }
    const loadArtists = async () => {
        const token = Cookies.get('token');
        const uid = Cookies.get('uid');

        if (!token || !uid) {
            alert('No token or user ID found. Please log in.');
            return;
        }

        try {
            await fetch(`http://localhost:8888/admin/get_artists_data?adm_token=${token}&adm_id=${uid}`).then(
                (response) => {
                   return response.json()
                }
            ).then((result)=>{
                console.log(result)
                setArtists(result);
                console.log(artists)
                console.log("Loaded artist, calling load content.")
                loadContents(result);
            });
            
        } catch (error) {
            console.error('Error loading artists:', error);
        }
    };

    const loadContents = async (artists_l=artists) => {
        console.log("Loadin content.")
        try {
            const response = await fetch('http://localhost:8888/cdn/contents_list');
            const result = await response.json();
            const formattedData = result.Musics.map(music => ({
                TrackID: music.MusicID,
                TrackName: music.MusicTitle,
                Artists: music.Authors.map(aid => findArtist(aid, artists_l)).join(", "),
                AlbumID: music.AlbumID.join(", "),
                AlbumName: result.Albums.find(album => album.AlbumID === music.AlbumID[0])?.AlbumTitle || ""
            }));
            setData(prevData => ({ ...prevData, Data: formattedData }));
        } catch (error) {
            console.error('Error loading contents:', error);
        }
    };

    
    const setup = async () => {
        await loadArtists();
    };

    useEffect(() => {
        setup();
    }, []);

    const toggleModal = () => { setShowModal(!showModal); };
    const toggleSubModal = () => { setShowSubModal(!showSubModal); };
    const toggleConfirmCancelModal = () => { setShowConfirmCancelModal(!showConfirmCancelModal); };
    const handleOkay = () => { setShowModal(false); setShowSubModal(false); setShowConfirmCancelModal(false); };

    const handleAddType = (type) => {
        setAddType(type);
        setShowSubModal(false);
        setShowModal(true);
    };
    const handleFileUpload = (e) => {
        console.log("Handling file...")
        if(e.target.name == "MusicFile"){
            console.log("Adding music file.")
            musicFile = e.target.files[0]
        }else if(e.target.name == "MusicImgCover" || e.target.name == "AlbumImgCover"){
            console.log("Adding img file.") 
            imgFile = e.target.files[0]
        }
    }
    const handleAdd = async (e, formData) => {
        e.preventDefault();

        const token = Cookies.get('token');
        if (!token) {
            alert('No token found. Please log in.');
            return;
        }

        let url = '';
        let bodyData = new FormData();

        bodyData.append('token', token);
        bodyData.append('artist_id', formData.AuthorsID);

        if (addType === 'music') {
            url = 'http://localhost:8888/cdn/upload/music';
            bodyData.append('title', formData.MusicTitle);
            bodyData.append('file', musicFile);
            bodyData.append('music_img', imgFile);
        } else if (addType === 'album') {
            url = 'http://localhost:8888/cdn/upload/album';
            bodyData.append('title', formData.AlbumTitle);
            bodyData.append('music_ids', formData.MusicIDs);
            bodyData.append('album_img', imgFile);
        }
        for (const [key, value] of bodyData) {
            console.log(`${key}: ${value}  {Datatype:${typeof value}}`);
          }
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: bodyData
            });
            if (response.ok) {
                alert(`Successfully added ${addType}!`);
                setShowModal(false);
                loadContents();
            } else {
                const errorData = await response.json();
                console.log(errorData)
                alert(`Error: ${errorData.detail}`);
            }
        } catch (error) {
            console.error(`Error adding ${addType}:`, error);
        }
    };

    const handleDelete = async (dt) => {
        const token = Cookies.get('token');
        const uid = Cookies.get('uid');
    
        if (!token || !uid) {
            alert('No token or user ID found. Please log in.');
            return;
        }
    
        try {
            const musicId = dt.TrackID.startsWith('#') ? `%23${dt.TrackID.slice(1)}` : dt.TrackID; // Clean up MusicID
            const response = await fetch(
                `http://localhost:8888/cdn/delete/music?token=${token}&uid=${uid}&music_id=${musicId}`,
                { method: 'DELETE' }
            );
    
            if (response.ok) {
                alert(`Successfully deleted track ${dt.TrackName}!`);
                loadContents();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || 'Failed to delete track'}`); // Handle cases where detail might not exist
            }
        } catch (error) {
            console.error("Error deleting track:", error);
            alert('An error occurred while deleting the track.');
        }
    };

    const options = [
        { text: "Edit", callbackFn: (e) => console.log("Edit", e)},
        { text: "Delete", callbackFn:handleDelete}
    ];
    return (
        <div className="user-management">
            <input style={{display:"none"}} type="file" id="virtualFileUpload" />
            <h1 className='poppins'>{data.Title}</h1>
            <div className="headBar">
                <SearchBar searchBy={data.SearchBar.SearchBy} />
                <button className='AddDataButton' onClick={() => toggleSubModal()}>+</button>
            </div>

            <DataTable columns={data.Table.cols} rows={data.Data} options={options} />
            <Modal show={showSubModal} onClose={toggleSubModal} title="Add new content">
                <div className='poppins' style={{ display: "flex" }}>
                    <button onClick={() => handleAddType('music')} style={{ width: "50%", height: "2rem", backgroundColor: "#B388FF", outline: "none", border: "none", marginRight: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>Add Music</button>
                    <button onClick={() => handleAddType('album')} style={{ width: "50%", height: "2rem", backgroundColor: "#B388FF", outline: "none", border: "none", marginLeft: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>Add Album</button>
                </div>
            </Modal>
            <Modal show={showModal} onClose={toggleConfirmCancelModal} title={`Add new ${addType}`}>
                <AddDataForm fields={addType === "music" ? addDataMusic : addDataAlbum} callback={handleAdd} handleFileUpload={handleFileUpload}/>
            </Modal>
            <Modal show={showConfirmCancelModal} onClose={toggleConfirmCancelModal} title="Confirm Cancel"> 
                <p className='poppins'>Are you sure to cancel?</p> 
                <div style={{ display: "flex" }}> 
                    <button onClick={handleOkay} style={{ width: "50%", height: "2rem", backgroundColor: "#43A047", outline: "none", border: "none", marginRight: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>Yes</button> 
                    <button onClick={toggleConfirmCancelModal} style={{ width: "50%", height: "2rem", backgroundColor: "#E53935", outline: "none", border: "none", marginLeft: "0.5rem", borderRadius: "0.25rem", color: "white" }} className='poppins'>No</button> 
                </div> 
            </Modal> 
        </div>
        );
}; export default ContentsManagement;