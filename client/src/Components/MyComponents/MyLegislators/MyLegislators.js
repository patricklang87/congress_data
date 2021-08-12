import React from 'react';
import { useSelector } from 'react-redux';
import MyLegisCard from './MyLegisCard';
import { loadPotentialSenators, removePotentialSenator, loadPotentialCongresspeople, removePotentialCongressperson } from '../../../redux/interestsSlice';


export default function MyLegislators() {
    const nameSearchTerm = useSelector(state => state.search.nameSearchTerm);
    const stateSearchTerm = useSelector(state => state.search.stateSearchTerm);
    const districtSearchTerm = useSelector(state => state.search.districtSearchTerm);
    const house = useSelector(state => state.interests.legislators.congresspeople);
    const senate = useSelector(state => state.interests.legislators.senators);
    const legislatorView = useSelector(state => state.views.legislatorView);
    

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
        return <MyLegisCard key={item.id + "my"} item={item} />
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
        return <MyLegisCard key={item.id + "my"} item={item} />
    });



    let HouseD = (style) => {
        return (
            <div className={(legislatorView === 'house' || legislatorView === 'senate') ? 'legisListFullWidth' : ''}>
                <h2>House</h2>    
                <div className="legislatorChamberDisplay">    
                    {houseDisplay}
                </div> 
            </div>
        );
    } 

    let SenateD = (style) => {
        return (
            <div className={(legislatorView === 'house' || legislatorView === 'senate') ? 'legisListFullWidth' : ''} >
                <h2>Senate</h2>
                <div className="legislatorChamberDisplay" >
                    {senateDisplay}
                </div> 
        </div>
        );
    }
        


    if (legislatorView === 'house' || legislatorView === 'sideBySide') {
        return (
            <div className="legislatorSearchDisplay">
                <HouseD />
                <SenateD />
            </div>
        );    
    } else if (legislatorView === 'senate') {
        return (
            <div className="legislatorSearchDisplay">
                <SenateD />
                <HouseD />    
            </div>
        );    
    }

}