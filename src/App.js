
import './App.css';
import React,{useState} from "react";
import { Map, Marker } from 'pigeon-maps'
import AED from './AED';
import { Stack } from '@mui/material';
import safetyDataJOSN from './safetyData.json';
import {type} from "@testing-library/user-event/dist/type";
import {get} from "leaflet/src/dom/DomUtil";

var first = true;

function App() {
  const [center, setCenter] = useState([45.9470, -66.6402]);
  const [zoom, setZoom] = useState(16);//16 or 17
  const [hue, setHue] = useState(0);
  const [markers, setMarkers] = useState(0);
  const [userLocation, setUserLocation] = useState({x:undefined,y:undefined});
  const radiusInM = 50 * 1000;
  const [firstRun, setFirstRun ] = useState(true);
  const [collectedData, setCollectedData] = useState({});
  const [markerLocations, setMarkerLocations] = useState(
    {
      data:[]
    }
  )

      if (firstRun) {
          loadJSON();
          setFirstRun(false);
      }

    function getDataType(typeIn, gatheredDataIn){
        console.log("gatheredDataIn",gatheredDataIn);
        console.log("Object.keys(gatheredDataIn).length",Object.keys(gatheredDataIn).length);
        let coords = {data:[]};
        console.log("gatheredDataIn", gatheredDataIn[typeIn]);
        const workingData = gatheredDataIn[typeIn];
        workingData.forEach(function (x){coords.data.push(x.coords)});
        console.log("coords", coords);
        setMarkers(coords.data.length);
        setMarkerLocations(coords);
        return gatheredDataIn;
    }

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
  function onTypeChanged(e){
    const val = e.target.value;
   getDataType(val, collectedData);
  }

  
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
    //loadJSON(); //for testing
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
    //console.log(storagedata);
  }

  function loadJSON(){
      let safetyData;
      safetyData = JSON.stringify(safetyDataJOSN);
      safetyData = JSON.parse(safetyData);
      console.log("safetyData",safetyData);
      setCollectedData(safetyData.data);
      getDataType("Fire_Extinguisher", safetyData.data);
  }

  const color = `hsl(${hue % 360}deg 39% 70%)`;
  return (
    <div>
      
              <h1 className="partyTitle">Find Safety Equipment In Your Area</h1>

        <div onChange={onTypeChanged}>

        <div className ='radios'>
            <input type="radio" value="AED" name="types" /> AED
            <input type="radio" value="Fire_Extinguisher" name="types" /> Fire Extinguisher

            <input type="radio" value="First_Aid_Kit" name="types" /> First Aid Kit

            <input type="radio" value="Eye_Wash_Station" name="types" /> Eye Wash

        </div>
        </div>




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
      <div onChange={onTypeChanged}>


<br/>


</div>
      {/* <button onClick={locationSnapshot}>location snapshot</button> */}
      <br/>
          <br/>
      
    </div>

  )
}
export default App;
