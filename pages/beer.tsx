import { useState } from 'react';
import Layout from '../components/layout';
import styles from '../styles/beer.module.scss';

export default function Beer() {
  const [count, setCount] = useState(0);

  return (
    <Layout heading="Kasten Zähler">
      <div className={styles.container}>
        <div className={styles.counter}>{count}</div>
        <button className={styles.button} onClick={() => setCount(count + 1)}>
          Kasten!
        </button>
      </div>
    </Layout>
  );
}
