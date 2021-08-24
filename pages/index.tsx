import Layout from '../components/layout';
import { createKey, getPosts, Message } from '../lib/posts';

import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import moment from 'moment';
import 'moment/locale/de';

interface HomeProps {
  messages: Message[];
}

const useStyles = makeStyles({
  insetDivider: {
    variant: 'inset',
    component: 'li',
  },
});

export default function Home({ messages }: HomeProps) {
  const classes = useStyles();
  const heading = 'Neuigkeiten';
  const sortDescending = (a: Message, b: Message) =>
    moment(b.receivedOn).valueOf() - moment(a.receivedOn).valueOf();
  const messagesSortedByDate = messages.sort(sortDescending);

  return (
    <>
      <Head>
        <title>{heading}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading={heading} currentPage='news' noPadding>
        <List>
          {messagesSortedByDate.map(({ subject, text, receivedOn }) => (
            <ListItem
              key={`${subject}-${receivedOn}`}
              classes={{ divider: classes.insetDivider }}
              alignItems='flex-start'
              button
              divider
              onClick={() => {
                window.location.href = `post/${createKey(subject)}`;
              }}
            >
              <ListItemText
                primary={subject}
                secondary={
                  <>
                    <Typography variant='subtitle2'>
                      {moment(receivedOn).locale('de').calendar()}
                    </Typography>
                    {trimToLength(text)}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      messages: await getPosts(),
    },
    revalidate: moment().minutes(10).seconds(),
  };
};

function trimToLength(str: string, maxLength = 85): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '…';
  }
  return str;
}
