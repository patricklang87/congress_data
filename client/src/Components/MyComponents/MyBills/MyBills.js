import React from 'react';
import { useSelector} from 'react-redux';
import RecentBillCard from '../../RecentBills/RecentBillCard';
import '../../RecentBills/RecentBills.css';

export default function MyBills() {
    const bookmarkedBills = useSelector(state => state.bills.bookmarkedBills);
    
    const recentBillDisplay = bookmarkedBills.map(bill => {
        return <RecentBillCard bill={bill} key={bill.bill_id + '_bookmarked'} />
    })


    return (
        <div>
            <button >Refresh</button>
            {recentBillDisplay}
        </div>

    )
}