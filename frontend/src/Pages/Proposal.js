import React, { useEffect, useState } from "react";
import { DocumentScanner, ThumbDown, ThumbUp } from "@mui/icons-material";
import axios from 'axios';
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./Proposal.css"
 
var board_name = ["문화/관광/체육", "교통", "복지", "여성/가족/교육",
                  "건강/보건/위생", "산업/경제", "환경", "소방/안전",
                  "도시주택/건설", "행정/재정/세정", "자유게시판"]
var tag_name = ["culture", "traffic", "welfare", "education", "health", "economy",
                "environment", "safety", "construction", "administration"];

var dic = {};
tag_name.forEach((key, i) => dic[key] = board_name[i]);

function Proposal() {
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
    const [day, setDay] = useState();
    var commentsList = '';

    const commentChange = (event) => {
        const { name, value } = event.target;

        setComment({
            ...comment,
            [name]: value
        })
    }

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
            setComments([...comments, comment]);
        })
    };

    const submitUp = () => {
        axios.get('/api/fb/vote', { params : {
            id: id,
            way: "up"
        }},{
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=> {
            var u = document['up'] + 1;
            setDocument({
                ...document,
                up: u
            })
        })
    }

    const submitDown = () => {
        axios.get('/api/fb/vote', { params : {
            id: id,
            way: "down"
        }},{
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=> {
            var d = document['down'] + 1;
            setDocument({
                ...document,
                down: d
            })
        })
    }

    useEffect(() => {
        axios
            .all([axios.get('/api/fb/doc', {params:{id: id}}), axios.get('/api/fb/comment', {params:{id: id}})])
            .then (
                axios.spread((res1, res2) => {
                    setDocument(res1.data.content);
                    setComments(res2.data.comment);
                })
            ).catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        console.log(document);
        if (document['date'] !== '') {
            var tmp = new Date(document['date']['seconds']*1000);
            tmp = tmp.toLocaleDateString('ko-KR');
            setDay(tmp);
            console.log('day change');
            console.log(day);
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
                    <ThumbUp onClick={submitUp}/> <text className="thumbs_text">{document.up}  </text>
                    <text>  |  </text>
                    <ThumbDown onClick={submitDown}/> <text className="thumbs_text">{document.down}</text>
                </div>
                <div>
                    <TextField sx={{width: '15%', height:'10%'}}
                      id="outlined-basic" label="닉네임" variant="outlined"
                      name='writer'
                      onChange={commentChange}
                    />
                    <TextField sx={{width: '75%'}}
                      id="outlined-basic" label="댓글" variant="outlined"
                      name='content'
                      onChange={commentChange}
                    />
                    <Button sx={{height:'55px'}}
                      variant="contained"
                      onClick={submitComment}
                    >작성</Button>
                </div>
                <div>
                <Paper sx={{ width: '100%', overflow: 'hidden', marginTop:'2rem' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'large'}}>닉네임</TableCell>
                                        <TableCell sx={{fontWeight:'bold', fontSize:'large'}}>댓글</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {comments.map(({writer, content}) => (
                                      <TableRow >
                                          <TableCell>{writer}</TableCell>
                                          <TableCell>{content}</TableCell>
                                      </TableRow>
                                  ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </Box>
    </div>
    )  
}

export default Proposal;