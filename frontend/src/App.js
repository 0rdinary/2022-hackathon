import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Routes, Route, Link} from "react-router-dom";
import Home from "./Pages/Home"
import Navbar from "./Pages/Navbar"

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <Router>
        <div>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
            
        </div>
        </Router>
    );
}

export default App;