import { Grid } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

import Layout from '../components/layout';
import { Robert } from '../components/robert';
import { Troubleshooting } from '../components/troubleshooting';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Impressum</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout heading='Impressum' currentPage='Impressum'>
        <Grid container direction='column' spacing={10}>
          <Grid item>
            <Troubleshooting />
          </Grid>

          <Grid item>
            <Robert />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
