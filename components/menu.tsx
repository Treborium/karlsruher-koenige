import styles from '../styles/menu.module.scss';
import { Home, Music, Info, Coffee } from 'react-feather';

export default function Menu() {
  return (
    <div className={styles.container}>
      <a href='/'>
        <div className={styles.menuItem}>
        <Home color='#f9f8f7'/>
        </div>
      </a>
      <a href='/beer'>
      <div className={styles.menuItem}>
        <Coffee color='#f9f8f7'/>
        </div>
      </a>
      <a href='/songs'>
      <div className={styles.menuItem}>
        <Music color='#f9f8f7'/>
        </div>
      </a>
      <a href='/about'>
      <div className={styles.menuItem}>
        <Info color='#f9f8f7'/>
        </div>
      </a>
    </div>
  );
}