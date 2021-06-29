import Layout from '../components/layout';
import { createKey, getPosts } from '../lib/posts';
import { StaticFile } from '../lib/static-file';

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

interface HomeProps {
  posts: StaticFile[];
}

const useStyles = makeStyles({
  card: {
    minHeight: '20vh',
  },
  divider: {
    margin: '1vh 0',
  },
});

export default function Home({ posts }: HomeProps) {
  const classes = useStyles();
  const heading = 'Neuigkeiten';

  return (
    <>
      <Head>
        <title>{heading}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading={heading} currentPage='news'>
        <Grid container direction='column' spacing={2}>
          {posts.map(({ title, content }) => (
            <Grid item key={title}>
              <Card>
                <CardActionArea
                  className={classes.card}
                  href={`post/${createKey(title)}`}
                >
                  <CardContent>
                    <Typography variant='body1'>
                      {trimToLength(title)}
                    </Typography>
                    <Divider variant='middle' className={classes.divider} />
                    <Typography variant='body2'>
                      {trimToLength(content)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      // TODO: Don't display title with dashes anymore
      posts: await getPosts(),
    },
  };
}

function trimToLength(str: string, maxLength = 85): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '…';
  }
  return str;
}
