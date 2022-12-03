
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
  const [markers, setMarkers] = useState(0);
  const [userLocation, setUserLocation] = useState({x:undefined,y:undefined});
  const radiusInM = 50 * 1000;
  const [markerLocations, setMarkerLocations] = useState(
    {
      data:[]
    }
  )
  var storagedata;
 try{
    storagedata = JSON.parse(localStorage.getItem('storagedata'));
    //console.log(storagedata);
    if(storagedata==null)
    {
     
      storagedata={
       'data':{}
      }
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
     //storagedata.markerLocations = markerLocations;
    // localStorage.setItem("storagedata", JSON.stringify(storagedata))
     //console.log("location",crd.latitude,crd.longitude)
  }
  navigator.geolocation.getCurrentPosition(success);

  
  function locationSnapshot(){
    const snapshot = userLocation;
    addMarker(snapshot.x, snapshot.y);
    storagedata.location.data.push([snapshot.x,snapshot.y]);
    localStorage.setItem("storagedata", JSON.stringify(storagedata))
    console.log("StorgeData: ",storagedata);
  }
  function clear(){
    setMarkers(0);
    setMarkerLocations({
      data:[]
    });
    storagedata = {'data':{}};
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
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(storagedata)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };
  function addMarker(latin, lngin, type, description) {
     let hold = markerLocations;
     hold.data[hold.data.length] = [latin, lngin] ;
     setMarkerLocations(hold);
     setMarkers(markers+1);
     console.log(storagedata.data);
     if(storagedata.data[type]===undefined){
      storagedata.data[type] = [];
     }
     storagedata.data[type].push({'coords':[latin,lngin],'description': description});
     localStorage.setItem("storagedata", JSON.stringify(storagedata))
    console.log(storagedata);
  }
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  return (
    <div> 
      <Stack>
      <span className="partyTitle">Find Safety Equipment In Your Area</span>
      <div className ='centered'>
      <header></header>
  
      
      {/* <Box className="rcorners1"
        sx={{
          width: "50%",
          height: "50%",
          backgroundColor: 'gray',
        }}
      > */}
      <Map 
        className="rcorners1"
        center={center} 
        zoom={zoom} 
        onBoundsChanged={({ center, zoom }) => { 
          setCenter(center) 
          setZoom(zoom) 
        }} 
      >
    
         {[...Array(markers).keys()].map((markers, i) => {
      return <Marker key={i} width={50} anchor={markerLocations.data[i]} color={color} 
      onClick={() => setHue(hue + 20)} />;
    })}
        </Map>
       {/* </div> </Box> */}
      </div>
      <br/>
      {/* <button onClick={locationSnapshot}>location snapshot</button> */}
      <AED addMarker={addMarker} userLocation={userLocation}></AED>
      <br/>
      <button
            onClick={exportData}
          >
            Download Json
          </button>
          <br/>
      </Stack>
      <button onClick={clear}>Clear Data</button>
    </div>

  )
}
export default App;
