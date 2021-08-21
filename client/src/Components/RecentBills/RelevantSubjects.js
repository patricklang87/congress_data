import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';


export default function RelevantSubjects({ bill }) {
    const trackedSubjects = useSelector(state => state.interests.subjects);
    const [relevantSubjects, setRelevantSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [attemptedSearch, setAttemptedSearch] = useState(false);
    

const getRelevantSubjects = async () => {
    if (trackedSubjects.length <= 1) {
        console.log("no tracked subjects");
        return;
    }
    setLoading(true);
    axios({
        method: "GET",
        url: 'http://localhost:4000/scraper/subjectsSearch',
        params: {subjects: trackedSubjects, url: bill.congressdotgov_url}
      }).then((res) => {
        console.log(res.data);
        const subjs = res.data;
        return subjs;
    }).then((res) => {
        setRelevantSubjects(res);
        setLoading(false);
        setAttemptedSearch(true);
        return;
    }).catch((err) => {
          console.log(err);
          setLoading(false);
          setAttemptedSearch(true);
      }); 
    }

    let relevantSubjectsList = "Bill text mentions: ";
    for (let i in relevantSubjects) {
        if (i < relevantSubjects.length - 1) relevantSubjectsList += relevantSubjects[i] + ', ';
        else relevantSubjectsList += relevantSubjects[i] + '.';
    }

    const noMatchedSubjects = "Bill text contains no matches for tracked subjects."
    
    return (
        <div>
            <div><p>
                {(relevantSubjects.length < 1 && loading === false && attemptedSearch === false) && <button onClick={getRelevantSubjects}>Tracked Subjects</button>}
                <BeatLoader loading={loading} color="darkred" size={15} />
                {(relevantSubjects.length > 0) && relevantSubjectsList} 
                {(attemptedSearch === true && relevantSubjects.length < 1) && noMatchedSubjects}
                <span> </span>
                <a href={bill.congressdotgov_url + '/text'} rel="noreferrer" target="_blank">View Bill Text</a></p>
                
            </div>
        </div>
    )
}
