import PropTypes from 'prop-types';

import { Component, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { RoomContext } from "../context/roomContext";
import Banner from "./Banner"

import { FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import { MdBackup, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

// material-ui
import { Box, Grid, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DialogSelect from './DialogSelect';
import DialogReservation from './DialogReservation';
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
  },
  {
    id: 'actions',
    align: 'left',
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function CustomTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
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

export default class RoomsTable extends Component {
  
  static contextType = RoomContext;

  order = 'asc';
  orderBy ='trackingNo';
  selected =[];
  // auth = this.props.auth
  
  isSelected = (trackingNo) => this.selected.indexOf(trackingNo) !== -1;
  
  render(){
    // const { me } = this.props;
    // console.log(this)
    let { rooms, backup, getRooms, updateRooms, deleteRoom } = this.context;
    return (
    <>
            {/* <Banner 
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $299"
        /> */}
      <Grid item xs={12} md={7} lg={8}>
      
      <Grid container alignItems="center" flexDirection="row" gap={5}>
        <Grid item>
          <Typography style={{padding:"20px"}} variant="h5">Rooms ({rooms.length})</Typography>
        </Grid>

        <Grid item>
        <Typography variant="h5">
          <MdBackup onClick={()=>{backup()}}/> 
        </Typography>
        </Grid>

        <Grid item>
        <Typography variant="h5">
          <IoMdRefresh onClick={()=>{getRooms()}}/> 
        </Typography>
      </Grid>

      {
        // me.role === "manager" && 
        <Grid item>
        <Typography variant="h5">
          <DialogSelect /> 
        </Typography>
      </Grid>
        }

        <Grid  />
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
            <CustomTableHead order={this.order} orderBy={this.orderBy} />
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
                    key={row._id}>

                    <TableCell component="th" id={labelId} scope="row" align="left">{row.name}</TableCell>
                    
                    <TableCell align="left">{row.type}</TableCell>
                    
                    <TableCell align="left">{row.price}</TableCell>
                    
                    <TableCell align="left">{row.size}</TableCell>
                    
                    <TableCell align="left">{row.capacity}</TableCell>
                    
                      <TableCell align="left">
                      {/* {row.reservation} */}
                    {
                        row.active && 
                      <DialogReservation />
                    }
                    </TableCell>
                    
                    <TableCell align="left">{row.available}</TableCell>
                    
                    <TableCell align="left">
                      {
                    !row.active  &&
                    <Grid item>
                      <FaLock onClick={()=>{updateRooms(row._id, {active:true})}} />
                    </Grid>
                  }
                  {
                    row.active &&
                    <Grid item>
                      <FaLockOpen onClick={()=>{updateRooms(row._id, {active:false})}} />
                    </Grid>
                  }
                      </TableCell>
                    
                    <TableCell align="left">
                      <Grid container alignItems="center" flexDirection="row" gap={5} >
                        
                        {/* <Grid item>
                        <FaEdit />
                        </Grid> */}

                        <Grid item>
                        <MdDelete onClick={()=>{deleteRoom(row._id)}} />
                        </Grid>

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
    </>
    )}
}