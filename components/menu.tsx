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
      backgroundColor: '#f9f8f7',
      color: theme.palette.text.secondary,
    },
  })
);

export default function Menu({ currentPage }: MenuProps) {
  const classes = useStyles();

  const getColor = (page) => {
    return currentPage === page ? 'primary' : 'inherit';
  };

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container justify='space-between'>
          <IconButton href='/' size='small' color={getColor('news')}>
            <Icon className='fas fa-newspaper' />
          </IconButton>
          <IconButton href='/beer' size='small' color={getColor('beer')}>
            <Icon className='fas fa-beer' />
          </IconButton>
          <IconButton href='/songs' size='small' color={getColor('songs')}>
            <Icon className='fas fa-music' />
          </IconButton>
          <IconButton href='/about' size='small' color={getColor('about')}>
            <Icon className='fas fa-info-circle' />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
