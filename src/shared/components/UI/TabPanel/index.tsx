import React from 'react';

import {Box} from '@mui/material';

interface IProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<IProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{paddingY: 1, paddingX: 3}} minWidth={400}>
          {children}
        </Box>
      )}
    </div>
  );
};
