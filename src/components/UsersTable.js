import PropTypes from 'prop-types';
import { Component, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from "../context/userContext";


// material-ui
import { Box, Grid, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project import
// import Dot from 'components/@extended/Dot';


const headCells = [
  {
    id: 'fullName',
    align: 'left',
    disablePadding: false,
    label: 'Full Name.'
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email.'
  },
  {
    id: 'phoneNumber',
    align: 'left',
    disablePadding: true,
    label: 'Phone Number'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Total Order'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};


const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* <Dot color={color} /> */}
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};


export default class OrderTable extends Component {
  
  static contextType = UserContext;
  
  order = 'asc';
  orderBy ='trackingNo';
  selected =[];
  isSelected = (trackingNo) => this.selected.indexOf(trackingNo) !== -1;

render(){
  let { users } = this.context; 
  return (
    <Grid item xs={12} md={7} lg={8}>
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h5">Users ({users.length})</Typography>
      </Grid>
      <Grid item />
    </Grid>
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={this.order} orderBy={this.orderBy} />
          <TableBody>
            {users.map((row, index) => {
              const isItemSelected = this.isSelected(row.fullName);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.fullName}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="left">
                    {row.role}
                    {/* <OrderStatus status={row.carbs} /> */}
                  </TableCell>
                  <TableCell align="right">
                    {row.phoneNumber}
                    {/* <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" /> */}
                  </TableCell>
                  <TableCell align="right">
                    {row.active}
                    {/* <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" /> */}
                  </TableCell>
                  <TableCell align="right">
                    {row.createdAt}
                    {/* <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" /> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Grid>
  );}
}