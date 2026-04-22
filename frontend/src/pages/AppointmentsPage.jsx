import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AppointmentsPage() {
  const appointments = [
    { patient: 'Juan Pérez', doctor: 'Dr. Carlos Ruiz', date: '2024-04-21', time: '09:00 AM', status: 'Confirmado' },
    { patient: 'María González', doctor: 'Dra. Maria Lopez', date: '2024-04-21', time: '10:30 AM', status: 'Programado' },
    { patient: 'Carlos Rodríguez', doctor: 'Dr. Jose Garcia', date: '2024-04-22', time: '02:00 PM', status: 'Pendiente' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={700}>
          Citas Médicas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          sx={{
            borderRadius: '12px',
            px: 3,
            background: 'linear-gradient(135deg, #00BCD4 0%, #2196F3 100%)',
          }}
        >
          Agendar Cita
        </Button>
      </Box>

      <Grid container spacing={3}>
        {appointments.map((apt, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 20px 40px rgba(0, 188, 212, 0.2)',
              },
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{
                  mb: 2,
                  py: 1,
                  px: 3,
                  borderRadius: '20px',
                  background: apt.status === 'Confirmado' ? 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)' :
                              apt.status === 'Programado' ? 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)' :
                              'linear-gradient(135deg, #9E9E9E 0%, #BDBDBD 100%)',
                  color: 'white',
                  display: 'inline-block',
                }}>
                  <Typography variant="caption" fontWeight={700}>
                    {apt.status}
                  </Typography>
                </Box>

                <Typography variant="h5" fontWeight={600} gutterBottom mt={2}>
                  Dr. {apt.doctor.split(' ')[1]}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  con {apt.patient}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                  <Chip
                    icon={<span>📅</span>}
                    label={new Date(apt.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}
                    size="small"
                    sx={{ background: '#f5f7fa' }}
                  />
                  <Chip
                    icon={<span>🕒</span>}
                    label={apt.time}
                    size="small"
                    sx={{ background: '#f5f7fa' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AppointmentsPage;
