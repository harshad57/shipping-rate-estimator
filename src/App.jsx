import { useState, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from './components/mapview';
import Input from './components/input';
import ShippingInfo from './components/shippinginfo';

function App() {
  const [map, setmap] = useState( /** @type google.maps.Map */(null));
  const [direction, setdirection] = useState((null));
  const [distance, setdistance] = useState('');
  const [duration, setduration] = useState('');
  const [weight, setweight] = useState(0);
  const [ship, setship] = useState('Standard');
  const [totalCost, settotalCost] = useState('');
  const [open, setOpen] = useState(false);

  const originref = useRef();
  const destinationref = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) return <div className="absolute text-gray-500 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-bold">Loading . . .</div>;
  if (isLoaded) console.log('Google Maps API Loaded');
  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) return <div>API Key is not set</div>;

  async function calculateRoute() {
    if (originref.current.value === '' || destinationref.current.value === '') {
      alert('Please enter both origin and destination');
      return;
    }
    if (weight < 0) {
      alert('Please enter a valid weight');
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: originref.current.value,
      destination: destinationref.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setdirection(result);
    setdistance(result.routes[0].legs[0].distance.text);
    setduration(result.routes[0].legs[0].duration.text);

    let rate = 10;
    if (ship === 'Express') rate = 20;
    if (ship === 'Overnight') rate = 30;

    const distanceInKm = parseFloat(result.routes[0].legs[0].distance.text.replace(' km', ''));
    settotalCost((distanceInKm * rate * weight).toFixed(2));
  }

  function clearRoute() {
    setdirection(null);
    setdistance('');
    setduration('');
    setship('Standard');
    setweight(0);
    originref.current.value = '';
    destinationref.current.value = '';
  }

  return (
    <div className="flex justify-center lg:justify-start">

      <button className="bg-black py-0.5 px-4 mt-2 rounded-xl text-xl focus:outline-none z-20 lg:hidden" onClick={() => setOpen(!open)}>
        <span className={`text-white inline-block transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}>
          ▼
        </span>
      </button>

      <div className={`flex-col absolute z-10 backdrop-blur-lg p-4 rounded-b-2xl border-2 lg:border-gray-300 shadow-lg  bg-slate-300 lg:bg-transparent border-black w-full lg:w-auto transition-all duration-700 ${
        open ? 'top-0 lg:top-0' : '-top-full lg:top-0'
      }`}>
        <div className='mt-8 text-3xl text-center font-bold lg:text-slate-300 text-black'>Calculate Shipping Rate</div>
        <Input originref={originref} destinationref={destinationref} />
        <ShippingInfo distance={distance} duration={duration} map={map} setship={setship} ship={ship} weight={weight} setweight={setweight} totalCost={totalCost} calculateRoute={calculateRoute} clearRoute={clearRoute} />
      </div>
      <Map direction={direction} setmap={setmap} />
    </div>
  )
}

export default App
