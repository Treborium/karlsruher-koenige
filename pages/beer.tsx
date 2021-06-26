import { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import styles from '../styles/beer.module.scss';

const useStyles = makeStyles({
  root: {
    height: '90vh',
  },
});

export default function Beer() {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  return (
    <Layout heading="Kasten Zähler">
      <Grid
        container
        direction="column"
        spacing={4}
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item>
          <Typography variant="h2">{count}</Typography>
        </Grid>
        <Grid item>
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setCount(count + 1)}
          >
            Kasten!
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
