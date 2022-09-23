import React, { useEffect, useState } from "react";
import axios from 'axios';
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

const columns = [
    { id: 'num', label: '번호' },
    { id: 'title', label: '제목'},
    { id: 'writer', label: '작성자'},
    { id: 'date', label: '작성일자'},
    { id: 'up', label: '좋아요'},
    { id: 'down', label: '싫어요'},
  ];

function createData(num, proposalHeadline, tag, writer, date, agree, disagree) {
  return { num, proposalHeadline, tag, writer, date, agree, disagree };
}

const rows = [
  createData('1', '싱싱한 대구 팝니다', '수산', '바른횟집', '22/09/22', 15, 15),
  createData('2', '홍콩반점대구튀김도둑 잡습니다', '범죄', '홍콩반점', '22/09/11', 1, 1557)
];

function Board() {
    const location = useLocation();
    const props = location.state;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [documents, setDocuments] = useState();

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
          setDocuments(response.data);
          console.log(location);
          console.log(props.tag);
          console.log(documents);
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
                            {rows
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
                  count={rows.length}
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