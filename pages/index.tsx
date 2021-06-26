import Layout from '../components/layout';
import { getPosts } from '../lib/posts';
import { StaticFile } from '../lib/static-file';

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface HomeProps {
  posts: StaticFile[];
}

const useStyles = makeStyles({
  card: {
    minHeight: '20vh',
  },
  divider: {
    margin: '1vh 0',
  },
});

export default function Home({ posts }: HomeProps) {
  const classes = useStyles();

  return (
    <Layout heading="Neuigkeiten">
      <Grid container direction="column" spacing={2}>
        {posts.map(({ title, content }) => (
          <Grid item>
            <Card>
              <CardActionArea className={classes.card} href={`post/${title}`}>
                <CardContent>
                  <Typography variant="body1">{trimToLength(title)}</Typography>
                  <Divider variant="middle" className={classes.divider} />
                  <Typography variant="body2">
                    {trimToLength(content)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
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

function trimToLength(str: string, maxLength = 85): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '…';
  }
  return str;
}
