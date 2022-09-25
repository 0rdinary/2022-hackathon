import React, { useEffect, useState } from "react";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import axios from 'axios';
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import "./Proposal.css"
 
var board_name = ["문화/관광/체육", "교통", "복지", "여성/가족/교육",
                  "건강/보건/위생", "산업/경제", "환경", "소방/안전",
                  "도시주택/건설", "행정/재정/세정", "자유게시판"]
var tag_name = ["culture", "traffic", "welfare", "education", "health", "economy",
                "environment", "safety", "construction", "administration"];

var dic = {};
tag_name.forEach((key, i) => dic[key] = board_name[i]);

function Proposal() {
    var day = '';
    const { id } = useParams();
    const [document, setDocument] = useState({
        title: '',
        content: '',
        up: 0,
        down: 0,
        writer: '',
        tag: 'culture',
        date: ''
    });
    const [comment, setComment] = useState({
        id: id,
        writer: '',
        content: ''
    })
    const [comments, setComments] = useState([]);

    const submitComment = () => {
        axios.post('/api/fb/insertComment', {
            "id": id,
            "writer": comment.writer,
            "content": comment.content
        },{
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=> {
            alert("등록 완료");
            console.log(response.data);
            setComments(comments => [...comments, comment]);
        })
    };

    const commentChange = (event) => {
        const { name, value } = event.target;

        setDoc({
            ...comment,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get('/api/fb/doc', {
            params: {
                id: id
            }
        })
        .then(response => {
          setDocument(response.data.content);
        })
        .catch(error => console.log(error));

        axios.get('/api/fb/comment', {
            params: {
                id: id
            }
        })
        .then(response => {
            setComments(response.data.content);
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        console.log(document);
        if (document['date'] !== '') {
            day = new Date(document['date']['seconds']*1000);
            day = day.toLocaleDateString('ko-KR');
        }
    }, [document]);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    return(
    <div className="proposal">
        <Box sx={{width:'100%'}}>
            <div className="proposal_head">
                <div>
                    <h3 className="proposalStatus">- {"제안 진행중"} -</h3>
                </div>
                <div>
                    <h1>{document.title}</h1>
                    <div className="box_div">
                        <Box component="span"
                            sx={{width:1000, height:50, backgroundColor: '#183459',
                                justifyContent:"center", alignItems:"center", border: '1px grey'}}>
                            <Grid container direction="row" alignItems="center" className="box_inside">
                                <Grid item xs>
                                <text className="box_text_category">카테고리</text>
                            <text className="box_text"> {dic[document.tag]}</text>
                                </Grid>
                                <Grid item xs>
                                <text className="box_text_category">작성자</text>
                                <text className="box_text">  {document.writer}</text>
                                </Grid>
                                <Grid item xs>
                                <text className="box_text_category">작성일자</text>
                                <text className="box_text">  {day}</text>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: document.content}}>
                    </div>
                </div>
                <div className="thumbs">
                    <ThumbUp/> <text className="thumbs_text">{document.up}  </text>
                    <text>  |  </text>
                    <ThumbDown/> <text className="thumbs_text">{document.down}</text>
                </div>
                <div>
                    <TextField sx={{width: '15%'}}
                      id="outlined-basic" label="닉네임" variant="outlined"
                      name='writer'
                      onChange={commentChange}
                    />
                    <TextField sx={{width: '75%'}}
                      id="outlined-basic" label="댓글" variant="outlined"
                      name='content'
                      onChange={commentChange}
                    />
                    <Button 
                      variant="contained"
                      onClick={submitComment}
                    >작성</Button>
                </div>
                {/* <div>
                    {comments.map(({writer, content}) => (
                        {writer}{content}
                    ))}
                </div> */}
            </div>
        </Box>
    </div>
    )  
}

export default Proposal;