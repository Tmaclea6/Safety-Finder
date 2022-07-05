import logo from './logo.svg';
import './App.css';
import React,{ useEffect, useState, useRef} from "react";
import { Map, Marker } from 'pigeon-maps'
import Box from '@mui/material/Box';

function App() {
  const [center, setCenter] = useState([45.92698182886522, -66.62735907832183])
  const [zoom, setZoom] = useState(11)
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`
  return (
    <div> 
      <span class="partyTitle">Theres a Party at 69 Pugsley</span>
      <div className ='centered'>
      <header></header>
      
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
          anchor={[45.92698182886522, -66.62735907832183]} 
          color={color} 
          onClick={() => setHue(hue + 20)} 
        />
        </Map>
        </Box>
      </div>
    </div>
  )
}
export default App;
