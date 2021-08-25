import React from 'react';
import { useSelector } from 'react-redux';
import MySubjectCard from './MySubjectCard';

export default function MySubjects() {
    const subjects = useSelector(state => state.interests.subjects);
    const searchTerm = useSelector(state => state.interests.subjectFilterTerm);

    const filteredSubjects = subjects.filter((subj) => {
        return subj.toLowerCase().includes(searchTerm.toLowerCase());
    })

    const subjectsDisplay = filteredSubjects.map((subj) => {
        return <MySubjectCard key={subj + '_myCard'} subj={subj} />;
    });

    return (
        <div>
            <div className="SubjectsList">
                {subjectsDisplay}
            </div>
            
        </div>
    )
}