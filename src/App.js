
import './App.css';
import React,{useState} from "react";
import { Map, Marker } from 'pigeon-maps'
import AED from './AED';
import { Stack } from '@mui/material';

var first = true;

function App() {
  const [center, setCenter] = useState([45.92698182886522, -66.62735907832183]);
  const [zoom, setZoom] = useState(11);
  const [hue, setHue] = useState(0);
  const [markers, setMarkers] = useState(1);
  const [userLocation, setUserLocation] = useState({x:undefined,y:undefined});
  const radiusInM = 50 * 1000;
  const [markerLocations, setMarkerLocations] = useState(
    {
      data:[[45.92698182886522, -66.62735907832183],]
    }
  )
  var storagedata;
 try{
    storagedata = JSON.parse(localStorage.getItem('storagedata'));
    //console.log(storagedata);
    if(storagedata==null)
    {
     
      storagedata={
        location: markerLocations,
      }
    }
    if(first)
    {
      console.log("firstIF");
      const sd = storagedata.location;
      console.log(sd);
      if(sd != undefined){
        console.log(sd)
      setMarkerLocations(sd);
     
      setMarkers(countArray(sd.data));
      }
      first = false;
    }
  }
  catch(error){
    console.log(error);
    storagedata = {
      location:markerLocations,
    };
  }
  function success(pos) {
    const crd = pos.coords;
     setUserLocation({x: crd.latitude, y: crd.longitude});
     storagedata.markerLocations = markerLocations;
     localStorage.setItem("storagedata", JSON.stringify(storagedata))
     //console.log("location",crd.latitude,crd.longitude)
  }
  navigator.geolocation.getCurrentPosition(success);

  
  function locationSnapshot(){
    const snapshot = userLocation;
    addMarker(snapshot.x, snapshot.y);
    storagedata.location.data.push(markerLocations.data);
    localStorage.setItem("storagedata", JSON.stringify(storagedata))
  }
  function countArray(myArr) {
    let objectsLen = 0;
    for (let i = 0; i < myArr.length; i++) {

      // if entity is object, increase objectsLen by 1, which is the stores the total number of objects in array.
      if (myArr[i] instanceof Object) {
          objectsLen++;
      }
    }
    return objectsLen;
  }
  function addMarker(latin, lngin) {
     let hold = markerLocations;
     hold.data[hold.data.length] = [latin, lngin] ;
     setMarkerLocations(hold);
     setMarkers(markers+1);
    console.log(markerLocations.data);
  }
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  return (
    <div> 
      <Stack>
      <span className="partyTitle">Find Saftey Equipment In Your Area</span>
      <div className ='centered'>
      <header></header>
      <AED addMarker={addMarker}></AED>
      
      {/* <Box className="rcorners1"
        sx={{
          width: "50%",
          height: "50%",
          backgroundColor: 'gray',
        }}
      > */}
      <Map 
        height="50%"
        width="50%"
        className="rcorners1"
        center={center} 
        zoom={zoom} 
        onBoundsChanged={({ center, zoom }) => { 
          setCenter(center) 
          setZoom(zoom) 
        }} 
      >
          <Marker 
          width={50}
          anchor={[45.92698182886522, -66.62735907832183]} 
          color="blue"
          onClick={() => setHue(hue + 20)} 
        />
         {[...Array(markers).keys()].map((markers, i) => {
      return <Marker key={i} width={50} anchor={markerLocations.data[i]} color={color} 
      onClick={() => setHue(hue + 20)} />;
    })}
        </Map>
       {/* </div> </Box> */}
      </div>
      <button onClick={locationSnapshot}>location snapshot</button>
      <button
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(storagedata.location)
            )}`}
            download="Loactions.json"
          >
            {`Download Json`}
          </button>
      </Stack>
    </div>
  )
}
export default App;
