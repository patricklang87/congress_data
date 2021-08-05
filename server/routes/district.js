const express = require('express');
const router = express.Router();
const axios = require('axios');

require("dotenv").config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MAPQUEST_KEY = process.env.MAPQUEST_KEY;

router.get('/detectLocation', async (req, res, next) => {
    const lat = req.query.lat;
    const long = req.query.long;
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${MAPQUEST_KEY}&location=${lat},${long}`;
    try {
        const response = await axios.get(url);
        const data = await response.data;
        res.send(data);
    } catch (err) {
        console.log(err);
    } 
});

router.get('/legislators', async (req, res, next) => {
    const queryVals = req.query;
    let address = ''
    let addressComponents = Object.keys(queryVals);
    addressComponents.forEach((component, index) => {
    
        if (queryVals[component] !== '') {
            if (index !== 0) address += "%20";
            address += queryVals[component];
        }  
    })

    const url = `https://www.googleapis.com/civicinfo/v2/representatives/?address=${address}&roles=legislatorLowerBody&roles=legislatorUpperBody&levels=country&key=${GOOGLE_API_KEY}`;
    const localLegislators = async () => {
        const response = await axios.get(url);
        const data = await response.data;
        return data;
    }
    const legislatorData = await localLegislators();
    res.send(legislatorData);
});


module.exports = router;