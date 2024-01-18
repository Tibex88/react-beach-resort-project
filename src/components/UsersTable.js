import PropTypes from 'prop-types';
import { Component, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from "../context/userContext";

import Loading from "./Loading";

import convertDate from '../utils/date';

import { MdBackup } from "react-icons/md";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
// material-ui
import { Box, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';


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
  // {
  //   id: 'phoneNumber',
  //   align: 'left',
  //   disablePadding: true,
  //   label: 'Phone Number'
  // },
  {
    id: 'role',
    align: 'left',
    disablePadding: false,
    label: 'Role'
  },
  {
    id: 'created',
    align: 'left',
    disablePadding: false,
    label: 'Created'
  },
  {
    id: 'actions',
    align: 'left',
    disablePadding: false,
    label: 'Actions'
  }
  // {
  //   id: 'carbs',
  //   align: 'left',
  //   disablePadding: false,

  //   label: 'Status'
  // },
  // {
  //   id: 'protein',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Total Amount'
  // }
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


export default class UsersTable extends Component {
  
  static contextType = UserContext;
  
  order = 'asc';
  orderBy ='trackingNo';
  selected =[];
  isSelected = (trackingNo) => this.selected.indexOf(trackingNo) !== -1;

render(){
  let { loading, users, backup, toggleRole, getUsers } = this.context;
  // await getUsers()
  // console.log({users})
  return (
    <Grid item xs={12} md={7} lg={8}>
    
    <Grid container alignItems="center"  flexDirection="row" gap={5}>
      <Grid item>
        <Typography variant="h5">Users ({users.length})</Typography>
      </Grid>
      <Grid  />
      <Grid item>
        <Typography variant="h5">
          <MdBackup onClick={()=>{backup()}}/> 
        </Typography>
        </Grid>
      <Grid item>
        <Typography variant="h5">
          <IoMdRefresh onClick={()=>{getUsers()}}/> 
        </Typography>
      </Grid>
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
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row._id}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    {/* <Link color="secondary" component={RouterLink} to=""> */}
                      {row.fullName}
                    {/* </Link> */}
                  </TableCell>
                  
                  <TableCell align="left">{row.email}</TableCell>
                  
                  {/* <TableCell align="left">{row.phoneNumber}</TableCell> */}
                  
                  <TableCell align="left">{row.role}</TableCell>
                                    
                  <TableCell align="left">{convertDate(row.createdAt)}</TableCell>
                  
                  {/* <TableCell align="left">{row.active}</TableCell> */}

                  <TableCell align="center">
                  <Grid container alignItems="center" width={"full"} flexDirection="row" gap={5}>

                  {
                    row.role === "user" &&
                    <Grid item>
                      <FaArrowCircleUp onClick={()=>{ toggleRole(row._id,"receptionist" ) }} 
                        />
                    </Grid>
                  }

                  {
                    row.role === "receptionist" &&

                    <Grid item>
                      <FaArrowCircleDown onClick={()=>{ toggleRole(row._id,"user" ) }} />
                    </Grid>
                  }

                  
                  {
                    !row.active  &&
                    <Grid item>
                      <FaLock />
                    </Grid>
                  }
                  {
                    row.active &&
                    <Grid item>
                      <FaLockOpen />
                    </Grid>
                  }

                  </Grid>

                  </TableCell>
                  

                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>

    </Grid>
  )}
}