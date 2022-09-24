import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import DocWrite from "./Pages/DocWrite";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import Board from "./Pages/Board";
import Proposal from "./Pages/Proposal";
import Profile from './Pages/Profile';
import ProposalWrite from './Pages/Proposal_Write';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/board" element={<Board/>}/>
                    <Route path="/proposal" element={<Proposal/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/proposal/write" element={<ProposalWrite/>}/>
                    <Route path="/doc/write" element={<DocWrite/>}/>
                    <Route path="/doc/view" />
                </Routes>
            </div>
        </Router>
    );
}

export default App;