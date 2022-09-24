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
import './Board.css'
import { create } from "@mui/material/styles/createTransitions";

const columns = [
    { id: 'title', label: '제목'},
    { id: 'writer', label: '작성자'},
    { id: 'date', label: '작성일자'},
    { id: 'up', label: '좋아요'},
    { id: 'down', label: '싫어요'},
  ];

function createData(content) {
    var title = content['title'];
    var writer = content['writer'];
    var date = content['date'];
    var up = content['up'];
    var down = content['down'];

    var rtv = { title, writer, date, up, down}

    return rtv;
}

function Board() {
    const location = useLocation();
    const props = location.state;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [documents, setDocuments] = useState();

    var board_contents = []

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
          board_contents.push(createData(contents[i]));
        }
    }
    
   useEffect(() => {
        axios.get('/api/fb/documents', {
            params: {
                tag: props.tag
            }
        })
        .then(response => {
          setDocuments(response.data);
          makeBoardContents(documents);
        })
        .catch(error => console.log(error));
    }, [])

  return (
    <div className="Board">
        <div>
          <h1>{props.name} 게시판</h1>
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
                            {board_contents
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row) => {
                                return (
                                  <TableRow hover role="checkbox" tabIndex={-1} key={row.num}>
                                    {columns.map((column) => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id} align={column.align}>
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
                  count={board_contents.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div className="button_div">
                <Link to="/doc/write"
                      state={{
                        tag: props.tag
                      }}>
                    <Button variant="contained">작성하기</Button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Board;