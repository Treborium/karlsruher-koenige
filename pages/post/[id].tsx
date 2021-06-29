import { GetStaticPaths, GetStaticProps } from 'next';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createHash } from 'crypto';
import Head from 'next/head';

import Layout from '../../components/layout';
import {
  getObject,
  getStaticPathsForPosts,
  initS3Client,
  Message,
} from '../../lib/posts';

const useStyles = makeStyles({
  content: {
    whiteSpace: 'pre-wrap',
  },
});

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    content: string;
  };
}) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading={postData.title} currentPage='news'>
        <Grid container justify='center'>
          <Typography variant='body1' className={classes.content}>
            {postData.content}
          </Typography>
        </Grid>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getStaticPathsForPosts();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const content = await getObject(initS3Client(), params.id as string);
  const message: Message = JSON.parse(content);
  return {
    props: {
      postData: { title: message.subject, content: message.text },
    },
    revalidate: 60,
  };
};
