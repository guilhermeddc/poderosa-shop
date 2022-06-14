import React from 'react';

import {Link, Typography} from '@mui/material';
import NLink from 'next/link';

interface IProps {
  link?: string;
  website?: string;
}

export const Copyright: React.FC<IProps> = ({
  link = '/',
  website = 'A Poderosa',
}) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link component={NLink} color="inherit" href={link}>
        {website}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
