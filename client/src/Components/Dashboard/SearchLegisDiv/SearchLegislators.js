import React from 'react';
import GetDistrict from './GetDistrict';
import LegislatorsView from './LegislatorsView';
import SearchWithinLegisList from './SearchWithinLegisList';

export default function SearchLegislators() {
    return (
        <div className="SearchLegislators">
            <SearchWithinLegisList />
            <GetDistrict />
            <LegislatorsView />    
        </div>
    )
}
