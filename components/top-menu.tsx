import {
  AppBar,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  Link,
  ListItemText,
  ListItemIcon,
  Grid,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Show from './show';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      marginBottom: '3vh',
    },
    backIcon: {
      color: '#FFF',
    },
    heading: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },
  })
);

interface TopMenuProps {
  heading: string;
  showBackIcon?: boolean;
}

export default function TopMenu(props: TopMenuProps) {
  const classes = useStyles();
  const [anchorElem, setAnchorElem] = useState<null | HTMLElement>(null);
  const navigateBack = () => history.back();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElem(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElem(null);
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Show when={props.showBackIcon}>
          <IconButton
            color='inherit'
            size='small'
            onClick={navigateBack}
            className={classes.backIcon}
          >
            <Icon className='fas fa-arrow-left' />
          </IconButton>
        </Show>

        <Typography variant='h6' className={classes.heading}>
          {props.heading}
        </Typography>

        <Button
          aria-controls='simple-menu'
          aria-haspopup='true'
          size='small'
          color='inherit'
          onClick={handleClick}
        >
          <Icon className='fas fa-bars' />
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={anchorElem}
          keepMounted
          open={Boolean(anchorElem)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Grid container justify='space-between'>
              <Link
                underline='none'
                color='textPrimary'
                href='https://shop.spreadshirt.de/karlsruher-koenige'
              >
                Merch Shop
              </Link>
              {/* TODO: style icon properly */}
              {/* <Icon className='fas fa-external-link-alt' /> */}
            </Grid>
          </MenuItem>
          <MenuItem onClick={handleClose}>Wanderkasten</MenuItem>
          <MenuItem onClick={handleClose}>
            <Link underline='none' color='textPrimary' href='/contact'>
              Impressum
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
