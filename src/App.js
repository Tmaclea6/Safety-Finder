import logo from './logo.svg';
import './App.css';
import React,{ useEffect, useState, useRef} from "react";
import { Map, Marker } from 'pigeon-maps'


function App() {
  const [center, setCenter] = useState([45.92698182886522, -66.62735907832183])
  const [zoom, setZoom] = useState(11)
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`
  return (
    <div>
    <header></header>
    <span className='partyTitle' >Theres a Party at 69 Pugsley</span>
    <Map 
      height={1000}
    
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
        color={color} 
        onClick={() => setHue(hue + 20)} 
      />
      </Map>
    </div>
  )
}
export default App;
