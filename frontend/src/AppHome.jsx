import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';

function Home() {
  const cards = [
    {
      icon: MedicalInformationIcon,
      title: 'Pacientes',
      description: 'Gestión completa de pacientes y sus historias médicas',
      path: '/patients',
    },
    {
      icon: PeopleIcon,
      title: 'Doctores',
      description: 'Administrar doctores y sus especialidades',
      path: '/doctors',
    },
    {
      icon: CalendarTodayIcon,
      title: 'Citas',
      description: 'Programar, confirmar y gestionar citas médicas',
      path: '/appointments',
    },
    {
      icon: HistoryIcon,
      title: 'Historias Médicas',
      description: 'Consultar y editar historias clínicas',
      path: '/medical-records',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #673AB7 0%, #E91E63 50%, #00BCD4 100%)',
        color: 'white',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{
            maxWidth: 'lg',
            mx: 'auto',
            px: 2,
            py: { xs: 4, md: 8 },
          }}>
            <Typography variant="h1" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Software Médico
            </Typography>
            <Typography variant="h5" fontWeight={300} paragraph sx={{ opacity: 0.9, maxWidth: 600 }}>
              Sistema integral de gestión clínica para su consultorio o hospital
            </Typography>
            <Typography variant="body1" paragraph sx={{ opacity: 0.8, maxWidth: 500, mb: 4 }}>
              Gestione pacientes, doctores, citas y historias médicas desde una plataforma moderna, rápida y segura.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: '12px',
                px: 5,
                py: 1.5,
                background: 'white',
                color: '#673AB7',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              Comenzar Ahora
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box sx={{ background: '#f5f7fa' }}>
        <Box sx={{
          maxWidth: 'lg',
          mx: 'auto',
          px: 2,
          py: { xs: 4, md: 8 },
        }}>
          <Typography variant="h2" align="center" gutterBottom>
            Nuestras Funciones
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{
            maxWidth: 600,
            mx: 'auto',
            mb: 6,
          }}>
            Una plataforma completa diseñada para mejorar la eficiencia de su práctica médica
          </Typography>

          <Grid container spacing={3}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Box
                  component="a"
                  href={card.path}
                  sx={{
                    display: 'block',
                    height: '100%',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'perspective(1000px) rotateX(0deg)',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateX(5deg) translateY(-8px)',
                    },
                  }}
                >
                  <Box sx={{
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    p: 3,
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  }}>
                    <Box sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, #673AB7 0%, #9C27B0 100%)`,
                      mx: 'auto',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'pulse 2s infinite',
                    }}>
                      <card.icon sx={{ fontSize: 48, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1A237E 0%, #4A148C 100%)',
        py: { xs: 6, md: 8 },
        color: 'white',
      }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={6} md={3}>
              <Typography variant="h2" fontWeight={700}>24/7</Typography>
              <Typography variant="body2">Acceso Disponible</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" fontWeight={700}>99.9%</Typography>
              <Typography variant="body2">Disponibilidad</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" fontWeight={700}>🔒</Typography>
              <Typography variant="body2">Seguridad Total</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" fontWeight={700}>⚡</Typography>
              <Typography variant="body2">Rendimiento Veloz</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{
        background: '#1A237E',
        py: 4,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
      }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Software Médico - Todos los derechos reservados
        </Typography>
        <Typography variant="caption" display="block" mt={1}>
          Sistema integral de gestión clínica
        </Typography>
      </Box>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(233, 30, 99, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(233, 30, 99, 0); }
        }
      `}</style>
    </Box>
  );
}

export default Home;
