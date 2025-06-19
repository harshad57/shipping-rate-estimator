import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

function Input({ originref, destinationref }) {
    return (
        <div className='flex justify-center gap-4 mt-10 bg-slate-100 p-4 rounded-md'>
            <Autocomplete>
                <input type='text' className='border-2 border-gray-300 rounded p-2' placeholder='origin' ref={originref} />
            </Autocomplete>
            <Autocomplete>
                <input type='text' className='border-2 border-gray-300 rounded p-2' placeholder='destination' ref={destinationref} />
            </Autocomplete>
        </div>
    )
}

export default Input;