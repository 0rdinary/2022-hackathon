import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { SvgIcon } from "@mui/material";
import './Home.css'
import { DonutLarge, ThumbDown, ThumbUp } from "@mui/icons-material";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from 'react-router-dom';
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
    
        // useEffect(() => {
        //     axios.get('/api/fb/top')
        //     .then(response => {
        //       var d = response.data.list;
        //       var d_size = d.length;
        //       console.log(d);
              
        //       for (var i = 0; i < d_size; i++) {
        //           var tmp = {}
        //           var day = new Date(d[i]['date']['seconds']*1000);
        //           console.log(day);
        //           tmp['id'] = d[i]['id'];
        //           tmp['title'] = d[i]['title'];
        //           tmp['tag'] = d[i]['tag'];
        //           tmp['writer'] = d[i]['writer'];
        //           tmp['up'] = d[i]['up'];
        //           setDocuments(documents => [tmp, ...documents]);
        //       }
        //     })
        //     .catch(error => console.log(error));
        // }, [])
    
        useEffect(() => {
          console.log(documents);
        }, [documents]);

    return(
        <div className="home">
            <div>
                <h2>주요 제안</h2>  
                <Box sx={{width:600, height:300, border:1}}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs>
                            <text className="mainbox_tag">- {} -</text>
                        </Grid>
                        <Grid item xs>
                            <text className="mainbox_head">{}</text>
                        </Grid>
                        <Grid item xs>
                            <ThumbUp/> <text>{}  </text>
                        </Grid>
                    </Grid>
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