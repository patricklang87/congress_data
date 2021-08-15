import React from 'react';
import RecentSearches from './RecentSearches';
import SubjectSearchBar from './SubjectSearchBar';
import SearchInResults from './SearchInResults';
import './SearchSubjects.css';

export default function SearchSubjects() {
    return (
        <div>
            <SubjectSearchBar />
            <SearchInResults />
            <RecentSearches />
        </div>
    )
}
