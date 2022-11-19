import './App.css';
import React,{useState} from "react";
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

const AED = ({addMarker}) => {
  const [type, setType] = useState("AED");
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
    const [openPartyModel, setOpenPartyModel] = useState(false);
    let lng;
    let lat;
    function handleLng(event) {
        setLongitude(parseFloat(event.target.value));
      }
    function handleLat(event) {
      setLatitude(parseFloat(event.target.value));
    }
    function setOpen(){
        setOpenPartyModel(true);
    }
    function setClosed(){
      setOpenPartyModel(false);
    }
    function submit(){
        addMarker(latitude,longitude)
        setClosed();
    }
    function onTypeChanged(e){
      const val = e.target.value;
      setType(val)
      console.log(val);
    }
    return(
        
        <div>
            
                <button className='buttonText' onClick={setOpen}>Add Safety Equipment</button>
           
            {openPartyModel && (
                <div className='partyModel'>
                   <div className='modelContent'>
                      <div onChange={onTypeChanged}>

                        <input type="radio" value="AED" name="types" /> AED

                        <input type="radio" value="Fire_Extinguisher" name="types" /> Fire Extinguisher

                        <input type="radio" value="First_Aid_Kit" name="types" /> First Aid Kit

                        <input type="radio" value="Eye_Wash_Station" name="types" /> Eye Wash

                      </div>
                       <span> 
                        <textarea onChange={handleLat} placeholder="Enter Latitude"></textarea>
                        <textarea onChange={handleLng} placeholder="Enter Longitude"></textarea>
                        
                        </span>
                        <span>
                        <button className='buttonText' onClick={submit}>Enter</button>
                        <button className='buttonText' onClick={setClosed}>Cancel</button>
                        </span>
                       
                   </div>
                </div>
            )}
        </div>
        
    );
};

export default AED;

