import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { FaPlus } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

import { TextField } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DialogReservation() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const fields = [
    "Name",
    // "CheckIn","CheckOut"
  ]

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <IoMdEye />
      </Button>

      <Dialog disableEscapeKeyDown fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          {/* <Box component="form" sx={{ display: 'flex'}}> */}
            <FormControl sx={{ m: 1, display: 'flex', gap:5 }}>
              {/* <InputLabel htmlFor="demo-dialog-native">Age</InputLabel> */}
              {/* <Select
                native
                value={age}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select> */}
            {
              fields.map((field)=>{
                return(
              <TextField
                id="outlined-select-currency"
                // select
                fullWidth 
                label={field}
                // value={field}
                onChange={(event) => {
                  // setField(field, event.target.value);
                }}
                // defaultValue={field}
                // helperText={{`Please insert a  your ${field}}`}
              >   
        </TextField>
                )
              })
            }
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Check In"  />
        <DatePicker label="Check Out" />
    </LocalizationProvider>           
    </FormControl>
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Age</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={age}
                onChange={handleChange}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
          {/* </Box> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}