import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Grid,
  Theme,
  Toolbar,
  IconButton,
  Icon,
} from '@material-ui/core';

interface MenuProps {
  currentPage: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'sticky',
      top: 'auto',
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
      color: '#E9E8E7',
    },
  })
);

export default function Menu({ currentPage }: MenuProps) {
  const classes = useStyles();

  const getColor = (page) => {
    return currentPage === page ? 'secondary' : 'inherit';
  };

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container justify='space-between'>
          <IconButton href='/' color={getColor('news')}>
            <Icon className='fas fa-newspaper' />
          </IconButton>
          <IconButton href='/beer' color={getColor('beer')}>
            <Icon className='fas fa-beer' />
          </IconButton>
          <IconButton href='/songs' color={getColor('songs')}>
            <Icon className='fas fa-music' />
          </IconButton>
          <IconButton href='/about' color={getColor('about')}>
            <Icon className='fas fa-info-circle' />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
