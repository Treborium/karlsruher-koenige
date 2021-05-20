import Layout from '../components/layout';
import styles from '../styles/songs.module.scss';
import { getSongs } from '../lib/songs';
import { FileText } from 'react-feather';


export default function Songs() {
  return (
    <Layout heading='Königliche Songtexte'>
      <div className={styles.songContainer}>
        {getSongs().map(({id, title}) => (
          <a href={`song/${id}`}>
            <div className={styles.song}>
              <div className={styles.songTitle}>
                {title}
              </div>
              <FileText color='#112d4e'/>
            </div>
          </a>
        ))}
      </div>
    </Layout>
  );
}