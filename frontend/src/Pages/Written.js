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

function Written(){
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documents, setDocuments] = useState([]);
  const [id, setId] = useState('');

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    function SetID(e){
      setId(e.target.value);
    }
    
  function CheckID(){
    // for (var i = 0; i < 2; i++) {
    //   var tmp = {}
    //   tmp['title'] = 'ABC'
    //   tmp['date'] = '22/05/19'
    //   tmp['up'] = 15
    //   setDocuments(documents => [tmp, ...documents]);
    // }
    axios.get('/api/fb/user', {
      params: {
        writer: id
      }
    })
    .then(response => {
      var d = response.data.list;
      var d_size = d.length;
      console.log(d);

      for (var i = 0; i < d_size; i++) {
        var tmp = {}
        var day = new Date(d[i]['date']['seconds']*1000);
        console.log(day);
        tmp['title'] = d[i]['title'];
        tmp['date'] = day.toLocaleDateString('ko-KR');;
        tmp['up'] = d[i]['up'];
        setDocuments(documents => [tmp, ...documents]);
      }
    })
    .catch(error => console.log(error));
  }

  return(
    <div className="Board">
      <div>
        <h2>작성 글 확인</h2>
          <TextField id="id" label="아이디" type="ID" variant="outlined" onChange={SetID} />
          <Button onClick={CheckID} sx={{width:'100px',height:'54px' }} variant="contained">확인</Button>
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
                    <TableCell>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map(({title, date, up}) => (
                  <TableRow>
                    <TableCell>{title}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>{up}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={documents.length}
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

export default Written;