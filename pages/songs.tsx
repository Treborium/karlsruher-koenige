import { Paper, Typography, Grid, Link } from '@material-ui/core';
import Description from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import Layout from '../components/layout';
import {
  getSortedData,
  getSongsDirectory,
  StaticFile,
} from '../lib/static-file';

const useStyles = makeStyles({
  paper: {
    minHeight: '5vh',
    padding: '10px',
  },
});

interface SongProps {
  songs: StaticFile[];
}

export default function Songs({ songs }: SongProps) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Songs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout heading="Königliche Songtexte" currentPage="songs">
        <Grid container direction="column" spacing={2}>
          {songs.map(({ title }) => (
            <Grid item key={title}>
              <Link href={`song/${title}`} key={title} underline="none">
                <Paper variant="elevation">
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    className={classes.paper}
                  >
                    <Typography>{title}</Typography>
                    <Description />
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

export async function getStaticProps() {
  const songs = await getSortedData(getSongsDirectory());
  return {
    props: {
      songs,
    },
  };
}
