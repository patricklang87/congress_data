import React from 'react';
import { useSelector } from 'react-redux';
// import SearchWithinLegislators from './SearchWithinLegislators';
import LegisSearchCard from './LegisSearchCard';
// import SearchLegislators from './SearchLegislators';
// import TrackAllDismissAll from './TrackAllDismissAll';
import './LegislatorsList.css';
import { loadPotentialSenators, removePotentialSenator, loadPotentialCongresspeople, removePotentialCongressperson } from '../../../redux/interestsSlice';


export default function LegislatorsList() {
    const nameSearchTerm = useSelector(state => state.search.nameSearchTerm);
    const stateSearchTerm = useSelector(state => state.search.stateSearchTerm);
    const districtSearchTerm = useSelector(state => state.search.districtSearchTerm);
    const house = useSelector(state => state.search.congresspeople);
    const senate = useSelector(state => state.search.senators);
    

// refactor this so that it searches names, states, and districts separately



    const searchedHouse = house.filter(item => {
        let fits = false;
        let searchTermComp1 = nameSearchTerm.split(' ');
        for (let comp of searchTermComp1) {
            console.log("component:", comp);
            if (item.first_name.toLowerCase().includes(nameSearchTerm.toLowerCase()) || item.last_name.toLowerCase().includes(nameSearchTerm.toLowerCase())) {
                fits = true;
            }
        }  
        return fits; 
    }).filter(item => {
        if (stateSearchTerm !== "") {
            return item.state.includes(stateSearchTerm)
        } else {
            return true;
        }
    }).filter(item => {
        if (districtSearchTerm !== "") {
            return item.district.includes(districtSearchTerm)
        } else {
            return true;
        }
    });

    const houseDisplay = searchedHouse.map(item => {
        return <LegisSearchCard item={item} />
    });

    const searchedSenate = senate.filter(item => {
        let fits = false;
        let searchTermComp1 = nameSearchTerm.split(' ');
        for (let comp of searchTermComp1) {
            console.log("component:", comp);
            if (item.first_name.toLowerCase().includes(comp.toLowerCase()) || item.last_name.toLowerCase().includes(comp.toLowerCase()) || item.state.toLowerCase().includes(comp.toLowerCase())) {
                fits = true;
            }
        }  
        return fits; 
    }).filter(item => {
        return item.state.includes(stateSearchTerm);
    })

    const senateDisplay = searchedSenate.map(item => {
        return <LegisSearchCard item={item} />
    });


    return (
        <div>
            {/* <SearchLegislators /> 
            <SearchWithinLegislators />
            <TrackAllDismissAll /> */}
           
           
           <div className="legislatorSearchDisplay">
                <div>
                    <h2>House</h2>
                    <div className="legislatorChamberDisplay">
                        {houseDisplay}
                    </div> 
                </div>
                <div>
                    <h2>Senate</h2>
                    <div className="legislatorChamberDisplay">
                        {senateDisplay}
                    </div> 
                </div>
           </div>
        </div>
    )
}