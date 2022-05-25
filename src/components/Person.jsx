import React from 'react';
import { useNavigate } from 'react-router-dom';
import {TableCell, TableRow} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function Person(props) {
  const navigate = useNavigate();
  return (
    <TableRow>
        <TableCell align="center">{props.first_name}</TableCell>
        <TableCell align="center">{props.last_name}</TableCell>
        <TableCell align="center">{props.email}</TableCell>
        <TableCell align="center">{props.phone_number}</TableCell>
        <TableCell align="center">{props.created_by}</TableCell>
        <TableCell align="center">
          <button className="font-awe" onClick={() => navigate('/contact/?id=' + props.id)}>
            <FontAwesomeIcon icon={faEye} color="#045704" />
          </button>
          <button className="font-awe" onClick={() => navigate('/contact/edit/?id=' + props.id)}>
            <FontAwesomeIcon icon={faPenToSquare} color="#0a229f" />
          </button>
          <button className="font-awe" onClick={() => navigate('/contact/delete/?id=' + props.id)}>
            <FontAwesomeIcon icon={faTrashCan} color="#9f0a0a" />
          </button>
        </TableCell>
    </TableRow>
  )
}

export default Person