import { Box } from "@mui/system";
import React from "react";
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
            <div>
                <h3 className="proposalStatus">- {Data.status} -</h3>
            </div>
            <div>
                <h1>{Data.proposalHeadline}</h1>
            </div>
            <div className="box_div">
                <Box
                    sx={{width:400, height:100, backgroundColor: '#183459',
                         justifyContent:"center", alignItems:"center"}}>
                    
                </Box>
            </div>
            <div>
                <text className="proposalContent">
                {Data.proposalContent}
                </text>
            </div>
        </div>
    )  
}

export default Proposal;