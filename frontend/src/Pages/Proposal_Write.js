import { AlignHorizontalLeft, FiberManualRecord, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box } from "@mui/system";
import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import "./Proposal.css"

function ProposalWrite(){
    
    const columns = [
    { id: 'proposalHeadline', label: '제안 제목'},
    { id: 'proposalContent', label: '제안 내용'},
    { id: 'tag', label: '태그'},
    { id: 'writer', label: '작성자'},
    { id: 'date', label: '작성일자'}
  ];

    const [proposal, setProposal] = useState({
        proposalHeadline: "",
        proposalContent: "",
        tag: "",
        writer: "",
        date: ""
      });
    
      var board_name = ["문화/관광/체육", "교통", "복지", "여성/가족/교육",
                     "건강/보건/위생", "산업/경제", "환경", "소방/안전",
                     "도시주택/건설", "행정/재정/세정", "자유게시판"];
    
      const {proposalHeadline, proposalContent, tag, writer, date} = proposal;
    
      function onChange(e){
        const value = e.target.value;
        const id = e.target.id;
        setProposal({
            ...proposal,
            [id]:value
        })
      }

    return(
    <div>
        <Box display="table-row-group" justifyContent="flex-start" sx={{width:1000}} className="proposal_input_box">
            <div>
                <input type="text" className="proposal_input_head" placeholder="제목" id="proposalHeadline" value={proposalHeadline} onChange={onChange}/>
                <br/>
            </div>
            <hr />
            <div>
                <input type="text" className="proposal_input_body" placeholder="내용" id="proposalContent" value={proposalContent} onChange={onChange}/>
            </div>
            <br />
            <p>제목 : {proposalHeadline}</p>
            <p>내용 : {proposalContent}</p>
        </Box>
    </div>
    )  
}

export default ProposalWrite;