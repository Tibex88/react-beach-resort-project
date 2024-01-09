import PropTypes from 'prop-types';
import { Component, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RoomContext } from "../context/roomContext";


// material-ui
import { Box, Grid, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project import
// import Dot from 'components/@extended/Dot';



const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type'
  },
  {
    id: 'price',
    align: 'left',
    disablePadding: true,
    label: 'Price'
  },
  {
    id: 'size',
    align: 'left',
    disablePadding: false,
    label: 'Size'
  },
  {
    id: 'capacity',
    align: 'left',
    disablePadding: false,
    label: 'Capacity'
  },
  // {
  //   id: 'pets',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'Pets'
  // },
  {
    id: 'reservation',
    align: 'left',
    disablePadding: false,
    label: 'Reservation'
  },
  {
    id: 'available',
    align: 'left',
    disablePadding: false,
    label: 'Available'
  },
  {
    id: 'active',
    align: 'left',
    disablePadding: false,
    label: 'Active'
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

// OrderTableHead.propTypes = {
//   order: PropTypes.string,
//   orderBy: PropTypes.string
// };

// ==============================|| ORDER TABLE - STATUS ||============================== //

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

// OrderStatus.propTypes = {
//   status: PropTypes.number
// };


export default class RoomsTable extends Component {
  
  static contextType = RoomContext;

  order = 'asc';
  orderBy ='trackingNo';
  selected =[];

  isSelected = (trackingNo) => this.selected.indexOf(trackingNo) !== -1;

  render(){
    let { rooms } = this.context;
    return (

      <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Rooms ({rooms.length})</Typography>
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
              {rooms.map((row, index) => {
                const isItemSelected = true;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                        {row.name}
                    </TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">
                      {row.size}
                      {/* <OrderStatus status={row.carbs} /> */}
                    </TableCell>
                    <TableCell align="left">
                      {row.capacity}
                      {/* <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" /> */}
                    </TableCell>
                    <TableCell align="left">
                      {/* {row.reservation} */}
                    </TableCell>
                    <TableCell align="left">
                      {row.available}
                    </TableCell>
                    <TableCell align="left">
                      {row.active}
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