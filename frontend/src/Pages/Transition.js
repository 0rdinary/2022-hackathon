import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";
import DocWrite from "./DocWrite";
import Home from "./Home";

import Board from "./Board";
import Proposal from "./Proposal";
import Written from './Written';
import ProposalWrite from './Proposal_Write';
import "./Transition.css";


function Transition(){

  const location = useLocation();

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
        <Routes location={location}>
        <Route path="/" element={<Home/>} />
        <Route path="/board" element={<Board/>}/>
        <Route path="/proposal" element={<Proposal/>}/>
        <Route path="/written" element={<Written/>}/>
        <Route path="/proposal/write" element={<ProposalWrite/>}/>
        <Route path="/doc/write" element={<DocWrite/>}/>
        <Route path="/doc/view/:id" element={<Proposal/>}/>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;