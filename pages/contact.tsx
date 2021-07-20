import { Typography } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/layout';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Impressum</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading='Impressum' currentPage='Impressum'>
        <Typography variant='h4'>
          Site under construction 👨🏻‍🔧 Please come back later!
        </Typography>
      </Layout>
    </>
  );
}
