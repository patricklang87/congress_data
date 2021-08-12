const express = require('express');
const router = express.Router();
const axios = require('axios');

require("dotenv").config();

const PROPUBLICA_KEY = process.env.PROPUBLICA_KEY;

const getVoteInfo = async (bill) => {
        let voteUri = bill.vote_uri;
        const response = await axios.get(voteUri, {
            headers: {"X-API-Key" : PROPUBLICA_KEY}
        });
        const data = await response.data;
        return data;
}

router.get('/info', async (req, res, next) => {
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
})

router.get('/topics', async (req, res, next) => {
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

router.get('/bills', async (req, res, next) => {
    const keyword = req.query[0];
    const url = `https://api.propublica.org/congress/v1/bills/search.json?query=${keyword}`;
    try {
        const getBills = async () => {
            const response = await axios.get(url, {
                headers: {"X-API-Key": PROPUBLICA_KEY}
            });
            const data = await response.data;
            return data;
        }
        const billData = await getBills();
        res.send(billData);
    } catch (err) {
        console.log(err);
    }
    
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