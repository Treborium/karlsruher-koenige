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

export interface PinnedListProps {
  items: string[];
}

export default function PinnedList({ items }: PinnedListProps) {
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
      {items.map((item, index) => (
        <ListItem key={`item-${item}-${index}`}>
          <ListItemAvatar>
            <Avatar
              src={`https://avatars.dicebear.com/api/micah/${item}.svg`}
            />
          </ListItemAvatar>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
}
