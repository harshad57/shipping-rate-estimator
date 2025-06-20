import React, { useState } from 'react';

function ShippingInfo({distance, duration, map, setship, ship, weight, setweight, totalCost, calculateRoute, clearRoute}) {
    return (
        <div>
            <div className='mt-5 bg-white p-2 rounded shadow-md justify-center items-center gap-5 flex'>
                <div className='font-semibold'>• Distance = {distance ? distance : '___'}</div>
                <div className='font-semibold'>• Duration = {duration ? duration : '___'}</div>
                <button onClick={() => map.panTo({ lat: 19.1, lng: 72.9 })} className='bg-green-200 w-10 h-10 rounded-full border-2 border-green-600'>📍</button>
            </div>
            <div className='mt-6 flex justify-center flex-wrap gap-1 items-center'>
            <select className='border-2 border-gray-300 rounded p-2 font-semibold' value={ship} onChange={(e) => setship(e.target.value)}>
                <option value='Basic' className='text-yellow-500'>Standard (₹10/km/kg)</option>
                <option value='Express' className='text-orange-500'>Express (₹20/km/kg)</option>
                <option value='Overnight' className='text-red-600'>Overnight (₹30/km/kg)</option>
            </select>
            <input type="number" min={0} className='border-2 border-gray-300 rounded p-2 ml-2' placeholder='Weight in kg' value={weight} onChange={(e) => setweight(e.target.value)} />
            </div>
            <div className='mt-8 flex justify-center gap-4'>
                <button className='bg-blue-500 rounded text-white font-semibold px-3 py-2 text-lg' onClick={calculateRoute}>Calculate</button>
                <button className='bg-red-500 rounded text-white font-semibold px-3 py-2 text-lg' onClick={clearRoute}>clear all</button>
            </div>
            <div className='font-bold text-lg mt-8 mb-3 text-center lg:text-white text-black'>{totalCost ? totalCost : '. . .'}</div>
        </div>
    )
}

export default ShippingInfo;