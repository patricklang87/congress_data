import React from 'react';
import { useSelector } from 'react-redux';
import MyLegisCard from './MyLegisCard';



export default function MyLegislators() {
    // const nameSearchTerm = useSelector(state => state.search.nameSearchTerm);
    // const stateSearchTerm = useSelector(state => state.search.stateSearchTerm);
    // const districtSearchTerm = useSelector(state => state.search.districtSearchTerm);
    const house = useSelector(state => state.interests.legislators.congresspeople);
    const senate = useSelector(state => state.interests.legislators.senators);
    const legislatorView = useSelector(state => state.views.legislatorView);
    const filterTerm = useSelector(state => state.interests.legislatorFilterTerm );
    
    const searchedHouse = house.filter(item => {
        let fits = false;
        let searchTermComp1 = filterTerm.split(' ');
        for (let comp of searchTermComp1) {
            console.log("component:", comp);
            if (item.first_name.toLowerCase().includes(comp.toLowerCase()) || item.last_name.toLowerCase().includes(comp.toLowerCase()) || item.state.toLowerCase().includes(comp.toLowerCase()) || item.district.includes(comp)) {
                fits = true;
            }
        }  
        return fits; 
    });

    const houseDisplay = searchedHouse.map(item => {
        return <MyLegisCard key={item.id + "my"} item={item} />
    });

    const searchedSenate = senate.filter(item => {
        let fits = false;
        let searchTermComp1 = filterTerm.split(' ');
        for (let comp of searchTermComp1) {
            console.log("component:", comp);
            if (item.first_name.toLowerCase().includes(filterTerm.toLowerCase()) || item.last_name.toLowerCase().includes(filterTerm.toLowerCase()) || item.state.toLowerCase().includes(filterTerm.toLowerCase())) {
                fits = true;
            }
        }  
        return fits; 
    });


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