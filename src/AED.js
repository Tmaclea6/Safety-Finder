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
  const [type, setType] = useState(undefined);
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [userLocation, setUserLocation] = useState({x:undefined,y:undefined});
  const [errorText, setErrorText] = useState(false);
    const [openPartyModel, setOpenPartyModel] = useState(false);
    let lng;
    let lat;
    function success(pos) {
      const crd = pos.coords;
       setUserLocation({x: crd.latitude, y: crd.longitude});
    }
    navigator.geolocation.getCurrentPosition(success);
    function handleLng(event) {
        setLongitude(parseFloat(event.target.value));
      }
    function handleLat(event) {
      setLatitude(parseFloat(event.target.value));
    }
    function setOpen(){
       
        const loca = userLocation;
        console.log(loca.x);
        setLatitude(loca.x);
        setLongitude(loca.y);
        setOpenPartyModel(true);
    }
    function setClosed(){
      setOpenPartyModel(false);
    }
    function submit(){
      if(description != undefined && type != undefined) {
        addMarker(latitude,longitude,type, description)
        setClosed();
      }
      else{
        setErrorText(true);
      }
    }
    function onTypeChanged(e){
      setErrorText(false);
      const val = e.target.value;
      setType(val)
      console.log(val);
    }
    function onDescriptionChanged(e){
      setErrorText(false);
      const d = e.target.value;
      setDescription(d);
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
                        <br/>

                        <input type="radio" value="First_Aid_Kit" name="types" /> First Aid Kit

                        <input type="radio" value="Eye_Wash_Station" name="types" /> Eye Wash

                      </div>
                      <textarea onChange={onDescriptionChanged} placeholder='Enter Description'></textarea>
                       <span> 
                         <div>
                          longitude
                           <textarea onChange={handleLat} text={longitude} placeholder={latitude}></textarea>
                         </div>
                         <div>
                          latitude
                           <textarea onChange={handleLng} text={latitude} placeholder={longitude}></textarea>
                          </div>
                        </span>
                        <span>
                        <button className='buttonText' onClick={submit}>Enter</button>
                        <button className='buttonText' onClick={setClosed}>Cancel</button>
                        </span>

                        {errorText && (<div>
                          <label className='errorLabel'>You must have a description and an equipment type</label>
                        </div>
                        )}
                   </div>
                </div>
            )}
        </div>
        
    );
};

export default AED;

