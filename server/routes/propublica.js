const express = require('express');
const router = express.Router();
const axios = require('axios');

require("dotenv").config();

const PROPUBLICA_KEY = process.env.PROPUBLICA_KEY;


router.get('/voteDetails', async (req, res, next) => {
    let voteUri = req.query.url;
    try {
        const response = await axios.get(voteUri, {
            headers: {"X-API-Key" : PROPUBLICA_KEY}
        });
        const data = await response.data;
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

const getVoteInfo = async (bill) => {
        let voteUri = bill.vote_uri;
        const response = await axios.get(voteUri, {
            headers: {"X-API-Key" : PROPUBLICA_KEY}
        });
        const data = await response.data;
        return data;
}

router.get('/recentVotes', async (req, res, next) => {
    const url = `https://api.propublica.org/congress/v1/house/votes/recent.json`;
    const recentVotes = async () => {
        const response = await axios.get(url, {
            headers: {"X-API-Key" : PROPUBLICA_KEY}
        });
        const data = await response.data;
        let combinedData = [];
        for (let bill of data.results.votes) {
            let rollCall = await getVoteInfo(bill);
            combinedData.push(rollCall);
        }
        return combinedData;
    }
    const voteData = await recentVotes();
    res.send(voteData);
});


router.get('/billDetails', async (req, res, next) => {
    const url = req.query.url;
    try {
        const response = await axios.get(req.query.url,
            {headers: {"X-API-Key": PROPUBLICA_KEY}
        });
        const data = response.data;
        res.send(data);
    } catch (err) {
        console.log(err);
    }   
});

router.get('/recentBills', async (req, res, next) => {
    try {
        let response = await axios.get(
            'https://api.propublica.org/congress/v1/bills/search.json',
            {headers: {"X-API-Key": PROPUBLICA_KEY}}
        );
        let data = await response.data;
        let billsExtraInfo = [];
        for (let bill of data.results[0].bills) {
            const info = await getSpecificBill(bill);
            billsExtraInfo.push(info);
        }
        res.send(billsExtraInfo);
    } catch (err) {
        console.log(err);
    }
});

router.get('/billsByTrackedSubject', async (req, res, next) => {
    const keyword = req.query.query;
    const uri = `https://api.propublica.org/congress/v1/bills/search.json?query=${keyword}`;
    try {
        let response = await axios.get(
            uri,
            {headers: {"X-API-Key": PROPUBLICA_KEY}}
        );
        let data = await response.data;
        let billsExtraInfo = [];
        for (let bill of data.results[0].bills) {
            const info = await getSpecificBill(bill);
            billsExtraInfo.push(info);
        }
        res.send(billsExtraInfo);
    } catch (err) {
        console.log(err);
    }
    
});

const getSpecificBill = async (bill) => {
    let uri = bill.bill_uri;
    try {
        let response = await axios.get(
            uri,
            {headers: {"X-API-Key": PROPUBLICA_KEY}}
        );
        let data = await response.data;
        return data.results[0];
    } catch (err) {
        console.log(err);
    }
}

router.get('/specificBill', async (req, res, next) => {
    const url = req.query[0];

    const getBill = async () => {
        const response = await axios.get(url, {
            headers: {"X-API-Key": PROPUBLICA_KEY}
        });
        const data = await response.data;
        return data
    }

    const billData = await getBill();
    res.send(billData);
});


router.get('/subjects', async (req, res, next) => {
    const keyword = req.query[0];
    const url = `https://api.propublica.org/congress/v1/bills/subjects/search.json?query=${keyword}`;
    const getTopics = async () => {
        const response = await axios.get(url, {
            headers: {"X-API-Key" : PROPUBLICA_KEY}
        });
        const data = await response.data;
        return data;
    }
    const topicsData = await getTopics();
    res.send(topicsData);
});



const fetchMemberData = async () => {
    try {
        const houseResponse = await axios.get('https://api.propublica.org/congress/v1/117/house/members.json', {
            headers: {"X-API-Key": PROPUBLICA_KEY}
        });
        const senateResponse = await axios.get('https://api.propublica.org/congress/v1/117/senate/members.json', {
            headers: {"X-API-Key": PROPUBLICA_KEY}
        });
        const houseData = await houseResponse.data;
        const senateData = await senateResponse.data;
        const members = { house: houseData.results[0].members, senate: senateData.results[0].members };
        return members;
    } catch (err) {
        console.log(err);
    }
}

router.get('/all', async (req, res, next) => {
    const members = await fetchMemberData();
    res.send(members);
});


module.exports = router;