import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Layout from '../../components/layout';
import { getSongData, getSongsPaths } from '../../lib/songs';

const useStyles = makeStyles({
  lyrics: {
    whiteSpace: 'pre-wrap',
  },
});

export default function Song({
  songData,
}: {
  songData: {
    title: string;
    content: string;
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
