import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Icon,
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
  accessKeyId: string;
  secretAccessKey: string;
}

export default function Beer({ accessKeyId, secretAccessKey }: BeerProps) {
  const cookieKey = 'donorId';
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
  const [donors, setDonors] = useState<string[]>([]);
  const donorsClient = new Donors(accessKeyId, secretAccessKey);

  const handleClickRegister = () => {
    const cookieValue: string | null = localStorage.getItem(cookieKey);
    if (cookieValue) {
      const timestamp = cookieValue.split('-')[1];

      if (isOverADay(timestamp)) {
        setOpenConfirmationDialog(true);
      } else {
        setOpenError(true);
      }
    }
  };

  const handleClickRevoke = async () => {
    const cookieValue: string | null = localStorage.getItem(cookieKey);
    if (cookieValue) {
      localStorage.removeItem(cookieKey);
      await donorsClient.removeName(cookieValue);
    }

    setHasValidCookie(false);
  };

  const incrementCount = async () => {
    try {
      const id = `${name}-${Date.now()}`;
      await donorsClient.addName(id, name);
      console.log(id);

      localStorage.setItem(cookieKey, id);
      setOpenSuccess(true);
      setOpenConfirmationDialog(false);
    } catch (error) {
      console.error('Could not register beer due to error. error=', error);
      setOpenCookieError(true);
    }
  };

  useEffect(() => {
    const beerCookie: string | null = localStorage.getItem(cookieKey);
    if (beerCookie) {
      setHasValidCookie(isOverADay(beerCookie));
    }

    donorsClient
      .getCount()
      .then((currentCount) => {
        setCountInitialized(true);
        setCount(currentCount);
      })
      .catch((error) => console.error(error));

    donorsClient
      .getNames()
      .then(setDonors)
      .catch((error) => console.error(error));
  }, [hasValidCookie]);

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
            <PinnedList items={donors} />
          </Grid>

          <Typography variant='h6'>
            Kästen für {getNextTrainingDay()}:
          </Typography>

          <Grid item>
            <Show when={countInitiliazed} fallback={<CircularProgress />}>
              <Typography variant='h2'>{count}</Typography>
            </Show>
          </Grid>

          <ButtonGroup
            variant='contained'
            color='primary'
            aria-label='contained primary button group'
            size='large'
          >
            {hasValidCookie ? (
              <Button onClick={handleClickRevoke}>Doch nicht 😔</Button>
            ) : (
              <Button onClick={handleClickRegister}>
                Ich bring' einen mit!
              </Button>
            )}
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
              <Button color='secondary' onClick={() => setOpenTooltip(true)}>
                <Icon className='far fa-question-circle' />
              </Button>
            </Tooltip>
          </ButtonGroup>

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

function isOverADay(timestamp: string): boolean {
  const oneDayInMillis = 864e5;
  return parseInt(timestamp) < Date.now() - oneDayInMillis;
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
      accessKeyId: process.env.X_ACCESS_KEY_ID!,
      secretAccessKey: process.env.X_SECRET_ACCESS_KEY!,
    },
  };
}
