import React from "react";
import Box from '@mui/material/Box';
import { SvgIcon } from "@mui/material";
import './Home.css'
import { DonutLarge, ThumbDown, ThumbUp } from "@mui/icons-material";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
                    <Grid container direction="column" alignItems="center" className="category_grid">
                        <Grid container direction="row" alignItems="center">
                            {board_name.slice(0,5).map((text, index) => (
                                <Grid item xs>
                                    <Link to={"/board"}
                                    state={{ name: board_name[index],
                                    tag: tag_name[index]
                                }}>
                                <Box sx={{width:100, height:100, border:1}}>
                                    <SvgIcon component={icons[index]} style={{ color: icons_color[index] }} />
                                    <ListItemText primary={text} primaryTypographyProps={{fontSize: '12px'}} />
                                </Box>
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
                            <Box sx={{width:100, height:100, border:1}}>
                                <SvgIcon component={icons[index + 5]} style={{ color: icons_color[index + 5] }} />
                                <ListItemText primary={text} primaryTypographyProps={{fontSize: '12px'}} />
                            </Box>
                            </Link>
                        </Grid>
                        ))}
                    </Grid>
                    </Grid>
                </div>
            </div>
            
        </div>
    )
}

export default Home;