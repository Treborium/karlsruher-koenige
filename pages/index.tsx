import Layout from '../components/layout';
import { getSortedPostsData, Post } from '../lib/posts';
import styles from '../styles/home.module.scss';

interface HomeProps {
  allPostsData: Post[];
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout heading='Neuigkeiten'>
      <div className={styles.postContainer}>
        {
          allPostsData.map(({id, title, content}) => (
            <a href={`posts/${id}`}>
              <div className={styles.post}>
                <div className={styles.postTitle}>
                  {title}
                </div>
                <div className={styles.divider} />
                <div className={styles.postContent}>
                  {content}
                </div>
              </div>
            </a>
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
