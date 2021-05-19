import Layout from '../components/layout';
import styles from '../styles/songs.module.css';
import { getSongs } from '../lib/songs';
import { ExternalLink } from 'react-feather';


export default function Songs() {
  return (
    <Layout heading='Königliche Songtexte'>
      <div className={styles.songContainer}>
        {getSongs().map(title => (
          <div className={styles.song}>
            <div className={styles.songTitle}>
              {title}
            </div>
            <ExternalLink color='#112d4e'/>
          </div>
        ))}
      </div>
    </Layout>
  );
}