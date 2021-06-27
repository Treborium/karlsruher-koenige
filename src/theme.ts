import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#CC6666',
    },
    secondary: {
      main: '#FFF',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f9f8f7',
    },
    text: {
      primary: '#1A2A3A',
      secondary: '#2A3A4A',
    },
  },
});

export default theme;
