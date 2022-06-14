import {Typography} from '@mui/material';
import React from 'react';
import Link from 'next/link';
import {useBackground} from 'shared/hooks';

interface IProps {
  link: string;
  text: string;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  color?: string;
}

export const NavLink: React.FC<IProps> = ({
  link,
  text,
  align = undefined,
  color,
}) => {
  const {layoutColors} = useBackground();

  return (
    <Link href={link}>
      <Typography
        variant="body2"
        textTransform="uppercase"
        fontWeight={600}
        color={color || layoutColors.navItem}
        align={align}
        letterSpacing={2}
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
