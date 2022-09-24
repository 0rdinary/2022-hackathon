import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import DocWrite from "./Pages/DocWrite";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import Board from "./Pages/Board";
import Proposal from "./Pages/Proposal";
import Written from './Pages/Written';
import ProposalWrite from './Pages/Proposal_Write';

function App() {
    return (
        <Router>
            <div className='navbar_div'>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/board" element={<Board/>}/>
                    <Route path="/proposal" element={<Proposal/>}/>
                    <Route path="/written" element={<Written/>}/>
                    <Route path="/proposal/write" element={<ProposalWrite/>}/>
                    <Route path="/doc/write" element={<DocWrite/>}/>
                    <Route path="/doc/view" />
                </Routes>
            </div>
        </Router>
    );
}

export default App;