import {
  Paper,
  Typography,
  Grid,
  Link,
  Icon,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import Layout from '../components/layout';
import { getSongs, Song } from '../lib/songs';

const useStyles = makeStyles({
  paper: {
    minHeight: '10vh',
    padding: '10px',
  },
});

interface SongProps {
  songs: Song[];
}

export default function Songs({ songs }: SongProps) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Songs</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading='Königliche Songtexte' currentPage='songs'>
        <Grid container direction='column' spacing={2}>
          {songs.map(({ title, spotifyLink }) => (
            <Grid item key={title}>
              <Link href={`song/${title}`} key={title} underline='none'>
                <Paper variant='elevation'>
                  <Grid
                    container
                    justify='space-between'
                    alignItems='center'
                    className={classes.paper}
                  >
                    <Typography>{title}</Typography>
                    {spotifyLink && (
                      <Grid>
                        <IconButton color='inherit'>
                          <Icon className='fab fa-spotify' />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      songs: getSongs(),
    },
  };
}
