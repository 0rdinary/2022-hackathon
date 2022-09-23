import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Routes, Route, Link} from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import Board from "./Pages/Board";
import Proposal from "./Pages/Proposal";
import Profile from './Pages/Profile';
import ProposalWrite from './Pages/Proposal_Write';

const menuItems = [
    { name: 'home', label: '메인화면' },
    { name: 'board', label: '게시판' },
    { name: 'proposal', label: '제안' }
]

function App() {
   const [data, setData] = useState('')

//    useEffect(() => {
//            axios.get('/api/dbtest', {
//                params: {
//                    doc: "iOeMpq8T604tKL5Cuh9w"
//                }
//            })
//                .then(response => setData(response.data))
//                .catch(error => console.log(error))
//        }, []);

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;