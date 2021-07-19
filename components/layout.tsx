import { AppBar, Typography, Grid, IconButton, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import { useEffect } from 'react';

import Menu from './menu';
import Show from './show';

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
    maxWidth: '800px',
    flexGrow: 1,
    padding: '1vh 7vw',
  },
  backIcon: {
    color: '#FFF',
  },
});
export interface LayoutProps {
  heading: string;
  currentPage: string;
  showBackIcon?: boolean;
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const classes = useStyles();

  const navigateBack = () => history.back();

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Grid container direction='column'>
      <AppBar position='static' className={classes.appBar}>
        <Grid container justify='center' alignItems='center'>
          <Show when={props.showBackIcon}>
            <Grid item className={classes.backIcon}>
              <IconButton color='inherit' onClick={navigateBack}>
                <Icon className='fas fa-arrow-left' />
              </IconButton>
            </Grid>
          </Show>
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
