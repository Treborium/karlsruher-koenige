import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import styles from '../styles/home.module.css';

export default function Home({ allPostsData }) {
  return (
    <Layout heading='Neuigkeiten'>
      <div className={styles.postContainer}>

      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
