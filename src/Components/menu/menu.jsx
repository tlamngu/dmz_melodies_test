import React from 'react'
import './menu.css'
import img from '../img/Logo_White.png'
import icon1 from '../img/Group.png'
import icon2 from '../img/material-symbols-light_explore-outline.png'
import icon3 from '../img/material-symbols-light_album-outline.png'
import icon4 from '../img/healthicons_ui-user-profile-outline.png'
import icon5 from '../img/fluent-mdl2_recent.png'
import icon6 from '../img/arcticons_niagara-launcher-recently-installed.png'
import icon7 from '../img/ph_heart-light.png'
import icon8 from '../img/ph_playlist.png'
import icon9 from '../img/subway_add-playlist.png'
import icon10 from '../img/lets-icons_setting-line.png'
import icon11 from '../img/line-md_log-out.png'
import { MdOpacity } from 'react-icons/md'
import { BiHome } from 'react-icons/bi'

function clickedTab(id){
    document.getElementById('Home').style.cssText = ""
    document.getElementById("Discover").style.cssText = ""
    document.getElementById("Albums").style.cssText = ""
    document.getElementById("Artists").style.cssText = ""
    
    
    document.getElementById(id).style.cssText = "  background-color: #B388FF"
}

function Menu() {
    const pStyle = {color:"#F5F5F5", marginLeft: "8px", marginTop: "30px", opacity: 0.5}
    const pClassname = "poppins poppins-medium"

  return (
    <>
    <div className='left-side'>

    <div className='logo_container'>
        <img className='logo' src={img} alt="" />
    </div>

    <div className='poppins-meidum menu'>


        <p className='poppins' style={pStyle}>Menu</p>
        <div id='Home' className='icon'  onClick={() => clickedTab('Home')} style={{backgroundColor: "#B388FF"}}>
            <img src={icon1} /> <p className={pClassname}>Home</p>
        </div>
        
        <div className='icon' id='Discover' onClick={() => clickedTab('Discover')}>
            <img src={icon2} alt="" /> <p className={pClassname}>Discover</p>
        </div>

        <div className='icon' id='Albums' onClick={() => clickedTab('Albums')}>
            <img src={icon3} alt="" /> <p className={pClassname}>Albums</p>
        </div>

        <div className='icon'id='Artists' onClick={() => clickedTab('Artists')}>
            <img src={icon4} alt="" /> <p className={pClassname}>Artists</p>
        </div>

        <p className='poppins' style={pStyle}>Library</p>

        <div className='icon'>
            <img src={icon5} alt="" /> <p className={pClassname}>Recently added</p>
        </div>
        <div className='icon'>
            <img src={icon6} alt="" /> <p className={pClassname}>Most played</p>
        </div>
        
        <p className='poppins' style={pStyle}>Playlist and favorite</p>

        <div className='icon'>
            <img src={icon7} alt="" /> <p className={pClassname}>Your favorites</p>
        </div>
        <div className='icon'>
            <img src={icon8} alt="" /> <p className={pClassname}>Your playlist</p>
        </div>
        <div className='icon'>
            <img src={icon9} alt=""/> <p style={{color : '#0E9EEF'}} className={pClassname}>Add playlist</p>
        </div>

    </div>

        <p className='poppins' style={pStyle}>General</p>

        <div className='icon'>
            <img src={icon10} alt=""/> <p className={pClassname}>Setting</p>
        </div>
        <div className='icon'>
            <img src={icon11} alt=""/> <p className={pClassname}>Logout</p>
        </div>
    
    </div>
    </>
  )
  
}



export default Menu
