import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Eye } from "react-feather";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Topics = () => {
  const classes = useStyles();

  const [state, setState] = useState();

  function getTopics() {
    return Axios.get("https://localhost:8000/api/topics")
      .then((response) => {
        console.log(response.date);
        setState(response.data["hydra:member"]);
      })
      .catch((error) => console.error(error.response));
  }

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Année académique</TableCell>
              <TableCell align="right">Spécialité</TableCell>
              <TableCell align="right">Durée</TableCell>
              <TableCell align="right">Série</TableCell>
              <TableCell align="right">Coéfficient</TableCell>
              <TableCell align="right">Niveau</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state &&
              state.map((topic, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {topic.yearacademic}
                  </TableCell>
                  <TableCell align="right">{topic.speciality}</TableCell>
                  <TableCell align="right">{topic.duration}</TableCell>
                  <TableCell align="right">{topic.serie}</TableCell>
                  <TableCell align="right">{topic.coefficient}</TableCell>
                  <TableCell align="right">{topic.level}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="voir le sujet">
                      <Eye />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!state && (
        <CircularProgress
          style={{ display: "block", margin: "auto", marginTop: "2rem" }}
        />
      )}
    </>
  );
};

export default Topics;
