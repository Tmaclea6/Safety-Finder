import logo from './logo.svg';
import './App.css';
import React,{ useEffect, useState, useRef} from "react";
import { Map, Marker } from 'pigeon-maps'
import Box from '@mui/material/Box';
import Geocode from "react-geocode";
function addressToGeo(address) {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        return [lat, lng];
      },
      (error) => {
        console.error(error);
      }
    );
  }

const HostParty = ({addMarker}) => {
    const [openPartyModel, setOpenPartyModel] = useState(false);
    let lng;
    let lat;
    function handleLng(event) {
        lng = parseFloat(event.target.value);
      }
    function handleLat(event) {
      lat = parseFloat(event.target.value);
    }
    function setOpen(){
        setOpenPartyModel(true);
    }
    function submit(){
        //const coords = addressToGeo(textInput);
        //if(lng!==undefined&&lat!==undefined){}
        addMarker(lat,lng)
    }
    return(
        
        <div>
            
                <button className='partyTitle' onClick={setOpen}>Host a party</button>
           
            {openPartyModel && (
                <div className='partyModel'>
                   <div className='modelContent'>
                       <span> 
                        <textarea onChange={handleLat} placeholder="Enter Latitude"></textarea>
                        <textarea onChange={handleLng} placeholder="Enter Longitude"></textarea>
                        <button onClick={submit}>Enter</button>
                        </span>
                   </div>
                </div>
            )}
        </div>
        
    );
};

export default HostParty;

