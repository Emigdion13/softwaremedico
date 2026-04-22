import React from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import PeopleIcon from '@mui/icons-material/People'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DescriptionIcon from '@mui/icons-material/Description'

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Bienvenido a Software Médico
        </Typography>
        <Typography variant="h5" component="h2" align="center" color="textSecondary">
          Gestión de Pacientes y Soluciones de Salud
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" size="large" component={Link} to="/patients">
            Gestionar Pacientes
          </Button>
          <Button variant="outlined" color="secondary" size="large" component={Link} to="/appointments">
            Programar Cita
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', py: 2 }}>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3">
                Pacientes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Gestione la información y el historial médico de los pacientes
              </Typography>
              <Button variant="text" component={Link} to="/patients" sx={{ mt: 2 }}>
                Ver Todos
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', py: 2 }}>
            <CardContent>
              <PersonAddIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" component="h3">
                Doctores
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Gestione la información y horarios de los doctores
              </Typography>
              <Button variant="text" component={Link} to="/doctors" sx={{ mt: 2 }}>
                Ver Todos
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', py: 2 }}>
            <CardContent>
              <CalendarTodayIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3">
                Citas
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Programar y gestionar las citas de los pacientes
              </Typography>
              <Button variant="text" component={Link} to="/appointments" sx={{ mt: 2 }}>
                Ver Todas
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', py: 2 }}>
            <CardContent>
              <DescriptionIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" component="h3">
                Historias Médicas
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Acceder y gestionar las historias médicas de los pacientes
              </Typography>
              <Button variant="text" component={Link} to="/medical-records" sx={{ mt: 2 }}>
                Ver Todas
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
