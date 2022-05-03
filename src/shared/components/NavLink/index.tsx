import {Typography} from '@mui/material';
import React from 'react';
import Link from 'next/link';
import {useBackground} from 'shared/hooks';

interface IProps {
  link: string;
  text: string;
}

export const NavLink: React.FC<IProps> = ({link, text}) => {
  const {layoutColors} = useBackground();

  return (
    <Link href={link}>
      <Typography
        variant="subtitle1"
        fontWeight={500}
        fontSize={16}
        color={layoutColors.colorNavItem}
        letterSpacing={3}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          ':hover': {
            opacity: 0.8,
          },
        }}>
        {text}
      </Typography>
    </Link>
  );
};
