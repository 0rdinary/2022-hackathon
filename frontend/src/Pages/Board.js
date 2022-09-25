import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link, useResolvedPath } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import './Board.css'
import { create } from "@mui/material/styles/createTransitions";
import { Tab } from "@mui/material";

const columns = [
    { id: 'title', label: '제목'},
    { id: 'writer', label: '작성자'},
    { id: 'date', label: '작성일자'},
    { id: 'up', label: '좋아요'},
  ];

function Board() {
    const location = useLocation();
    const props = location.state;
    const [tag, setTag] = useState(props.tag);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [documents, setDocuments] = useState([]);
    const [refresh, setRefresh] = useState();

    var tempTag;
    function Refresh(){
      if(tempTag != tag)  setRefresh();
      tempTag = tag;
      setTimeout(Refresh, 1000);
    }
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    
   useEffect(() => {
        axios.get('/api/fb/documents', {
            params: {
                tag: props.tag
            }
        })
        .then(response => {
          var d = response.data.list;
          var d_size = d.length;
          var list = [];
          console.log(d);
          
          for (var i = 0; i < d_size; i++) {
              var tmp = {}
              var day = new Date(d[i]['date']['seconds']*1000);
              console.log(day);
              tmp['id'] = d[i]['id'];
              tmp['title'] = d[i]['title'];
              tmp['writer'] = d[i]['writer'];
              tmp['date'] = day.toLocaleDateString('ko-KR');;
              tmp['up'] = d[i]['up'];
              list.push(tmp);
          }
          setDocuments(list);
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
      console.log(documents);
      Refresh();
    }, [documents]);

  return (
    <div className="Board">
        <div className="board_header">
          <Link to="/doc/write"
                state={{
                  tag: props.tag
                }}>
              <Button sx={{mr: 2, mt:2}} variant="contained">작성</Button>
          </Link>
          <strong>{props.name}</strong>
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
                          {documents.map(({id, title, writer, date, up}) => (
                              <TableRow key={id}>
                                  <TableCell><Link to={'/doc/view/'+id}>{title}</Link></TableCell>
                                  <TableCell>{writer}</TableCell>
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
  );
}

export default Board;