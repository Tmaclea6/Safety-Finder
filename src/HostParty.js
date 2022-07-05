import logo from './logo.svg';
import './App.css';
import React,{ useEffect, useState, useRef} from "react";
import { Map, Marker } from 'pigeon-maps'
import Box from '@mui/material/Box';
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

const HostParty = () => {
    const [openPartyModel, setOpenPartyModel] = useState(false);
    let textInput = "EnterAddress";
    function submit(){
        const coords = addressToGeo(textInput);

    }
    return(
        <div>
            {!openPartyModel && (
                <button onClick={setOpenPartyModel(true)}>Host a party</button>
            )};
            {openPartyModel && (
                <div className='partyModel'>
                   <div className='modelContent'>
                       <span> 
                        <textarea value={TextInput}> </textarea>
                        <button onClick={submit}>Enter</button>
                        </span>
                   </div>
                </div>
            )};
        </div>
    );
};

export default HostParty;

