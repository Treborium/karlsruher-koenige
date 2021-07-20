import { AppBar, Grid, Icon, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Show from './show';

const useStyles = makeStyles({
  appBar: {
    padding: '2vh 0',
    marginBottom: '3vh',
  },
  backIcon: {
    color: '#FFF',
  },
});

interface TopMenuProps {
  heading: string;
  showBackIcon?: boolean;
}

export default function TopMenu(props: TopMenuProps) {
  const classes = useStyles();
  const navigateBack = () => history.back();

  return (
    <AppBar position='static' className={classes.appBar}>
      <Grid container justify='center' alignItems='center'>
        <Show when={props.showBackIcon}>
          <Grid item className={classes.backIcon}>
            <IconButton color='inherit' size='small' onClick={navigateBack}>
              <Icon className='fas fa-arrow-left' />
            </IconButton>
          </Grid>
        </Show>
        <Grid item>
          <Typography variant='h6'>{props.heading}</Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
}
