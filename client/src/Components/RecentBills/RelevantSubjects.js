import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';


export default function RelevantSubjects({ bill }) {
    const trackedSubjects = useSelector(state => state.interests.subjects);
    const [relevantSubjects, setRelevantSubjects] = useState([]);
    const [loading, setLoading] = useState(false);

    

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
    }).catch((err) => {
          console.log(err);
          setLoading(false);
      }); 
    }

    let relevantSubjectsList = "Fulltext mentions: ";
    for (let i in relevantSubjects) {
        if (i < relevantSubjects.length - 1) relevantSubjectsList += relevantSubjects[i] + ', ';
        else relevantSubjectsList += relevantSubjects[i] + '.';
    }
    
    return (
        <div>
            <div>
                {(relevantSubjects.length < 1 && loading === false) && <button onClick={getRelevantSubjects}>Tracked Subjects</button>}
                <BeatLoader loading={loading} color="darkred" size={15} />
                <p>{(relevantSubjects.length > 0) && relevantSubjectsList}</p>
            </div>
        </div>
    )
}
