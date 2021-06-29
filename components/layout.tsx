import { AppBar, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Menu from './menu';

export interface LayoutProps {
  heading: string;
  currentPage: string;
  children?: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    width: '100vw',
  },
  appBar: {
    padding: '2vh 0',
    marginBottom: '3vh',
  },
  content: {
    minHeight: '100vh',
    maxWidth: '800px',
    flexGrow: 1,
    padding: '1vh 7vw',
  },
});

export default function Layout(props: LayoutProps) {
  const classes = useStyles();

  return (
    <Grid container direction='column'>
      <AppBar position='static' className={classes.appBar}>
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <Typography variant='h6'>{props.heading}</Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Grid container justify='center'>
        <div className={classes.content}>{props.children}</div>
      </Grid>
      <Menu currentPage={props.currentPage} />
    </Grid>
  );
}
