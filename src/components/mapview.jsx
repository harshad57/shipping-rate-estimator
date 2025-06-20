import {GoogleMap, Marker, DirectionsRenderer} from "@react-google-maps/api";

function Map({ setmap, direction }) {
    return (
        <div className='absolute lg:top-0 h-full w-full mt-0 bg-blue-700'>
            <GoogleMap center={{ lat: 19.1, lng: 72.9 }}
                zoom={3}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{ disableDefaultUI: true, zoomControl: true, fullscreenControl: true, mapTypeControl: true }}
                onLoad={map => setmap(map)}>
                <Marker position={{ lat: 19.1, lng: 72.9 }} />
                {direction && <DirectionsRenderer directions={direction} />}
            </GoogleMap>
        </div>
    )
}

export default Map;