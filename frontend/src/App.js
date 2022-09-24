import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router,Routes, Route, useLocation} from "react-router-dom";
import Transition from './Pages/Transition';
import Navbar from "./Pages/Navbar";

function App() {
    return (
        <Router>
            <div className='navbar_div'>
                <Navbar />
                <Transition />
            </div>
        </Router>
    );
}

export default App;