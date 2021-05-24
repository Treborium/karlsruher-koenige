import Layout from '../components/layout';
import { getSortedPostsData, Post } from '../lib/posts';
import styles from '../styles/home.module.scss';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout heading="Neuigkeiten">
      <div className={styles.postContainer}>
        {posts.map(({ title, content }) => (
          <a href={`post/${title}`} key={title}>
            <div className={styles.post}>
              <div className={styles.postTitle}>{title}</div>
              <div className={styles.divider} />
              <div className={styles.postContent}>{content}</div>
            </div>
          </a>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
}
