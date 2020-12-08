import { TextField, Button, Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useRef, useState } from "react";

const AddTopic = () => {
  const [topic, setTopic] = useState({
    yearacademic: "",
    speciality: "",
    duration: "",
    serie: "",
    coefficient: "",
    level: "",
  });

  const form = useRef();

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    setTopic({ ...topic, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post("https://localhost:8000/api/topics", topic);
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={form}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label="Année Academique"
              name="yearacademic"
              id="yearacademic"
              value={topic.yearacademic}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label="Spécialité"
              name="speciality"
              id="speciality"
              value={topic.speciality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label="Durée"
              name="duration"
              id="duration"
              value={topic.duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label="Série"
              name="serie"
              id="serie"
              value={topic.serie}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label="Coefficient"
              name="coefficient"
              id="coefficient"
              value={topic.coefficient}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label="Niveau"
              name="level"
              id="level"
              value={topic.level}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField label="Sujet" type="file" />
          </Grid>
        </Grid>
        <Button variant="outlined" color="primary" type="submit">
          ajout
        </Button>
      </form>
    </>
  );
};

export default AddTopic;
