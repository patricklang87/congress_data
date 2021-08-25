import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addBookmarkedBill, removeBookmarkedBill } from '../../../redux/billsSlice';



export default function BillUpdate() {
    const dispatch = useDispatch();
    const bookmarkedBills = useSelector(state => state.bills.bookmarkedBills);

    const handleBookmark = (bill) => {
        dispatch(addBookmarkedBill(bill));
        try {
            axios({
                method: "PATCH",
                data: {bill: bill},
                withCredentials: true,
                url: `http://localhost:4000/userData/bookmarkBill`
            }).then((res) => {
            });
        } catch (err) {
            console.log(err)
        }
    };

    const handleRemoveBookmark = (bill) => {
        dispatch(removeBookmarkedBill(bill));
        try {
            axios({
                method: "DELETE",
                data: {bill: bill},
                withCredentials: true,
                url: `http://localhost:4000/userData/unbookmarkBill`
            }).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err)
        }
    }

    const updateBookmarked = () => {
        for (let bill of bookmarkedBills) {
            axios({
                method: "GET",
                url: 'http://localhost:4000/propublica/billDetails',
                params: {url: bill.bill_uri}
            }).then((res) => {
                return res.data.results[0];
            }).then((res) => {
                handleRemoveBookmark(bill);
                handleBookmark(res);
            }).catch((err) => {
                console.log(err)}
            );
        }
    };
 
    return (
        <div>
            <div className="dashNavOptions" >
                <p onClick={updateBookmarked}>Update</p>
            </div>
        </div>
    );
}
