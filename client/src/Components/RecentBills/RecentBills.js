import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecentBillCard from './RecentBillCard';
import './RecentBills.css';
import BeatLoader from 'react-spinners/BeatLoader';

export default function RecentBills() {
    const [recentBills, setRecentBills] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecentBills();
    }, []);
    
    const fetchRecentBills = () => {
        setRecentBills([]);
        setLoading(true);
        axios({
            method: "GET",
            url: "http://localhost:4000/propublica/recentBills"
          }).then((res) => {
            console.log(res.data);
            const bills = res.data;
            return bills;
        }).then((res) => {
                setLoading(false);
                setRecentBills(res);       
        }).catch((err) => {
              console.log(err);
          }); 
    }
    
    const recentBillDisplay = recentBills.map(bill => {
        return <RecentBillCard bill={bill} key={bill.bill_id} />
    })

    const Loader = () => {
        return (
            <div style={{top: '200px', position: "relative"}}>
                <BeatLoader loading={loading} top={150} color="darkred" size={100} />
            </div>
        )
    }

    return (
        <div>
            <button onClick={fetchRecentBills} >Refresh</button>
            {(loading) ? <Loader /> : recentBillDisplay}
        </div>

    )
}