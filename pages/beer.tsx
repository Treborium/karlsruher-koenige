import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Icon,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import countapi from 'countapi-js';
import moment from 'moment';

import Layout from '../components/layout';
import AlertSnackbar from '../components/alert-snackbar';
import ConfirmationDialog from '../components/confirmation-dialog';

const useStyles = makeStyles({
  root: {
    height: '90vh',
  },
});

interface BeerProps {
  countapiNamespace: string;
  countapiKey: string;
}

export default function Beer({ countapiNamespace, countapiKey }: BeerProps) {
  const cookieName = 'beer';
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [countInitiliazed, setCountInitialized] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openCookieError, setOpenCookieError] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openToolip, setOpenTooltip] = useState(false);
  const [name, setName] = useState('');

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
    if (isLessThanADay(localStorage.getItem(cookieName))) {
      setOpenError(true);
    } else {
      setOpenConfirmationDialog(true);
    }
  };

  const incrementCounter = () => {
    try {
      countapi.update(countapiNamespace, countapiKey, 1).then((result) => {
        console.log('Beer Count:', result.value);
      });
      localStorage.setItem(cookieName, Date.now().toString());
      setCount(count + 1);
      setOpenSuccess(true);
      setOpenConfirmationDialog(false);
    } catch (error) {
      console.error('Could not register beer due to error. error=', error);
      setOpenCookieError(true);
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
            <Typography variant='body1'>
              Kästen für {getNextTrainingDay()}:
            </Typography>
          </Grid>
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
            <Tooltip
              arrow
              interactive
              title='Mit dem Drücken des Buttons verpflichtest du dich, einen Kasten Bier (oder andere Getränke) zum nächsten Training mit zu bringen.'
              open={openToolip}
              onClose={() => {
                setOpenTooltip(false);
              }}
              onOpen={() => {
                setOpenTooltip(true);
              }}
              leaveTouchDelay={4000}
            >
              <IconButton onClick={() => setOpenTooltip(true)}>
                <Icon className='far fa-question-circle' />
              </IconButton>
            </Tooltip>
          </Grid>

          <ConfirmationDialog
            open={openConfirmationDialog}
            onClose={() => setOpenConfirmationDialog(false)}
            onClickCancel={() => setOpenConfirmationDialog(false)}
            onClickConfirm={incrementCounter}
            setInput={setName}
          />

          <AlertSnackbar
            open={openSuccess}
            onClose={(_, reason) => {
              handleClose(reason, setOpenSuccess);
            }}
            severity='success'
          >
            {`Nice 🙌 dein Kasten wurde registriert ${name}!`}
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

          <AlertSnackbar
            open={openCookieError}
            onClose={(_, reason) => {
              handleClose(reason, setOpenCookieError);
            }}
            severity='error'
          >
            Oh nein, leider hat da etwas nicht funktioniert 😕 Probier es
            nochmal in einem anderen Browser.
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

function getNextTrainingDay(): string {
  if (
    moment().isoWeekday() > moment().isoWeekday('Monday').isoWeekday() &&
    moment().isoWeekday() <= moment().isoWeekday('Thursday').isoWeekday()
  ) {
    return 'Donnerstag';
  }

  return 'Montag';
}

export async function getStaticProps() {
  return {
    props: {
      countapiNamespace: process.env.X_COUNT_API_NAMESPACE,
      countapiKey: process.env.X_COUNT_API_KEY,
    },
  };
}
