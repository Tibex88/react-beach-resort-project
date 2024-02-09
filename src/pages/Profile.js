import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { UserContext } from "../context/userContext";
import { useContext } from "react";

import convertDate from '../utils/date';
import { Typography } from '@mui/material';


export default function BasicList() {

    const context = useContext(UserContext);
    const {
      me
    } = context;
    // var tifOptions = [];
    console.log(me)

    // Object.keys(me).forEach(function(key) {
    //     tifOptions.push(<option value={key}>{me[key]}</option>);
    // });

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {/* <nav aria-label="main mailbox folders"> */}
    <List style={{width:"100dvw", padding:"20px 0 0 250px"}}>
        <ListItem >
                    <ListItemText primary="Full Name" />
                    <ListItemText primary={me.fullName} />
        </ListItem>

        <ListItem >
                    <ListItemText primary="Role" />
                    <ListItemText autoCapitalize primary={
                    <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
                        {me.role}
                    </Typography>
                    }
                         />
        </ListItem>

        <ListItem >
                    <ListItemText primary="Email" />
                    <ListItemText primary={me.email} />
        </ListItem>

        {/* <ListItem >
                    <ListItemText primary="Password last changed" />
                    <ListItemText primary={convertDate(me.passwordChangedAt)} />
        </ListItem> */}

        <ListItem >
                    <ListItemText primary="Since" />
                    <ListItemText primary={convertDate(me.createdAt)} />
        </ListItem>

        </List>
    </Box>
  );
}