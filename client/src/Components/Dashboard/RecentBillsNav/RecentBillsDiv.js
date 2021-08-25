import React from 'react';
import {useSelector} from 'react-redux';
import RecentBillsNav from './RecentBillsNav';
import BillRefresh from './BillRefresh';
import BillUpdate from './BillUpdate';

export default function RecentBillsDiv() {
    const dashFolder = useSelector(state => state.views.dashFolder);
    return (
        <div>
            <RecentBillsNav />

            {(dashFolder === 'Recent Bills') && <BillRefresh />}
            {(dashFolder === 'My Bills') && <BillUpdate />}
        </div>
    )
}
