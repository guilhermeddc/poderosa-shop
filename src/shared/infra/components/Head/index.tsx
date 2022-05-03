import React from 'react';

import NextHead from 'next/head';

type IProps = {
  title?: string;
  description?: string;
};

export function Head({title, description}: IProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
    </NextHead>
  );
}
