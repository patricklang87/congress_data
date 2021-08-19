import React, { useState } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';

export default function RecentVoteBillDetails({ voteData }) {
    const [billDetails, setBillDetails] = useState(null);
    const [showBillDetails, setShowBillDetails] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadDetails = () => {
        const url = voteData.bill.api_uri;
        console.log('url', url)
        setLoading(true);
        try {
            axios({
                method: "GET",
                params: {url: url},
                url: `http://localhost:4000/propublica/billDetails`
            }).then((res) => {
                console.log(res.data);
                setBillDetails(res.data);
                setLoading(false);
            });
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = () => {
        if (billDetails == null) {
            loadDetails();
        }
        setShowBillDetails(!showBillDetails);
    }

    const detailsVisible = (showBillDetails) ? "block" : "none";

    const BillDetails = () => {
        return (
            <p>{billDetails.results[0].summary}</p>
        );
    }

    const Loader = () => {
        return (
            <div>
                <BeatLoader loading={loading} color="darkred" size={50} />
            </div>
        )
    }

    return (
        <div>
            <div>
                <button onClick={handleClick}>{(showBillDetails) ? "Hide Bill Details" : "Show Bill Details"}</button>
            </div>
            <Loader />
            <div style={{display: detailsVisible}}>
                {(billDetails) && <BillDetails />}
            </div>
        </div>
    )
}
