import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Grid,
  Typography,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import countapi from 'countapi-js';

import Layout from '../components/layout';
import AlertSnackbar from '../components/AlertSnackbar';

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
  const [count, setCount] = useState(0);
  const [countInitiliazed, setCountInitialized] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (!countInitiliazed) {
      countapi.get(countapiNamespace, countapiKey).then((result) => {
        if (result.status === 200) {
          setCount(result.value);
          setCountInitialized(true);
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
            {countInitiliazed ? (
              <Typography variant='h2'>{count}</Typography>
            ) : (
              <CircularProgress />
            )}
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

          <AlertSnackbar
            open={openSuccess}
            onClose={(_, reason) => {
              handleClose(reason, setOpenSuccess);
            }}
            severity='success'
          >
            Nice 🙌 dein Kasten wurde registriert!
          </AlertSnackbar>

          <AlertSnackbar
            open={openError}
            onClose={(_, reason) => {
              handleClose(reason, setOpenError);
            }}
            severity='error'
          >
            Sehr nett, aber du kannst nur einen Kasten registrieren ☹️
          </AlertSnackbar>
        </Grid>
      </Layout>
    </>
  );
}

function isLessThanADay(timestamp: string): boolean {
  const oneDayInMillis = 864e5;
  return timestamp && parseInt(timestamp) > Date.now() - oneDayInMillis;
}

function handleClose(
  reason: string,
  setState: Dispatch<SetStateAction<boolean>>
) {
  if (reason === 'clickaway') {
    return;
  }

  setState(false);
}

export async function getStaticProps() {
  return {
    props: {
      countapiNamespace: process.env.X_COUNT_API_NAMESPACE,
      countapiKey: process.env.X_COUNT_API_KEY,
    },
  };
}
