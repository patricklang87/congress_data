import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setTrackedSubjectBills, setAllSubjectBills } from '../../../redux/billsSlice';



export default function BillRefresh() {
    const dispatch = useDispatch();
    const byTrackedSubjects = useSelector(state => state.bills.byTrackedSubjects);
    const trackedSubjects = useSelector(state => state.interests.subjects);



    const fetchEndpoint = (byTrackedSubjects) ? 'billsByTrackedSubject' : 'recentBills';

    let trackedSubjectsQuery = '';
    for (let item of trackedSubjects) {
        if (item.includes(" ")) {
            item = `"${item}"`;
        }
        trackedSubjectsQuery = trackedSubjectsQuery + item + ' ';
    }

    const fetchRecentBills = () => {
        if (byTrackedSubjects === true) {
            dispatch(setTrackedSubjectBills([]));
        } else {
            dispatch(setAllSubjectBills([]));
        }      
        axios({
            method: "GET",
            url: `http://localhost:4000/propublica/${fetchEndpoint}`,
            params: {query: trackedSubjectsQuery}
          }).then((res) => {
            console.log(res.data);
            const bills = res.data;
            return bills;
        }).then((res) => {
                if (byTrackedSubjects === true) {
                    dispatch(setTrackedSubjectBills(res));
                } else {
                    dispatch(setAllSubjectBills(res));
                }      
        }).catch((err) => {
              console.log(err);
          }); 
    };
 
    return (
        <div>

            <div className="dashNavOptions" >
                <p onClick={fetchRecentBills}>Refresh</p>
            </div>
        </div>
    );
}

