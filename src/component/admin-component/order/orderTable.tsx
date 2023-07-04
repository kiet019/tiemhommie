import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  styled,
  Dialog,
  TablePagination,
} from "@mui/material";
import React, { useState } from "react";
const StyledTableHead = styled(Typography)(() => ({
  fontWeight: 700,
}));

export default function OrderAdminTable({ order }: any) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer
      component={Paper}

    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledTableHead width={60}>Mã</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead width={250}>Sản phẩm</StyledTableHead>
            </TableCell>
            <TableCell width={200}>
              <StyledTableHead>Thanh toán</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead>Địa chỉ</StyledTableHead>
            </TableCell>
            <TableCell width={120}>
              <StyledTableHead>Tổng giá</StyledTableHead>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order !== null && order !== undefined ? (
            order.slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((row: any) => (
              <TableRow key={row.orderId}>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>
                    {row.productAndOrderItemList.map((item : any, key : any) => (
                        <Typography variant="subtitle2" key={key}>{item.quantity} x {item.product.productName}</Typography>
                    ))}
                </TableCell>
                <TableCell>{row.payment.paymentType}</TableCell>
                <TableCell>{row.delivery.address}</TableCell>
                <TableCell>{row.totalPayment}</TableCell>
              </TableRow>
            ))
          ) : (
            <Dialog open={true}></Dialog>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={order !== undefined && order !== null ? order.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </TableContainer>
  );
}
