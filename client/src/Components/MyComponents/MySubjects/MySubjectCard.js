import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeSubject } from '../../../redux/interestsSlice';
import axios from 'axios';

export default function MySubjectCard({ subj }) {
    const dispatch = useDispatch();
    const [disappearing, setDisappearing] = useState(false);

    

    const disappeared = {
        width: "0px",
        height: "46px",
        margin: "0px",
        padding: '0px',
        opacity: 0
    }

    const notDisappeared = {
        width: "240px",
        height: "46px",
        margin: "10px",
        padding: '10px',
        opacity: 1
    }

    const handleRemove = () => {
        setDisappearing(true);
        setTimeout(untrackSubject, 500);
    }

    const untrackSubject = () => {
        dispatch(removeSubject(subj));
        try {
            axios({
                method: "DELETE",
                data: {subject: subj},
                withCredentials: true,
                url: "http://localhost:4000/userData/untrackSubject"
            }).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err)
        }
        setDisappearing(false);
    }

    return (
        <div style={(disappearing) ? disappeared : notDisappeared} className="subjectSearchCard">
            <div>
                <p>{subj}</p>
            </div>
            <div className="searchCardButtons" >
                <button onClick={handleRemove}>Untrack</button>
            </div> 
        </div>
    )
}
 