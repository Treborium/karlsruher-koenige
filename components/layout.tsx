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
    flexGrow: 1,
    padding: '2vh 0',
  },
  title: {
    flexGrow: 1,
  },
});

export default function Layout(props: LayoutProps) {
  const classes = useStyles();

  return (
    <div className={styles.flexContainer}>
      <AppBar position="static" className={classes.appBar}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              {props.heading}
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
      <div className={styles.content}>{props.children}</div>
      <Menu />
    </div>
  );
}
