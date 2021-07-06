import { useState, useEffect } from 'react';
import { Button, Grid, Typography, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import countapi from 'countapi-js';

import Layout from '../components/layout';

const useStyles = makeStyles({
  root: {
    height: '90vh',
  },
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

interface BeerProps {
  countapiNamespace: string;
  countapiKey: string;
}

export default function Beer({ countapiNamespace, countapiKey }: BeerProps) {
  const classes = useStyles();
  let isCountInitiliazed = false;

  const [count, setCount] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (!isCountInitiliazed) {
      countapi.get(countapiNamespace, countapiKey).then((result) => {
        if (result.status === 200) {
          setCount(result.value);
          isCountInitiliazed = true;
        }
      });
    }
  });

  const handleClick = () => {
    const cookieName = 'beer';

    if (isLessThanADay(localStorage.getItem(cookieName))) {
      setOpenError(true);
    } else {
      try {
        countapi.update(countapiNamespace, countapiKey, 1).then((result) => {
          console.log('Beer Count:', result.value);
        });
        localStorage.setItem(cookieName, Date.now().toString());
        setCount(count + 1);
        setOpenSuccess(true);
      } catch (error) {
        console.error('Could not register beer due to error. error=', error);
        // TODO: Show other error snackbar
      }
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

function isLessThanADay(timestamp: string): boolean {
  const oneDayInMillis = 864e5;
  return timestamp && parseInt(timestamp) > Date.now() - oneDayInMillis;
}

export async function getStaticProps() {
  return {
    props: {
      countapiNamespace: process.env.X_COUNT_API_NAMESPACE,
      countapiKey: process.env.X_COUNT_API_KEY,
    },
  };
}
