import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { AnyMxRecord } from 'dns';
import { black, white } from 'material-ui/styles/colors';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type trapsLista = {
  name: { fi: string };
  id: number;
};



export default function BasicTable() {

  const [rows, setRows] = useState([] as trapsLista[]);
  const [currentcolour, changeColour] = useState(white);

  //currentArray is read-only
  const [currentArray, changeStateArray] = useState([] as number[]);

  //apufunktio onclick-eventille
  let toggleActiveElement = (id: number, idArray: number[]) => {
    const temp = idArray;
    //ei renderöi poiston yhteydessä, vasta kun uusi lisataann
    if (idArray.includes(id)) {
      idArray.splice(idArray.indexOf(id), 1);
      console.log("poistettu");
    } else {
      idArray = idArray.concat(id);
      console.log("lisatty");
    }
    changeStateArray(idArray);
    console.log("Loppu");
  }

  useEffect(() => {
    axios
      .get('traps.json')
      .then(res => {
        setRows(res.data);
      })
  }, []/* <-tähän sisältöä jos komponentin halutaan muuttuvan*/)

  const classes = useStyles();
  //console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pyydys ID</TableCell>
            <TableCell align="right">Pyydyksen nimi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            //Jos klikattavan elementin ID ei ole statessa lisää se sinne ja lisää väritys
            <TableRow className={(currentArray.includes(row.id)) ? "active" : ""} onClick={() => toggleActiveElement(row.id, currentArray)} key={row.id}>
              <TableCell component="th" scope="row">
                {row.id} //asdasdasd
              </TableCell>
              <TableCell align="right">{row.name.fi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}
