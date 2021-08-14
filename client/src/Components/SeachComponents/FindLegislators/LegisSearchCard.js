import React, {useState} from 'react';
import NO_PIC from '../../../images/noPic.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { removePotentialSenator, removePotentialCongressperson } from '../../../redux/searchSlice';
import { trackSenator, trackCongressperson } from '../../../redux/interestsSlice';
import axios from 'axios';


export default function LegisSearchCard({ item }) {
    const [disappearing, setDisappearing] = useState(false);
    const dispatch = useDispatch();

    let tracked = false;
    const trackedLegislators = useSelector(state => state.interests.legislators);
    let trackedSenatorIds = trackedLegislators.senators.map(item => item.id);
    let trackedCongresspeopleIds = trackedLegislators.congresspeople.map(item => item.id);
    if (trackedSenatorIds.includes(item.id)) tracked = true;
    if (trackedCongresspeopleIds.includes(item.id)) tracked = true;

    const handleTrack = async (i) => {
        if (i.short_title === "Rep.") dispatch(trackCongressperson(i));
        if (i.short_title === "Sen.") dispatch(trackSenator(i));
        
        try {
            axios({
                method: "PATCH",
                data: i,
                withCredentials: true,
                url: `http://localhost:4000/userData/trackLegislator`
            }).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err)
        }
    }



    const handleRemove = () => {
        setDisappearing(true);
        setTimeout(removeLegislator, 500);
    }

    const removeLegislator = () => {
        let removalFunction;
        if (item.short_title === "Rep.") removalFunction = removePotentialCongressperson;
        if (item.short_title === "Sen." ) removalFunction = removePotentialSenator;
        dispatch(removalFunction(item));
        setDisappearing(false);
    }

    const handleImgError = (image) => {
        image.target.onError = "";
        image.target.src = NO_PIC;
        console.log("imgsrc:", image.src);
        return true;
    }

    let partyColor;
        if (item.party === "D") partyColor = "rgb(61, 250, 250)";
        if (item.party === "R") partyColor = "rgb(252, 90, 90)";

        const disappeared = {
            width: "0px",
            height: "100px",
            margin: "0px",
            opacity: 0,
            backgroundColor: partyColor
        }
    
        const notDisappeared = {
            width: "250px",
            height: "100px",
            margin: "10px",
            opacity: 1,
            backgroundColor: partyColor
        }

 
        return (
            <div className="legislatorSearchCard" style={disappearing ? disappeared : notDisappeared}>
                <img 
                    src={`https://theunitedstates.io/images/congress/225x275/${item.id}.jpg`}
                    alt={`${item.first_name} ${item.last_name}`}
                    onError={(img) => handleImgError(img)}
                />
                <div className="searchCardText">
                    <div>
                        <p>{item.first_name} <strong>{item.last_name}</strong></p>
                        <p><small><i>{item.party}, {item.state}{item.district && "-"}{item.district}</i></small></p>
                    </div>
                    <div className="searchCardButtons" style={{ textAlign: "right"}}>
                        {tracked ? <span>Tracking &#9745; </span> : <button onClick={() => handleTrack(item)}>Track</button>}
                        
                        <button onClick={handleRemove}><strong>X</strong></button>
                    </div> 
                </div> 
  
            </div> 
        )
}
