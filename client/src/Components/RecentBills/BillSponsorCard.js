import React, {useState} from 'react';
import NO_PIC from '../../images/noPic.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { trackSenator, trackCongressperson } from '../../redux/interestsSlice';
import { loadPotentialSenators, loadPotentialCongresspeople } from '../../redux/searchSlice';
import axios from 'axios';


export default function BillSponsorCard({ item }) {
    const dispatch = useDispatch();

    let tracked = false;
    const trackedLegislators = useSelector(state => state.interests.legislators);
    const allSenators = useSelector(state => state.search.senators);
    const allCongresspeople = useSelector(state => state.search.congresspeople);
    let trackedSenatorIds = trackedLegislators.senators.map(item => item.id);
    let trackedCongresspeopleIds = trackedLegislators.congresspeople.map(item => item.id);
    if (trackedSenatorIds.includes(item.id)) tracked = true;
    if (trackedCongresspeopleIds.includes(item.id)) tracked = true;

    
    const getAll = () => {
        if (allSenators.length >= 1 || allCongresspeople.length >= 1) return true;
        try {
            axios.get('http://localhost:4000/propublica/all')
                .then(results => {
                    dispatch(loadPotentialCongresspeople(results.data.house));
                    dispatch(loadPotentialSenators(results.data.senate));
                    return true;
                });
        } catch (err) {
            console.log(err);
        }
    }

    const findSpecificMember = () => {
        let member;
        for (let senator of allSenators) {
            if (item.id === senator.id) {
                member = senator;
                return member;
            }
        }
        for (let rep of allCongresspeople) {
            if (item.id === rep.id) {
                member = rep;
                return member;
            }
        }
    }

    const saveMember = async (member) => {
        if (member.short_title === "Rep.") dispatch(trackCongressperson(member));
        if (member.short_title === "Sen.") dispatch(trackSenator(member));
        
        try {
            axios({
                method: "PATCH",
                data: member,
                withCredentials: true,
                url: `http://localhost:4000/userData/trackLegislator`
            }).then((res) => {
                return res.data;
            });
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleTrack = async () => {
        const potentialCongresspeopleLoaded = await getAll();
        const member = await findSpecificMember();
        saveMember(member);
    }

    const handleImgError = (image) => {
        image.target.onError = "";
        image.target.src = NO_PIC;
        return true;
    }

    let partyColor;
        if (item.party === "D") partyColor = "rgb(61, 250, 250)";
        if (item.party === "R") partyColor = "rgb(252, 90, 90)";
 
        return (
            <div className="legislatorSearchCard" style={{backgroundColor: partyColor}}>
                <img 
                    src={`https://theunitedstates.io/images/congress/225x275/${item.id}.jpg`}
                    alt={`${item.first_name} ${item.last_name}`}
                    onError={(img) => handleImgError(img)}
                />
                <div className="searchCardText" style={{marginLeft: '5px'}}>
                    <div>
                        <p>{item.first_name} <strong>{item.last_name}</strong></p>
                        <p><small><i>{item.party}-{item.state}</i></small></p>
                    </div>
                    <div className="searchCardButtons" style={{ textAlign: "right", marginRight: '5px', marginBottom: '5px'}}>
                        {tracked ? <span>Tracking &#9745; </span> : <button onClick={handleTrack}>Track</button>}
                    </div> 
                </div> 
  
            </div> 
        )
}