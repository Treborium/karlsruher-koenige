import { AppBar, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../styles/layout.module.scss';
import Menu from './menu';

export interface LayoutProps {
  heading: string;
  children?: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles({
  appBar: {
    padding: '2vh 0',
  },
  content: {
    minHeight: '100vh',
    flexGrow: 1,
    padding: '1vh 7vw',
  },
});

export default function Layout(props: LayoutProps) {
  const classes = useStyles();

  return (
    <div className={styles.flexContainer}>
      <AppBar position="static" className={classes.appBar}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h6">{props.heading}</Typography>
          </Grid>
        </Grid>
      </AppBar>
      <div className={classes.content}>{props.children}</div>
      <Menu />
    </div>
  );
}
