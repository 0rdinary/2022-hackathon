import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import './Profile.css'
import { TextField } from "@mui/material";

const profileData = [
    { name:'id', label:'아이디'},
    { name:'pw', label:'패스워드'}
];
function createDataAccount(id, pw) {
    return {id,pw  };
  }
  
  const Data = 
    createDataAccount('바른횟집','1557');
    
    const columns = [
        { id: 'title', label: '제목'},
        { id: 'date', label: '작성일자'},
        { id: 'up', label: '좋아요'},
      ];
    
    function createData(content) {
        var title = content['title'];
        var date = content['date'];
        var up = content['up'];
    
        return {title, date, up};
    }

function Profile(){
    const location = useLocation();
    const props = location.state;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [documents, setDocuments] = useState();
    const [boardContents, setBoardContents] = useState([]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const makeBoardContents = (contents) => {
        var contents_size = contents.length;
        for (var i = 0; i < contents_size; i++) {
          const newContent = createData(contents[i]);
          console.log(newContent);
          setBoardContents(boardContents => [newContent, ...boardContents]);
        }
    }
    
   function Check(e){
        axios.get('/api/fb/documents', {
            params: {
                tag: props.tag
            }
        })
        .then(response => {
          setDocuments(documents);
          // console.log(response.data.list)
          // console.log(documents);
          makeBoardContents(response.data.list);
        })
        .catch(error => console.log(error));
    }

    return(
        <div>
            <div>
            <h2>작성 글 확인</h2>
            <TextField id="id" label="아이디" type="ID" variant="outlined" />
            <TextField id="pw" label="비밀번호" type="password" autoComplete="current-password" variant="outlined" />
            <Button sx={{width:'100px',height:'54px' }} variant="contained">확인</Button>
            </div>
            <hr></hr>
        <div>
        <div>
          <h3>작성 글</h3>
        </div>
        <div className="BoardTable">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {boardContents
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                return (
                                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column, idx) => {
                                      const value = row[idx];
                                      return (
                                        <TableCell key={idx} align={column.align}>
                                          {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                );
                              })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={boardContents.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    </div>
        </div>

    )
}

export default Profile;