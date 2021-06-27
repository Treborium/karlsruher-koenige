import { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import Layout from '../components/layout';

const useStyles = makeStyles({
  root: {
    height: '90vh',
  },
});

export default function Beer() {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  return (
    <>
      <Head>
        <title>Bier</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout heading="Kasten Zähler" currentPage="beer">
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
    </>
  );
}
