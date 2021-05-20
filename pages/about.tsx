import Layout from '../components/layout';
import styles from '../styles/about.module.scss'
import { ExternalLink, LogIn, Clock, Mail } from 'react-feather';

export default function About() {
  return (
    <Layout heading='Karlsruher Könige'>
      <h2 className={styles.heading}>Wer sind wir?</h2>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </p>

      <div className={styles.links}>
        <a className={styles.link} href='https://buchsys.sport.uni-karlsruhe.de/angebote/aktueller_zeitraum/index.html'>
          <LogIn className={styles.icon}/>
          <li className={styles.listItem}>Anmeldung</li>
        </a>
        <a className={styles.link} href='https://buchsys.sport.uni-karlsruhe.de/angebote/aktueller_zeitraum/index.html'>
          <Clock className={styles.icon}/>
          <li className={styles.listItem}>Trainingszeiten</li>
        </a>
        <a className={styles.link} href='mailto:turnkoenige@gmail.com' target='_blank'>
          <Mail className={styles.icon}/>
          <li className={styles.listItem}>Kontakt</li>
        </a>
      </div>
    </Layout>
  );
}