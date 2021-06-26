import Layout from '../components/layout';
import styles from '../styles/about.module.scss';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Mail from '@material-ui/icons/Mail';
import Launch from '@material-ui/icons/Launch';
import { FunctionComponent } from 'react';

export default function About() {
  const createData = (day: string, time: string, group: string) => ({
    day,
    time,
    group,
  });

  const rows = [
    createData('Montag', '20:30 Uhr', 'Alle'),
    createData('Donnerstag', '20:00 Uhr', 'Alle'),
    createData('Freitag', '17:30 Uhr', 'Wettkampf'),
  ];

  return (
    <Layout heading="Karlsruher Könige">
      <h2 className={styles.heading}>Wer sind wir?</h2>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </p>

      <AccordionWithButton
        title="Anmeldung"
        buttonLink="https://buchsys.sport.uni-karlsruhe.de/angebote/aktueller_zeitraum/index.html"
        buttonText="Anmeldung"
        icon={<Launch />}
      >
        Du hast Interesse den Karlsruher Königen beizutreten und beim Unisport
        teilzunehmen? Dann melde dich auf der Hochschulsport-Webseite an und
        lass dich im nächsten Training blicken!
      </AccordionWithButton>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Trainingszeiten</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <TableContainer component={Paper}>
                <Table
                  aria-label="simple table"
                  size="small"
                  padding="checkbox"
                >
                  <TableHead>
                    <TableRow>
                      {/* TODO: Style head row bold */}
                      <TableCell>Tag</TableCell>
                      <TableCell>Zeit</TableCell>
                      <TableCell>Gruppe</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.day}>
                        <TableCell>{row.day}</TableCell>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.group}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <Typography>
                Bitte schaue auf die offizielle Hochschuleseite für die
                aktuellsten Trainingszeiten
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                href="https://buchsys.sport.uni-karlsruhe.de/angebote/aktueller_zeitraum/index.html"
              >
                Trainingszeiten
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <AccordionWithButton
        title="Kontakt"
        buttonText="Mail Senden"
        buttonLink="mailto:turnkoenige@gmail.com"
        icon={<Mail />}
      >
        Falls du Fragen hast oder gerne Kontakt zu uns aufnehmen möchtest,
        erreichst du uns am besten per Mail:
      </AccordionWithButton>
    </Layout>
  );
}

interface AccordionWithButtonProps {
  title: string;
  buttonText: string;
  buttonLink: string;
  icon?: JSX.Element;
}

const AccordionWithButton: FunctionComponent<AccordionWithButtonProps> = ({
  title,
  buttonText,
  buttonLink,
  children,
  icon,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography>{children}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              href={buttonLink}
              endIcon={icon}
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
