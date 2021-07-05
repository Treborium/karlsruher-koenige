import { useState } from 'react';
import { Button, Grid, Typography, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import Layout from '../components/layout';

const useStyles = makeStyles({
  root: {
    height: '90vh',
  },
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Beer() {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setCount(count + 1);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Bier</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading='Kasten Zähler' currentPage='beer'>
        <Grid
          container
          direction='column'
          spacing={4}
          alignItems='center'
          justify='center'
          className={classes.root}
        >
          <Grid item>
            <Typography variant='h2'>{count}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={handleClick}
            >
              Kasten!
            </Button>
          </Grid>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity='success'>
              Nice 🙌 dein Kasten wurde registriert!
            </Alert>
          </Snackbar>
        </Grid>
      </Layout>
    </>
  );
}
