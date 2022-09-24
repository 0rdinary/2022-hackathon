import React, { useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './DocWrite.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link } from "react-router-dom";
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

    const [doc, setDoc] = useState({
        writer: '',
        password: '',
        tag: props.tag,
        title: '',
        content: '',
        date: ''
    });

    const docChange = (event) => {
        const { name, value } = event.target;

        setDoc({
            ...doc,
            [name]: value
        })
    }

    console.log(doc);
    const submitDoc = () => {
        Axios.post('/api/fb/insert', {
            params: {
                writer: doc.writer,
                password: doc.password,
                tag: doc.tag,
                title: doc.title,
                content: doc.content,
                date: {
                    seconds: Math.floor(new Date().getTime() / 1000),
                    nanos: 0
                }
            }
        }).then(()=> {
            alert("등록 완료");
        })
    };

    return (
        <div className="write_div">
            <FormControl sx={{mr: '1.6%', width: '31%'}}>
                <InputLabel id="id-simple-select-label">카테고리</InputLabel>
                <Select
                    labelId="id-simple-select-label"
                    id="tag-simple-select"
                    defaultValue={doc.tag}
                    label="카테고리"
                    name='tag'
                    onChange={docChange}
                >
                    {board_name.map((name, index) => {
                        return (
                            <MenuItem value={tag_name[index]}>{name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <TextField sx={{mr:'1.6%', width: '31%'}}
                required
                id="outlined-required"
                label="닉네임"
                variant="outlined"
                name='writer'
                onChange={docChange}
            />
            <TextField sx={{mb: '1.6%', width: '31%'}}
                required
                id="outlined-required"
                label="비밀번호"
                name='password'
                variant="outlined"
                onChange={docChange}
            />
            
            <TextField sx={{width: '96.5%'}}
                required
                id="outlined-required"
                label="제목"
                name='title'
                onChange={docChange}
                variant="outlined"
            />
            <div className="editor_div">
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDoc({
                            ...doc,
                            content: data
                        })
                        console.log(doc);
                    } }
                    onBlur={ ( event, editor ) => {
                    } }
                    onFocus={ ( event, editor ) => {
                    } }
                />
            </div>
            <Button sx={{mr: 2, mt:2}}
              variant="contained"
              onClick={submitDoc}
              >작성</Button>
        </div>
    );
}

export default DocWrite;