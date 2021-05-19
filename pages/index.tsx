import Layout from '../components/layout';
import { getSortedPostsData, Post } from '../lib/posts';
import styles from '../styles/home.module.css';

interface HomeProps {
  allPostsData: Post[];
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout heading='Neuigkeiten'>
      <div className={styles.postContainer}>
        {
          allPostsData.map(({title, content}) => (
            <div className={styles.post}>
              <div className={styles.postTitle}>
                {title}
              </div>
              <div className={styles.postContent}>
                {content}
              </div>
            </div>
          ))
        }
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
