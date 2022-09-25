import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { SvgIcon } from "@mui/material";
import './Home.css'
import { DonutLarge, ThumbDown, ThumbUp } from "@mui/icons-material";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Button from '@mui/material/Button'
import axios from 'axios';
import {
    ContentPaste,
    DepartureBoard,
    Diversity1,
    FamilyRestroom,
    FireTruck,
    Foundation,
    Landscape,
    MedicalInformation,
    Paid,
    Piano,
    ReceiptLong
} from "@mui/icons-material";

function createData(proposalHeadline, tag, agree, disagree) {
    return {proposalHeadline, tag, agree, disagree};
  }
  
  const MainProposal = 
    createData('싱싱한 대구 팝니다','수산', 15, 15);
function Home(){
    var board_name = ["문화/관광/체육", "교통", "복지", "여성/가족/교육",
                 "건강/보건/위생", "산업/경제", "환경", "소방/안전",
                 "도시주택/건설", "행정/재정/세정"]
    var tag_name = ["culture", "traffic", "welfare", "education", "health", "economy",
                "environment", "safety", "construction", "administration"];
    
    const icons = [Piano, DepartureBoard, Diversity1, 
        FamilyRestroom, MedicalInformation, Paid, Landscape, 
        FireTruck, Foundation, ReceiptLong, ContentPaste];
              
    const icons_color = ["purple", 'DeepSkyBlue', 'green',
        'purple', 'red', 'gold', 'green', 'red',
        'DeepSkyBlue', 'gold', 'purple'];
    
    const location = useLocation();
    const [documents, setDocuments] = useState([]);
    const [index, setIndex] = useState(0);

    var obTimeOut;
    var tempIndex = -1;

    // function MainProposalChangeON(){
    //     tempIndex = (tempIndex + 1) % 3;
    //     setIndex(tempIndex);
    //     console.log(tempIndex);
    //     obTimeOut = setTimeout(MainProposalChangeON, 5000);
    // }

    function Item(props)
    {
        return (
            // <Grid>
            //     <h2>{props.item.name}</h2>
            //     <p>{props.item.description}</p>
            //
            //     <Button className="CheckButton">
            //         Check it out!
            //     </Button>
            // </Grid>
            <Grid sx={{width:'100%'}}>
                <Grid item xs>
                    <text className="mainbox_tag">- {props.item.tag} -</text>
                </Grid>
                <Grid item xs>
                    <text className="mainbox_head">{props.item.title}</text>
                </Grid>
                <Grid item xs>
                    <ThumbUp/> <text>{props.item.up}  </text>
                </Grid>
            </Grid>
        )
    }
        useEffect(() => {
            axios.get('/api/fb/top')
            .then(response => {
                setDocuments(documents => [...documents, response.data.list[0]]);
                setDocuments(documents => [...documents, response.data.list[1]]);
                setDocuments(documents => [...documents, response.data.list[2]]);
                setDocuments(documents => [...documents, response.data.list[3]]);
                setDocuments(documents => [...documents, response.data.list[4]]);
                // for(var i=0;i<5;i++)
                // {
                //     setDocuments(documents=>[...documents, response.data.list[i]]);
                // }

              console.log(documents);
            })
            .catch(error => console.log(error));
        }, []) //documents 기입시 플젝망함

    console.log(documents);
    return(
        <div className="home">
            <div>
                <h2>주요 제안</h2>  
                <Box sx={{width:'100%', border:1, borderRadius:'5%'}}>
                    <Carousel>
                        {
                            documents.map( (item, i) => <Item key={i} item={item} /> )
                        }
                    </Carousel>
                </Box>
                <div>
                    <h2>카테고리 별</h2>
                    <div className="category_container">
                        <Grid container direction="column" alignItems="center" className="category_grid">
                            <Grid container direction="row" alignItems="center">
                                {board_name.slice(0,5).map((text, index) => (
                                <Grid item xs>
                                    <Link to={"/board"}
                                        state={{ name: board_name[index],
                                        tag: tag_name[index]
                                    }}>
                                        <Box sx={{width:99, height:66, borderRadius: '50%', backgroundColor:'#F6F6F6'}} className="category_box">
                                            <SvgIcon component={icons[index]} style={{fontSize:'40px', color: icons_color[index] }} />
                                        </Box>
                                        <ListItemText primary={text} primaryTypographyProps={{fontSize: '12px'}} />
                                    </Link>
                                </Grid>
                            ))}
                            </Grid>
                            <Grid container direction="row" alignItems="center" className="category_grid">
                                {board_name.slice(5,10).map((text, index) => (
                                <Grid item xs>
                                    <Link to={"/board"}
                                        state={{ name: board_name[index+5],
                                        tag: tag_name[index+5]
                                    }}>
                                        <Box sx={{width:99, height:66, borderRadius: '50%', backgroundColor:'#F6F6F6'}} className="category_box">
                                            <SvgIcon component={icons[index + 5]} style={{fontSize:'40px', color: icons_color[index + 5] }} />
                                        </Box>
                                        <ListItemText primary={text} primaryTypographyProps={{fontSize: '12px', fontWeight:'500'}} />
                                    </Link>
                                </Grid>
                            ))}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;