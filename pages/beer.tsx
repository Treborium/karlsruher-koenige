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
  const cookieName = 'beer';
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClick = () => {
    if (localStorage.getItem(cookieName)) {
      setOpenError(true);
    } else {
      setCount(count + 1);
      setOpenSuccess(true);
      localStorage.setItem(cookieName, Date.now().toString());
    }
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
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
            open={openSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSuccess} severity='success'>
              Nice 🙌 dein Kasten wurde registriert!
            </Alert>
          </Snackbar>

          <Snackbar
            open={openError}
            autoHideDuration={3000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseError} severity='error'>
              Sehr nett, aber du kannst nur einen Kasten registrieren ☹️
            </Alert>
          </Snackbar>
        </Grid>
      </Layout>
    </>
  );
}
