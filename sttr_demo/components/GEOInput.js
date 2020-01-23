import React from 'react';

// import dynamic from "next/dynamic";
// const leaflet = dynamic(() => import("react-leaflet"), {
// 	ssr: false
// });
// const position = [51.505, -0.09];
// const map = () => {
// 	const { Map, Marker, Popup, TileLayer } = leaflet;
// 	return (
// 		<Map center={position} zoom={13}>
// 			<TileLayer
// 				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// 			/>
// 			<Marker position={position}>
// 				<Popup>
// 					A pretty CSS3 popup.
// 					<br />
// 					Easily customizable.
// 				</Popup>
// 			</Marker>
// 		</Map>
// 	);
// };

// export default map;

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  )),
);

export default ({ value, onChange }) => (
  <>
    <MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    <input
      type="checkbox"
      // onChange={e => e.target.checked}
      onChange={({ target: { checked } }) => {
        onChange(checked);
      }}
    />
  </>
);
