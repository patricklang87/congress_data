import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSearchTerms, clearSearchTerms } from '../../../redux/searchSlice';
import axios from 'axios';


export default function SearchLegislators() {
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const handleChange = (e) => {
        let name = e.target.name;
        if (name === "address") setAddress(e.target.value);
        if (name === "city") setCity(e.target.value);
        if (name === "state") setState(e.target.value);
        if (name === "zip") setZip(e.target.value);
    }

    const handleSubmit = () => {
        const data = { address, city, state, zip };
        axios.get('http://localhost:4000/district/legislators', { params: data })
            .then(response => {
                const divisionsData = response.data.divisions;
                let divisions = Object.keys(divisionsData);
                let division = '';
                for (let div of divisions) {
                    if (div.length > division.length) division = div;
                }
                let truncDivision = division.substring(24).split('/');
                const state = truncDivision[0].substring(6);
                const district = truncDivision[1].substring(3);
                dispatch(clearSearchTerms());
                dispatch(updateSearchTerms({field: "state", value: state.toUpperCase()}));
                dispatch(updateSearchTerms({field: "district", value: district}));
                // dispatch(addPotentialLegislator(officials));
            });
    }

    const handleClear = () => {
        setAddress('');
        setCity('');
        setState('');
        setZip(''); 
    }

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude);
                const data = { lat: position.coords.latitude, long: position.coords.longitude }
                axios.get('http://localhost:4000/district/detectLocation', { params: data })
                    .then(response => {
                        let location = response.data.results[0].locations[0];
                        return location;
                    })
                    .then(location => {
                        setAddress(location.street);
                        setCity(location.adminArea5);
                        setState(location.adminArea3);
                        setZip(location.postalCode);          
                    });    
            });
        } else {
            console.log("Geolocation is not supported");
        }
    }

    ///Change visibility for get district option

    const [navVisible, setNavVisible] = useState(false);

    const toggleNavVisible = () => {
        let newToggleValue = !navVisible;
        setNavVisible(newToggleValue);
    }

    const notVisible = {
        height: "0px",
        opacity: 0,
        overflow: "hidden"
    }

    const visible = {
        height: "140px",
        opacity: 1
    }

    return (
        <div>
            <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Find a District</strong></span>
            </div>
            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                <button onClick={() => handleUseCurrentLocation()}>Use Current Location</button> <br />
                <input onChange={(e) => handleChange(e)} value={address} placeholder="Street Address" name="address" type="text" /> <br />
                <input onChange={(e) => handleChange(e)} value={city} placeholder="City" name="city" type="text" /> <br />
                <input onChange={(e) => handleChange(e)} value={state} placeholder="State" name="state" type="text" /> <br />
                <input onChange={(e) => handleChange(e)} value={zip} placeholder="Zip" name="zip" type="text" /> <br />
                
                <button onClick={handleSubmit}>Find District</button>
                <button onClick={handleClear}>Clear</button>    
            </div>
        </div>
    );
}
