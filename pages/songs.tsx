import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import Head from 'next/head';

import Layout from '../components/layout';
import { getSongs, SongMetaData } from '../lib/songs';

interface SongProps {
  songs: SongMetaData[];
}

export default function Songs({ songs }: SongProps) {
  songs = songs.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return (
    <>
      <Head>
        <title>Songs</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading='Königliche Songtexte' currentPage='songs'>
        <List>
          {songs.map(({ title, spotifyLink, priority }) => (
            <ListItem
              key={title}
              divider
              button
              onClick={() => (window.location.href = `song/${title}`)}
            >
              <ListItemText primary={title} />
              {spotifyLink && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    color='inherit'
                    href={spotifyLink}
                  >
                    <Icon className='fab fa-spotify' />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
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
