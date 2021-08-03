import {
  Typography,
  Icon,
  IconButton,
  Avatar,
  Grid,
  Link,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import ProfilePic from '../public/images/profile-picture.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  })
);

export function Robert() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <Typography variant='h6'>Hergestellt von Robert Fuchs</Typography>
      </Grid>

      <Grid item>
        <Avatar
          alt='Robert Fuchs'
          src={ProfilePic.src}
          className={classes.large}
        />
      </Grid>

      <Grid item>
        <Grid item container direction='row' spacing={4}>
          <Grid item>
            <IconButton href='https://robert-fuchs.codes'>
              <Icon className='fas fa-user' />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton href='https://github.com/Treborium'>
              <Icon className='fab fa-github' />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton href='mailto:robert@fuchs-mail.com'>
              <Icon className='fas fa-envelope' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
