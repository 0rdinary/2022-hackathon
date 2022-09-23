import React from "react";
import Box from '@mui/material/Box';
import './Home.css'
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import Grid from '@mui/material/Grid';

function createData(proposalHeadline, tag, agree, disagree) {
    return {proposalHeadline, tag, agree, disagree};
  }
  
  const MainProposal = 
    createData('싱싱한 대구 팝니다','수산', 15, 15);
function Home(){

    return(
        <div className="home">
            <div>
                <h2>주요 제안</h2>  
                <Box sx={{width:600, height:300, border:1}}>
                <Grid container direction="column" alignItems="center">
                <Grid item xs>
                <text className="mainbox_tag">- {MainProposal.tag} -</text>
                    </Grid>
                    <Grid item xs>
                    <text className="mainbox_head">{MainProposal.proposalHeadline}</text>
                    </Grid>
                    <Grid item xs>
                    <ThumbUp/> <text>{MainProposal.agree}  </text>
                <text>  |  </text>
                <ThumbDown/> <text>{MainProposal.disagree}</text>
                    </Grid>
                </Grid>
            </Box>
            <div>
                    <h2>카테고리 별</h2>
                    <Grid container direction="row" alignItems="center">
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    <Grid item xs><Box sx={{width:50, height:50, border:1}}></Box></Grid>
                    </Grid>
                </div>
            </div>
            
        </div>
    )
}

export default Home;