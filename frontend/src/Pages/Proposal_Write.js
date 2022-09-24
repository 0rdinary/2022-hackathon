import { AlignHorizontalLeft, FiberManualRecord, Margin, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box } from "@mui/system";
import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import "./Proposal.css"
import { Button, MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
                <text className="proposal_input_name">제안 제목</text>
                <br/>
                <input type="text" className="proposal_input_head" placeholder="제목" id="proposalHeadline" value={proposalHeadline} onChange={onChange}/>
            </div>
            <div className="proposal_input_content">
                <text className="proposal_input_name">카테고리</text>
                <br/>
                <FormControl sx={{width:500}} size="small">
                    <InputLabel id="select-tag">카테고리</InputLabel>
                    <Select
                        name="select-tag"
                        id="tag"
                        value={tag}
                        label="태그"
                        onChange={onChange}
                    >
                        {board_name.map((text, index) => (
                        <MenuItem value={board_name[index]}>{text}</MenuItem>))}
                    </Select>
                </FormControl>
            </div>
            <div className="proposal_input_content">
                <text className="proposal_input_name">제안 내용</text>
                <br/>
                <input type="text" className="proposal_input_body" placeholder="내용" id="proposalContent" value={proposalContent} onChange={onChange}/>
            </div>
            <div>
            <Button variant="contained" className="proposal_input_btn" style={{background:'#D91438'}}>작성</Button>
            <Button variant="outlined" className="proposal_input_btn" style={{borderColor:'#D91438'}}><text style={{color:"#D91438"}}>목록</text></Button>
            </div>
                
            <br />
            <p>제목 : {proposalHeadline}</p>
            <p>내용 : {proposalContent}</p>
            <p>카테고리 : {tag}</p>
        </Box>
    </div>
    )  
}

export default ProposalWrite;