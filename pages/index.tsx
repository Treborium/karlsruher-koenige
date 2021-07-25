import Layout from '../components/layout';
import { createKey, getPosts, Message } from '../lib/posts';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import moment from 'moment';
import 'moment/locale/de';

interface HomeProps {
  messages: Message[];
}

const useStyles = makeStyles({
  card: {
    minHeight: '20vh',
  },
  divider: {
    margin: '1vh 0',
  },
  content: {
    marginTop: '2vh',
  },
});

export default function Home({ messages }: HomeProps) {
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
          {messages.map(({ subject, text, receivedOn }) => (
            <Grid item key={subject}>
              <Card>
                <CardActionArea
                  className={classes.card}
                  href={`post/${createKey(subject)}`}
                >
                  <CardContent>
                    <Typography variant='body1'>{subject}</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {moment(receivedOn).locale('de').calendar()}
                    </Typography>
                    <Typography variant='body2' className={classes.content}>
                      {trimToLength(text)}
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
      messages: await getPosts(),
    },
  };
}

function trimToLength(str: string, maxLength = 85): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '…';
  }
  return str;
}
