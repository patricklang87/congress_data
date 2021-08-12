import React, {useState} from 'react';
import NO_PIC from '../../../images/noPic.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { removePotentialSenator, removePotentialCongressperson } from '../../../redux/searchSlice';
import { removeSenator, removeCongressperson } from '../../../redux/interestsSlice';
import axios from 'axios';


export default function MyLegisCard({ item }) {
    const [disappearing, setDisappearing] = useState(false);
    const dispatch = useDispatch();

    const stopTracking = () => {
        if (item.short_title === "Rep.") dispatch(removeCongressperson(item));
        if (item.short_title === "Sen." ) dispatch(removeSenator(item));

        // try {
        //     axios({
        //         method: "GET",
        //         withCredentials: true,
        //         url: "http://localhost:4000/userData/data"
        //     }).then((res) => {
        //         console.log(res.data);
        //         //here you will patch this info into mongoose
        //     });
        // } catch (err) {
        //     console.log(err)
        // }
    }



    const handleStopTracking = () => {
        setDisappearing(true);
        setTimeout(stopTracking, 500);
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
                        <button onClick={handleStopTracking}><strong>Stop Tracking</strong></button>
                    </div> 
                </div> 
  
            </div> 
        )
}