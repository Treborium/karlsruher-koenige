import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Icon,
  IconButton,
  ButtonGroup,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import moment from 'moment';

import Layout from '../components/layout';
import AlertSnackbar from '../components/alert-snackbar';
import ConfirmationDialog from '../components/confirmation-dialog';
import PinnedList from '../components/pinned-list';
import Show from '../components/show';
import { Counter } from '../lib/counter';
import Donors from '../lib/donors';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  pinnedList: {
    alignSelf: 'stretch',
    marginBottom: '3vh',
  },
});

interface BeerProps {
  countapiNamespace: string;
  countapiKey: string;
  names: string[];
}

export default function Beer({
  countapiNamespace,
  countapiKey,
  names,
}: BeerProps) {
  const cookieName = 'beer';
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [countInitiliazed, setCountInitialized] = useState(false);
  const [hasValidCookie, setHasValidCookie] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openCookieError, setOpenCookieError] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openToolip, setOpenTooltip] = useState(false);
  const [name, setName] = useState('');
  const counter = new Counter(countapiNamespace, countapiKey, setCount);

  const handleClickRegister = () => {
    if (isLessThanADay(localStorage.getItem(cookieName))) {
      setOpenError(true);
    } else {
      setOpenConfirmationDialog(true);
    }
  };

  const handleClickRevoke = async () => {
    localStorage.removeItem(cookieName);
    setHasValidCookie(false);
    await counter.decrement();
  };

  const incrementCount = async () => {
    try {
      await counter.increment();
      localStorage.setItem(cookieName, Date.now().toString());
      setOpenSuccess(true);
      setOpenConfirmationDialog(false);
    } catch (error) {
      console.error('Could not register beer due to error. error=', error);
      setOpenCookieError(true);
    }
  };

  useEffect(() => {
    if (!countInitiliazed) {
      counter
        .getValue()
        .then(() => setCountInitialized(true))
        .catch((error) => console.error(error));
    }

    const beerCookie = localStorage.getItem(cookieName);
    if (beerCookie) {
      setHasValidCookie(isLessThanADay(beerCookie));
    }
  });

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
          <Grid item className={classes.pinnedList}>
            <PinnedList items={names} />
          </Grid>

          <Grid item>
            <Typography variant='h6'>
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
            <ButtonGroup
              variant='contained'
              color='primary'
              aria-label='split button'
            >
              <Show
                when={hasValidCookie}
                fallback={
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={handleClickRegister}
                  >
                    Ich bring' einen mit!
                  </Button>
                }
              >
                <Button variant='contained' onClick={handleClickRevoke}>
                  Doch nicht 😔
                </Button>
              </Show>
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
            </ButtonGroup>
          </Grid>

          <ConfirmationDialog
            open={openConfirmationDialog}
            onClose={() => setOpenConfirmationDialog(false)}
            onClickCancel={() => setOpenConfirmationDialog(false)}
            onClickConfirm={incrementCount}
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
  return parseInt(timestamp) > Date.now() - oneDayInMillis;
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
  const donors = new Donors(
    process.env.X_REDIS_HOST,
    parseInt(process.env.X_REDIS_PORT),
    process.env.X_REDIS_PASSWORD
  );

  return {
    props: {
      countapiNamespace: process.env.X_COUNT_API_NAMESPACE,
      countapiKey: process.env.X_COUNT_API_KEY,
      names: await donors.getNames(),
    },
  };
}
