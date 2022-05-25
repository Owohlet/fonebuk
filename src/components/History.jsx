import React from 'react'
import {TableCell, TableRow} from '@mui/material';
import Moment from 'react-moment';


function History(props) {
  return (
    <TableRow>
        <TableCell align="center">{props.first_name}</TableCell>
        <TableCell align="center">{props.last_name}</TableCell>
        <TableCell align="center">{props.email}</TableCell>
        <TableCell align="center">{props.phone_number}</TableCell>
        <TableCell align="center">{props.updated_by}</TableCell>
        <TableCell align="center" color='gray'><Moment fromNow>{props.date}</Moment></TableCell>
    </TableRow>
  )
}

export default History