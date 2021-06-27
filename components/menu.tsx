import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Theme, Toolbar, IconButton } from '@material-ui/core';
import Announcement from '@material-ui/icons/Announcement';
import LocalBar from '@material-ui/icons/LocalBar';
import MusicNote from '@material-ui/icons/MusicNote';
import Info from '@material-ui/icons/Info';

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
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container justify="space-between">
          <IconButton href="/" color={getColor('news')}>
            <Announcement />
          </IconButton>
          <IconButton href="/beer" color={getColor('beer')}>
            <LocalBar />
          </IconButton>
          <IconButton href="/songs" color={getColor('songs')}>
            <MusicNote />
          </IconButton>
          <IconButton href="/about" color={getColor('about')}>
            <Info />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
