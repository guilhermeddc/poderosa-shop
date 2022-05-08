import {useTheme, useMediaQuery as useMuiMediaQuery} from '@mui/material';

export const useMediaQuery = () => {
  const theme = useTheme();
  const xs = useMuiMediaQuery(theme.breakpoints.up('xs'));
  const sm = useMuiMediaQuery(theme.breakpoints.up('sm'));
  const md = useMuiMediaQuery(theme.breakpoints.up('md'));
  const lg = useMuiMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMuiMediaQuery(theme.breakpoints.up('xl'));
  return {xs, sm, md, lg, xl};
};
