import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useTransition, animated } from 'react-spring';


export default function AuthBox() {
    const [showingLogin, setShowingLogin] = useState(true);

    const toggleTransition = useTransition(showingLogin, {
        from: {opacity: 0, position: 'absolute'},
        enter: {opacity: 1, position: 'absolute'},
        leave: {opacity: 0, position: 'absolute'},
        config: {
            duration: 300
        }
    });

    return toggleTransition((style, item) => item ? (
        <animated.div style={style}>
                <Login className="authBox" setShowingLogin={setShowingLogin} />
        </animated.div>
    ) : (
        <animated.div style={style} >
            <Register className="authBox" setShowingLogin={setShowingLogin} />
        </animated.div>
    ))
    // (
    //     <div>
    //             <div className="authBox">
    //                 {(showingLogin) ? <Login setShowingLogin={setShowingLogin} /> : <Register setShowingLogin={setShowingLogin} />}
    //             </div>
    //     </div>
    // )
}
