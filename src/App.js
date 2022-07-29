import logo from './logo.svg';
import './App.css';
import React,{ useEffect, useState, useRef} from "react";
import { Map, Marker } from 'pigeon-maps'
import Box from '@mui/material/Box';
import AED from './AED';
import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import * as geofire from 'geofire-common';

const firebaseConfig = {
  apiKey: "AIzaSyAP9oLzSa4xGUf23KN9ztYV22E1i21qzHg",
  authDomain: "safety-finder.firebaseapp.com",
  projectId: "safety-finder",
  storageBucket: "safety-finder.appspot.com",
  messagingSenderId: "933321313540",
  appId: "1:933321313540:web:8ac8c220ccf5772e455451",
  measurementId: "G-Q0WRNHYG68"
};

function App() {
  const [center, setCenter] = useState([45.92698182886522, -66.62735907832183]);
  const [zoom, setZoom] = useState(11);
  const [hue, setHue] = useState(0);
  const [markers, setMarkers] = useState(1);
  const [userLocation, setUserLocation] = useState({x:undefined,y:undefined});
  const radiusInM = 50 * 1000;
  function success(pos) {
    const crd = pos.coords;
     setUserLocation({x: crd.latitude, y: crd.longitude});
  }
  navigator.geolocation.getCurrentPosition(success);
  
  function getData(){
    // const bounds = geofire.geohashQueryBounds(center, radiusInM);
    // const promises = [];
    // for (const b of bounds) {
    //   const q = collection(db, 'AEDs')
    //     .orderBy('geohash')
    //     .startAt(b[0])
    //     .endAt(b[1]);

    //   promises.push(q.get());
    // }

    // //Collect all the query results together into a single list
    // Promise.all(promises).then((snapshots) => {
    //   const matchingDocs = [];

    //   for (const snap of snapshots) {
    //     for (const doc of snap.docs) {
    //       const lat = doc.get('lat');
    //       const lng = doc.get('lng');

    //       // We have to filter out a few false positives due to GeoHash
    //       // accuracy, but most will match
    //       const distanceInKm = geofire.distanceBetween([lat, lng], center);
    //       const distanceInM = distanceInKm * 1000;
    //       if (distanceInM <= radiusInM) {
    //         matchingDocs.push(doc);
    //       }
    //     }
    //   }

    //   return matchingDocs;
    // }).then((matchingDocs) => {
    //  console.log(matchingDocs);
    // });
  };
  
  const [markerLocations, setMarkerLocations] = useState(
    {
      data:[[45.92698182886522, -66.62735907832183],]
    }
  )
  function addMarker(latin, lngin) {
    // console.log(latin);
    // const hash = geofire.geohashForLocation([latin, lngin]);
    // const storeRef = collection(db,'AEDs').doc('store');
    // storeRef.post({
    //  geohash: hash,
    //  lat: latin,
    //  lng: lngin
    // }).then(() => {});
     let hold = markerLocations;
     hold.data[hold.data.length] = [latin, lngin] ;
     setMarkerLocations(hold);
     setMarkers(markers+1);
   // console.log(markerLocations.data);
  }
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  return (
    <div> 
      <span className="partyTitle">Find Saftey Equipment In Your Area</span>
      <div className ='centered'>
      <header></header>
      <AED addMarker={addMarker}></AED>
      
      <Box className="rcorners1"
        sx={{
          width: 1000,
          height: 1000,
          backgroundColor: 'gray',
        }}
      >
      <Map 
        height={1000}
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
          anchor={[userLocation.x, userLocation.y]} 
          color="blue"
          onClick={() => setHue(hue + 20)} 
        />
         {[...Array(markers).keys()].map((markers, i) => {
      return <Marker key={i} width={50} anchor={markerLocations.data[i]} color={color} 
      onClick={() => setHue(hue + 20)} />;
    })}
        </Map>
        </Box>
      </div>
    </div>
  )
}
export default App;
