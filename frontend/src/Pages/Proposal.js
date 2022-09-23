import { FiberManualRecord, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";
import Grid from '@mui/material/Grid';
import "./Proposal.css"

const columns = [
    { id: 'num', label: '번호' },
    { id: 'status', label: '상태'},
    { id: 'proposalHeadline', label: '제안 제목'},
    { id: 'proposalContent', label: '제안 내용'},
    { id: 'tag', label: '태그'},
    { id: 'writer', label: '작성자'},
    { id: 'date', label: '작성일자'},
    { id: 'agree', label: '찬성'},
    { id: 'disagree', label: '반대'},
  ];

  function createData(num, status,proposalHeadline, proposalContent,tag, writer, date, agree, disagree) {
    return { num, status,proposalHeadline, proposalContent,tag, writer, date, agree, disagree };
  }
  
  const Data = 
    createData('1', '제안 진행중','싱싱한 대구 팝니다', '대구 1마리 32800\n대구 2마리 45800\n대구 100마리 328000','수산', '바른횟집', '22/09/22', 15, 15);
  

function Proposal(){
    return(
    <div className="proposal">
        <Box sx={{width:1000}}>
        <div className="proposal_head">
            <div>
                <h3 className="proposalStatus">- {Data.status} -</h3>
            </div>
            <div>
                <h1>{Data.proposalHeadline}</h1>
            </div>
            <div className="thumbs">
                <ThumbUp/> <text className="thumbs_text">{Data.agree}  </text>
                <text>  |  </text>
                <ThumbDown/> <text className="thumbs_text">{Data.disagree}</text>
            </div>
            <div className="box_div">
                <Box component="span"
                    sx={{width:1000, height:50, backgroundColor: '#183459',
                         justifyContent:"center", alignItems:"center", border: '1px grey'}}>
                    <Grid container direction="row" alignItems="center" className="box_inside">
                        <Grid item xs>
                        <text className="box_text_category">문제 분류</text>
                    <text className="box_text"> {Data.tag}</text>
                        </Grid>
                        <Grid item xs>
                        <text className="box_text_category">작성자</text>
                        <text className="box_text">  {Data.writer}</text>
                        </Grid>
                        <Grid item xs>
                        <text className="box_text_category">작성일자</text>
                        <text className="box_text">  {Data.date}</text>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
        <div className="proposal_body">
            <div>
                <h2>제안 내용</h2>
            </div>
            <div>
            <hr className="line"/>
            </div>
            <div>
                <text className="proposalContent">
                {Data.proposalContent}
                </text>
            </div>
        </div>
        </Box>
    </div>
    )  
}

export default Proposal;