import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady}) => (
  <MapViewDirections
  destination={destination}
  origin={origin}
  onReady={onReady}
  apikey="AIzaSyBIKmVXM8SxkN5r7vrrMAvi0u0504FCBFU"
  strokeWidth={6}
  strokeColor="#ff8000"
  />
)

export default Directions;
