import React from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Board.css'

const columns = [
    { id: 'num', label: '번호', minWidth: 50 },
    { id: 'proposalHeadline', label: '제안 제목', minWidth: 200 },
    { id: 'tag', label: '태그', minWidth: 70 },
    { id: 'writer', label: '작성자', minWidth: 130 },
    { id: 'date', label: '작성일자', minWidth: 90 },
    { id: 'agree', label: '찬성', minWidth: 90 },
    { id: 'disagree', label: '반대', minWidth: 90 },
  ];

function createData(num, proposalHeadline, tag, writer, date, agree, disagree) {
  return { num, proposalHeadline, tag, writer, date, agree, disagree };
}

const rows = [
  createData('1', '싱싱한 대구 팝니다', '수산', '바른횟집', '22/09/22', 15, 15),
  createData('2', '홍콩반점대구튀김도둑 잡습니다', '범죄', '홍콩반점', '22/09/11', 1, 1557)
];

function Board() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="Board">
      <div>
        <h1>제안 목록</h1>
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