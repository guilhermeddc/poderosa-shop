import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
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
    h6: {
      fontFamily: `'Righteous', cursive`,
    },
  },
});

export default theme;
