import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removePotentialSubject } from '../../../redux/searchSlice';
import { addSubject } from '../../../redux/interestsSlice';
import axios from 'axios';

export default function SubjectPreviewCard({ subj }) {
    const dispatch = useDispatch();
    const trackedSubjects = useSelector(state => state.interests.subjects);
    const tracked = trackedSubjects.includes(subj.name);
    const [disappearing, setDisappearing] = useState(false);

    const handleTrack = (subj) => {
        dispatch(addSubject(subj));

        try {
            axios({
                method: "PATCH",
                data: subj,
                withCredentials: true,
                url: `http://localhost:4000/userData/trackSubject`
            }).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err)
        }
    }

    const disappeared = {
        width: "0px",
        height: "46px",
        margin: "0px",
        opacity: 0
    }

    const notDisappeared = {
        width: "240px",
        height: "46px",
        margin: "10px",
        opacity: 1
    }

    const handleRemove = () => {
        setDisappearing(true);
        setTimeout(removeSubject, 500);
    }

    const removeSubject = () => {
        dispatch(removePotentialSubject(subj));
        setDisappearing(false);
    }

    const trackedStyle = {
        backgroundColor: "FloralWhite"
    }

    return (
        <div style={(disappearing) ? disappeared : notDisappeared} className="subjectSearchCard">
            <div>
                <p>{subj.name}</p>
            </div>
            <div className="searchCardButtons" >
                {tracked ? <span>&#9745; </span> : <button onClick={() => handleTrack(subj.name)}>Track</button>}
                <button onClick={handleRemove}><strong>X</strong></button>
            </div> 
        </div>
    )
}
 