import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { HourglassFull as HourglassFullIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 3,
    background: 'linear-gradient(to bottom right, #4facfe, #00f2fe)', // Fondo degradado azul
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1800,
    margin: 0,
  },
  leftCard: {
    flex: '0 0 70%', // Ocupa el 70% del ancho disponible
    height: '80vh', // Altura del 80% del viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    boxShadow: '0 28px 56px rgba(0,0,0,0.4)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  rightCardContainer: {
    flex: '0 0 30%', // Ocupa el 30% del ancho disponible
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightCard: {
    width: '100%',
    height: '25vh', // Altura fija para cada tarjeta de la derecha
    marginBottom: 4,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    marginBottom: 6,
    color: '#ffffff',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: '3.5rem', // Tamaño del título ajustado
  },
  icon: {
    fontSize: 180,
    marginBottom: 4,
    color: '#f44336', // Color rojo para iconos
  },
  textLarge: {
    fontSize: '2.5rem', // Tamaño de texto grande
    fontWeight: 'bold',
  },
}));

const TicketScreen = () => {
  const classes = useStyles();

  // Datos simulados del ticket más reciente y los atendidos recientemente
  const latestTicket = { id: 1, title: 'Ticket Reciente', description: 'Descripción del ticket reciente' };
  const recentTickets = [
    { id: 2, title: 'Ticket Atendido 1', description: 'Descripción del ticket atendido 1' },
    { id: 3, title: 'Ticket Atendido 2', description: 'Descripción del ticket atendido 2' },
    { id: 4, title: 'Ticket Atendido 3', description: 'Descripción del ticket atendido 3' },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h1" align="center" gutterBottom className={classes.title}>
        Gestión de Tickets
      </Typography>
      <Grid container spacing={6} className={classes.cardContainer}>
        {/* Ticket más reciente */}
        <Grid item xs={12} md={9}>
          <Card className={classes.leftCard} variant="outlined">
            <CardContent className={classes.cardContent}>
              <HourglassFullIcon className={classes.icon} />
              <Typography variant="h3" gutterBottom className={classes.textLarge}>
                {latestTicket.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" className={classes.textLarge}>
                {latestTicket.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Tres tickets atendidos recientemente */}
        <Grid item xs={12} md={3} className={classes.rightCardContainer}>
          {recentTickets.map((ticket) => (
            <Card key={ticket.id} className={classes.rightCard} variant="outlined">
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" gutterBottom className={classes.textLarge}>
                  {ticket.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.textLarge}>
                  {ticket.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TicketScreen;
