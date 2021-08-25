import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setByTrackedSubjects, setTrackedSubjectBills, setAllSubjectBills, } from '../../redux/billsSlice';
import axios from 'axios';
import RecentBillCard from './RecentBillCard';
import './RecentBills.css';
import BeatLoader from 'react-spinners/BeatLoader';

export default function RecentBills() {
    const dispatch = useDispatch();
    const byTrackedSubjects = useSelector(state => state.bills.byTrackedSubjects);
    const trackedSubjectBills = useSelector(state => state.bills.trackedSubjectBills);
    const allSubjectBills = useSelector(state => state.bills.allSubjectBills);
    const [loading, setLoading] = useState(false);
    const trackedSubjects = useSelector(state => state.interests.subjects);

    useEffect(() => {
        if (trackedSubjects.length < 1) dispatch(setByTrackedSubjects(false));
    }, [dispatch, trackedSubjects.length]);

    let currentBillSet = (byTrackedSubjects) ? trackedSubjectBills : allSubjectBills;

    const fetchEndpoint = (byTrackedSubjects) ? 'billsByTrackedSubject' : 'recentBills';

    let trackedSubjectsQuery = '';
    for (let item of trackedSubjects) {
        if (item.includes(" ")) {
            item = `"${item}"`;
            console.log(item);
        }
        trackedSubjectsQuery = trackedSubjectsQuery + item + ' ';
    }

    const fetchRecentBills = useCallback(() => {
        if (byTrackedSubjects === true) {
            dispatch(setTrackedSubjectBills([]));
        } else {
            dispatch(setAllSubjectBills([]));
        }      
        setLoading(true);
        axios({
            method: "GET",
            url: `http://localhost:4000/propublica/${fetchEndpoint}`,
            params: {query: trackedSubjectsQuery}
          }).then((res) => {
            console.log(res.data);
            const bills = res.data;
            return bills;
        }).then((res) => {
                setLoading(false);
                if (byTrackedSubjects === true) {
                    dispatch(setTrackedSubjectBills(res));
                } else {
                    dispatch(setAllSubjectBills(res));
                }      
        }).catch((err) => {
              console.log(err);
          }); 
    }, [byTrackedSubjects, dispatch, fetchEndpoint, trackedSubjectsQuery]);

    useEffect(() => {
        if (currentBillSet.length === 0) {
            fetchRecentBills();
        }
    }, [currentBillSet.length, fetchRecentBills]);


    const recentBillDisplay = currentBillSet.map(bill => {
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
            {(loading) ? <Loader /> : recentBillDisplay}
        </div>

    )
}