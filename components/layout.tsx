import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import { useEffect } from 'react';

import Menu from './menu';
import TopMenu from './top-menu';

export interface LayoutProps {
  heading: string;
  currentPage: string;
  showBackIcon?: boolean;
  noPadding?: boolean;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      marginBottom: theme.spacing(10),
    },
    content: {
      maxWidth: '800px',
      flexGrow: 1,
      padding: (props: LayoutProps) => (props.noPadding ? 0 : '1vh 7vw'),
    },
  })
);

export default function Layout(props: LayoutProps) {
  const classes = useStyles(props);

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
    <Grid container direction='column' className={classes.root}>
      <TopMenu heading={props.heading} showBackIcon={props.showBackIcon} />
      <Grid container justify='center'>
        <div className={classes.content}>{props.children}</div>
      </Grid>
      <Menu currentPage={props.currentPage} />
    </Grid>
  );
}
