import React from 'react';
import { useSelector } from 'react-redux';
import SubjectPreviewCard from './SubjectPreviewCard';
import './SubjectsList.css';

export default function SubjectsList() {
    const potentialSubjects = useSelector(state => state.search.subjects);
    const searchTerm = useSelector(state => state.search.searchInSubjectsTerm);

    const filteredSubjects = potentialSubjects.filter((subj) => {
        return subj.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    const subjects = filteredSubjects.map((subj) => {
        return <SubjectPreviewCard key={subj.name + '_searchCard'} subj={subj} />;
    });

    return (
        <div>
            <div>
                <h1>Legislative Subjects</h1>
            </div>
            <div className="SubjectsList">
                {subjects}
            </div>
            
        </div>
    )
}
