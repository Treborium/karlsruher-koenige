import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import { useEffect } from 'react';

import Menu from './menu';
import TopMenu from './top-menu';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    width: '100vw',
  },
  content: {
    maxWidth: '800px',
    flexGrow: 1,
    padding: '1vh 7vw',
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
      <TopMenu heading={props.heading} showBackIcon={props.showBackIcon} />
      <Grid container justify='center'>
        <div className={classes.content}>{props.children}</div>
      </Grid>
      <Menu currentPage={props.currentPage} />
    </Grid>
  );
}
