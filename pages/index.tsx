import Layout from '../components/layout';
import { getPosts, replaceAllWhiteSpaces } from '../lib/posts';
import { StaticFile } from '../lib/static-file';
import styles from '../styles/home.module.scss';

interface HomeProps {
  posts: StaticFile[];
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
  return {
    props: {
      // TODO: Don't display title with dashes anymore
      posts: await getPosts(),
    },
  };
}
