import { Typography, Grid, Link } from '@material-ui/core';

export function Troubleshooting() {
  return (
    <>
      <Typography variant='h5' gutterBottom>
        Probleme melden
      </Typography>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography variant='body1' align='justify' display='block'>
            Bei Problemen, Vorschlägen oder Bugs melde dich gerne bei mir
          </Typography>
        </Grid>

        <Grid container direction='row' justify='center' spacing={2}>
          <Grid item>
            <Link href='mailto:robert@fuchs-mail.com' variant='body1'>
              Mail
            </Link>
          </Grid>
          <Grid item>
            <Typography variant='body1'>|</Typography>
          </Grid>
          <Grid item>
            <Link
              variant='body1'
              href='https://github.com/Treborium/karlsruher-koenige/issues/new'
              target='_blank'
            >
              GitHub
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
