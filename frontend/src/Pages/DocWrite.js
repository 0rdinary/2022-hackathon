import React, { useState } from 'react';
import './DocWrite.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';

var board_name = ["문화/관광/체육", "교통", "복지", "여성/가족/교육",
                 "건강/보건/위생", "산업/경제", "환경", "소방/안전",
                 "도시주택/건설", "행정/재정/세정", "자유게시판"]
var tag_name = ["culture", "traffic", "welfare", "education", "health", "economy",
                "environment", "safety", "construction", "administration"];

function DocWrite() {
    const location = useLocation();
    const props = location.state;

    const [tag, setTag] = useState(props.tag);
    const tagChange = (event) => {
        setTag(event.target.value);
    }

    return (
        <div className="write_div">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                <Select
                  labelId="tag-select-label"
                  id="tag-simple-select"
                  value={tag}
                  label="카테고리"
                  onChange={tagChange}
                >
                    {board_name.map((name, index) => {
                        return (
                            <MenuItem value={tag_name[index]}>{name}</MenuItem>
                        )
                    })}
                </Select>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                />
            </FormControl>
        </div>
    );
}

export default DocWrite;