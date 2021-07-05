import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#673AB7',
    },
    secondary: {
      main: '#ede7f6',
    },
    background: {
      default: '#f9f8f7',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#BDBDBD',
  },
  typography: {
    fontSize: 16,
  },
});

export default theme;
