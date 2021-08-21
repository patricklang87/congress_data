import React from 'react'

export default function DashNavTwo() {
    const dashNavTwoStyle = {
        backgroundColor: 'white',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        borderBottom: 'solid 1px red',
        color: 'black',
        zIndex: '4'
    }

    return (
        <div style={dashNavTwoStyle}>
            <p>
                <span>Subjects</span>
                <span>Legislators</span>
                <span>Bills</span>
            </p>

        </div>
    )
}
