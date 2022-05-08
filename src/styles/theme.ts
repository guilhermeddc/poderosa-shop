import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {},
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
  },
  typography: {
    fontFamily: `'Oxygen', sans-serif`,
    h1: {
      fontFamily: `'Righteous', cursive`,
    },
    h2: {
      fontFamily: `'Righteous', cursive`,
    },
    h3: {
      fontFamily: `'Righteous', cursive`,
    },
    h4: {
      fontFamily: `'Righteous', cursive`,
    },
    h5: {
      fontFamily: `'Righteous', cursive`,
    },
    button: {
      fontFamily: `'Righteous', cursive`,
    },
  },
});

export default theme;
