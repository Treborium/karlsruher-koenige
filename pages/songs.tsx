import Layout from '../components/layout';
import styles from '../styles/songs.module.scss';
import { FileText } from 'react-feather';
import {
  getSortedData,
  getSongsDirectory,
  StaticFile,
} from '../lib/static-file';

interface SongProps {
  songs: StaticFile[];
}

export default function Songs({ songs }: SongProps) {
  return (
    <Layout heading="Königliche Songtexte">
      <div className={styles.songContainer}>
        {songs.map(({ title }) => (
          <a href={`song/${title}`} key={title}>
            <div className={styles.song}>
              <div className={styles.songTitle}>{title}</div>
              <FileText color="#112d4e" />
            </div>
          </a>
        ))}
      </div>
    </Layout>
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
