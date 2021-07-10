import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7C4DFF',
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
    fontSize: 14,
  },
});

export default theme;
