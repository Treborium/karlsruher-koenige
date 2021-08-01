import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Fab, Icon } from '@material-ui/core';

import Layout from '../../components/layout';
import { getSongData, getSongsPaths } from '../../lib/songs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lyrics: {
      whiteSpace: 'pre-wrap',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(9),
      right: theme.spacing(2),
    },
  })
);

export default function Song({
  songData,
}: {
  songData: {
    title: string;
    content: string;
    spotifyLink?: string;
  };
}) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{songData.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading={songData.title} currentPage='songs' showBackIcon>
        <Typography variant='body2' className={classes.lyrics}>
          {songData.content}
        </Typography>
        {songData.spotifyLink && (
          <Fab
            color='primary'
            aria-label='open song in spotify'
            className={classes.fab}
            href={songData.spotifyLink}
          >
            <Icon className='fab fa-spotify' />
          </Fab>
        )}
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getSongsPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const songData = await getSongData(params.id as string);
  return {
    props: {
      songData,
    },
  };
};
