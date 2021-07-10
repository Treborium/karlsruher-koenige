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
  highlightedButton: {
    background:
      'linear-gradient(90deg, rgba(124,77,255,1) 0%, rgba(3,169,244,1) 100%)',
    color: '#FFF',
  },
  button: {},
});

interface SongProps {
  songs: Song[];
}

export default function Songs({ songs }: SongProps) {
  const classes = useStyles();
  songs = songs.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return (
    <>
      <Head>
        <title>Songs</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading='Königliche Songtexte' currentPage='songs'>
        <Grid container direction='column' spacing={2}>
          {songs.map(({ title, spotifyLink, priority }) => (
            <Grid item key={title}>
              <Link href={`song/${title}`} key={title} underline='none'>
                <Paper
                  variant='elevation'
                  className={
                    priority ? classes.highlightedButton : classes.button
                  }
                >
                  <Grid
                    container
                    justify='space-between'
                    alignItems='center'
                    className={classes.paper}
                  >
                    <Typography>{title}</Typography>
                    {spotifyLink && (
                      <Grid>
                        {/* TODO: href produces an error in dev console */}
                        <IconButton color='inherit' href={spotifyLink}>
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
