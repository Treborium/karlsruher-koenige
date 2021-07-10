import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 'stretch',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      height: '35vh',
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
  const names = ['Robert', 'Katja', 'Max', 'Meret', 'Anna', 'Luca'];

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Edle Spender
        </ListSubheader>
      }
    >
      {names.map((name) => (
        <ListItem key={`item-${name}`}>
          <ListItemAvatar>
            <Avatar
              src={`https://avatars.dicebear.com/api/micah/${name}.svg`}
            />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
}
