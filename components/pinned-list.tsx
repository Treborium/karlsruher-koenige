import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Icon,
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 'stretch',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      height: '30vh',
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  })
);

export default function PinnedList() {
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Edle Spender
        </ListSubheader>
      }
    >
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <ListItem key={`item-${item}`}>
          <ListItemAvatar>
            <Avatar>
              <Icon className='fas fa-user' />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`Item ${item}`} />
        </ListItem>
      ))}
    </List>
  );
}
