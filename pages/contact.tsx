import {
  Typography,
  Icon,
  IconButton,
  Avatar,
  Grid,
  Link,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';

import Layout from '../components/layout';
import ProfilePic from '../public/images/profile-picture.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    robert: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  })
);

export default function Contact() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Impressum</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading='Impressum' currentPage='Impressum'>
        <Grid
          container
          direction='column'
          spacing={4}
          className={classes.robert}
        >
          <Grid item>
            <Typography variant='body1'>
              Hergestellt von Robert Fuchs
            </Typography>
          </Grid>

          <Grid item>
            <Avatar
              alt='Robert Fuchs'
              src={ProfilePic.src}
              className={classes.large}
            />
          </Grid>

          <Grid item>
            <Grid container direction='row' spacing={4}>
              <Grid item>
                <IconButton href='https://robert-fuchs.codes'>
                  <Icon className='fas fa-user' />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton href='https://github.com/Treborium'>
                  <Icon className='fab fa-github' />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton href='mailto:robert@fuchs-mail.com'>
                  <Icon className='fas fa-envelope' />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant='h5' gutterBottom>
          Probleme melden
        </Typography>
        <Typography variant='body1' align='justify' display='block'>
          Solltest du Probleme, Bugs, Verbesserungsvorschläge oder sonstige
          Kommentare zur Website haben, kannst du mir gerne eine
          <Link href='mailto:robert@fuchs-mail.com' children=' Mail ' />
          schreiben oder ein Issue im
          <Link
            href='https://github.com/Treborium/karlsruher-koenige/issues/new'
            target='_blank'
            children=' GitHub Repo '
          />
          erstellen.
        </Typography>
      </Layout>
    </>
  );
}
