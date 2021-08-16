import React from 'react';
import LegislatorsView from '../SearchLegisDiv/LegislatorsView';
import FilterMyLegislators from './FilterMyLegislators';

export default function MyLegisDiv() {
    return (
        <div>
            <FilterMyLegislators />
            <LegislatorsView />
        </div>
    )
}
