import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useTransition, animated } from 'react-spring';


export default function AuthBox() {
    const [showingLogin, setShowingLogin] = useState(true);

    const visible = {
        opacity: 1,
        display: 'block'
    }

    const invisible = {
        opacity: 0,
        display: 'none'
    }

    // const toggleTransition = useTransition(showingLogin, {
    //     from: {opacity: 0, position: 'absolute'},
    //     enter: {opacity: 1, position: 'absolute'},
    //     leave: {opacity: 0, position: 'absolute'},
    //     config: {
    //         duration: 300
    //     }
    // });

    return (
        <div>
            <div className='authBox' style={(showingLogin) ? visible : invisible}>
                <Login className="authBox" setShowingLogin={setShowingLogin} />
            </div>
            <div className='authBox' style={(showingLogin) ? invisible: visible}>
                <Register className="authBox" setShowingLogin={setShowingLogin} />
            </div>

        
            
        </div>

    );
}
